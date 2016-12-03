/* eslint arrow-body-style:0 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewActions from '../redux/modules/views';
import { History } from '../views';

const mapStateToProps = state => {
  return {
    currentView: state.views.get('currentView')
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        enterHistory: viewActions.enterHistory,
        leaveHistory: viewActions.leaveHistory
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
