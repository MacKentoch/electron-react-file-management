import { Map, List, fromJS } from 'immutable';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const ADD_NEW_FILES = 'ADD_NEW_FILES';

// /////////////////////
// reducer
// /////////////////////
const initialState = Map({
  files: List([Map({})]),
  lastUploadTime: ''
});

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);
  switch (action.type) {

    case ADD_NEW_FILES:
      return state
              .set('files', fromJS(action.files))
              .set('lastUploadTime', currentTime);

    default:
      return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
export function addfiles(files = []) {
  return {
    type: ADD_NEW_FILES,
    files
  };
}
