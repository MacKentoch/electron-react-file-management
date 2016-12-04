import { Map, List, fromJS, Iterable } from 'immutable';
import moment from 'moment';

const fs = require('fs');
const path = require('path');

const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const ADD_NEW_FILES = 'ADD_NEW_FILES';
const REMOVE_FILE_BY_INDEX = 'REMOVE_FILE_BY_INDEX';
const REMOVE_FILE_BY_FILENAME = 'REMOVE_FILE_BY_FILENAME';

const REQUIRE_WRITE_FILE = 'REQUIRE_WRITE_FILE';
const CONFIRM_WRITE_FILE = 'CONFIRM_WRITE_FILE';
const ERROR_WRITE_FILE = 'ERROR_WRITE_FILE';

const SET_FILE_PATH = 'SET_FILE_PATH';

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
        writingFiles: state.get('writingFiles').concat(action.file),
      });
    case CONFIRM_WRITE_FILE:
      return state.merge({
        writingFiles: state.get('writingFiles').filter(file => file.name !== action.file.name),
      });
    case ERROR_WRITE_FILE:
      return state.merge({
        writingFiles: state.get('writingFiles').filter(file => file.name !== action.file.name),
      });

    default:
      return state;
  }
}


// /////////////////////
// action creators
// /////////////////////

export function addfiles(files = List()) {
  return {
    type: ADD_NEW_FILES,
    files
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

function confirmWriteFile(file) {
  return {
    type: CONFIRM_WRITE_FILE,
    file
  };
}

function errorWriteFile(file) {
  return {
    type: ERROR_WRITE_FILE,
    file
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

    dispatch(requireWriteFile(file));

    return new Promise(
      (resolve, reject) => {
        fs.writeFile(filePath, file,
          err => {
            if (err) {
              dispatch(errorWriteFile(file));
              const error = { error: `writeFile failed. More details: ${err.message}` };
              return reject(error);
            }
            dispatch(confirmWriteFile(file));
            return resolve({ fileName: file.name, filePath });
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
        dispatch(writeFile(file, allFilePath))
          .then(
            () => dispatch(removeFileByFileName(file.name))
          )
          .catch(
            err => {
              return dispatch(errorWriteFile(err));
              // throw new Error(err);
            }
          );
      });
  };
}
