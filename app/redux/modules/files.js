import { Map, List, fromJS } from 'immutable';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const GET_PERSIST_HISTO_FILES = 'GET_PERSIST_HISTO_FILES';
const ADD_NEW_FILES = 'ADD_NEW_FILES';
// const ADD_NEW_FILE_DUPLICATE = 'ADD_NEW_FILE_DUPLICATE';
const REMOVE_FILE_BY_INDEX = 'REMOVE_FILE_BY_INDEX';
const REMOVE_FILE_BY_FILENAME = 'REMOVE_FILE_BY_FILENAME';

const REQUIRE_WRITE_FILE = 'REQUIRE_WRITE_FILE';
const CONFIRM_WRITE_FILE = 'CONFIRM_WRITE_FILE';
const ERROR_WRITE_FILE = 'ERROR_WRITE_FILE';

const SET_FILE_PATH = 'SET_FILE_PATH';
const CLEAR_FILE_ERRORS = 'CLEAR_FILE_ERRORS';

// /////////////////////
// reducer
// /////////////////////
const initialState = Map({
  // current files:
  files: List(),
  lastUploadTime: '',
  // filePath:
  filePath: null,
  writingFiles: List(),
  writeFileError: List(),
  // histo:
  histoFiles: List()
});

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);
  switch (action.type) {
    case ADD_NEW_FILES:
      return state.mergeDeep({
        files: state.get('files').concat(action.files),
        lastUploadTime: currentTime
      });
    case REMOVE_FILE_BY_INDEX:
      return state.merge({
        files: state.get('files').filter((_, fileIdx) => fileIdx !== action.index),
        lastUploadTime: currentTime
      });
    case REMOVE_FILE_BY_FILENAME:
      return state.merge({
        files: state.get('files').filter((file) => file.name !== action.fileName),
        lastUploadTime: currentTime
      });
    case SET_FILE_PATH:
      return state.merge({
        filePath: action.filePath
      });

    case REQUIRE_WRITE_FILE:
      return state.merge({
        writingFiles: state.get('writingFiles').push(action.file)
      });
    case CONFIRM_WRITE_FILE:
      return state.merge({
        writingFiles: state.get('writingFiles').filter(file => file.name !== action.file.name),
        histoFiles: state.get('histoFiles').push(Map({ name: action.file.name, size: action.file.size, date: moment().format('DD/MM/YYYY') }))
      });
    case ERROR_WRITE_FILE:
      return state.merge({
        writingFiles: state.get('writingFiles').filter(file => file.name !== action.file.name),
        writeFileError: state.get('writeFileError').push(action.details)
      });
    case CLEAR_FILE_ERRORS:
      return state.merge({
        writeFileError: state.get('writeFileError').clear()
      });

    case GET_PERSIST_HISTO_FILES:
      console.log('action: ', action);

      return state.map({
        histoFiles: state.get('histoFiles').concat(
        fromJS(action.permanentStore.storeValue))
      });

    default:
      return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
export function getPersistHistoFiles() {
  return {
    type: GET_PERSIST_HISTO_FILES,
    permanentStore: {
      required: true,
      storeKey: 'filesHisto',
      storeValue: '', //
      ReadOrWrite: false // false is READ storage
    }
  };
}

export function addfiles(files = List()) {
  return {
    type: ADD_NEW_FILES,
    files
  };
}

export function clearFileErrors() {
  return {
    type: CLEAR_FILE_ERRORS
  };
}

export function removeFileByIndex(index) {
  return {
    type: REMOVE_FILE_BY_INDEX,
    index
  };
}

export function removeFileByFileName(fileName) {
  return {
    type: REMOVE_FILE_BY_FILENAME,
    fileName
  };
}

export function setFilePath(filePath = null) {
  if (filePath) {
    return {
      type: SET_FILE_PATH,
      filePath
    };
  }
}

function requireWriteFile(file) {
  return {
    type: REQUIRE_WRITE_FILE,
    file
  };
}

function confirmWriteFile(file, filePath = '') {
  return (dispatch, getState) => {
    const prevFileHist = getState()
                            .files
                            .get('histoFiles')
                            .push(
                              Map({
                                name: file.name,
                                size: file.size,
                                date: moment().format('DD/MM/YYYY')
                              })
                            );

    dispatch({
      type: CONFIRM_WRITE_FILE,
      savePersist: true, // persistDB middleware will check this property
      file,
      filePath,
      // add to persist store (middleware):
      permanentStore: {
        required: true,
        storeKey: 'filesHisto',
        storeValue: prevFileHist,
        ReadOrWrite: true // false is READ storage and true is WRITE to storage
      },
      // notification (middleware):
      showNotification: {
        message: `${file.name} copied`,
        dismissAfter: 1000,
        action: 'DONE'
      }
    });
  };
}

function errorWriteFile(file, details = '') {
  return {
    type: ERROR_WRITE_FILE,
    file,
    details,
    // notification (middleware):
    showNotification: {
      message: `ERROR: ${file.name} not copied...`,
      dismissAfter: 1000,
      action: 'RETRY LATER'
    }
  };
}

export function writeFile(file = null, filePath = null) {
  return dispatch => {
    if (!file) {
      const error = { error: 'writeFile needs a file to write' };
      return Promise.reject(error);
    }
    if (!filePath) {
      const error = { error: 'writeFile needs a path to write the file' };
      return Promise.reject(error);
    }
    return new Promise(
      (resolve, reject) => {
        fs.writeFile(filePath, file,
          err => {
            if (err) {
              return reject({
                file,
                details: errorMessageFromErrorCode(err)
              });
            }
            return resolve({ file, filePath });
          }
        );
      }
    );
  };
}

export function writeFiles(files = List([])) {
  return (dispatch, getState) => {
    const filePath = getState().files.get('filePath');

    files.forEach(
      file => {
        const allFilePath = path.join(filePath, file.name);
        dispatch(requireWriteFile(file));

        dispatch(writeFile(file, allFilePath))
          .then(
            successPayload => {
              dispatch(confirmWriteFile(successPayload.file, successPayload.filePath));
              dispatch(removeFileByFileName(file.name));
              return true;
            }
          )
          .catch(
            errorPayload => dispatch(errorWriteFile(errorPayload.file, errorPayload.details))
          );
      });
  };
}

function errorMessageFromErrorCode(err) {
  switch (err.code) {
    case 'ENOENT':
      return 'destination is not accessible.';
    default:
      return 'An error occured...';
  }
}
