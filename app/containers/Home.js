/* eslint arrow-body-style:0 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewActions from '../redux/modules/views';
import { Home } from '../views';

const mapStateToProps = state => {
  return {
    currentView: state.views.get('currentView')
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        enterHome: viewActions.enterHome,
        leaveHome: viewActions.leaveHome
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
