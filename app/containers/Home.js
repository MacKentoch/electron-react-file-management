/* eslint arrow-body-style:0 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewActions from '../redux/modules/views';
import * as filesActions from '../redux/modules/files';
import { Home } from '../views';

const mapStateToProps = state => {
  return {
    // views:
    currentView: state.views.get('currentView'),
    // files:
    filePath: state.files.get('filePath'),
    lastUploadTime: state.files.get('lastUploadTime'),
    files: state.files.get('files')
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        // views:
        enterHome: viewActions.enterHome,
        leaveHome: viewActions.leaveHome,
        // files:
        setFilePath: filesActions.setFilePath,
        addfiles: filesActions.addfiles,
        clearFileErrors: filesActions.clearFileErrors,
        removeFileByIndex: filesActions.removeFileByIndex,
        removeFileByFileName: filesActions.removeFileByFileName,
        writeFiles: filesActions.writeFiles
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
