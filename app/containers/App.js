/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */
/* eslint jsx-a11y/href-no-hash:0 */
/* eslint max-len:0 */

import React, {
  Component,
  PropTypes
} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS, List } from 'immutable';
import cx from 'classnames';
import { NotificationStack } from 'react-notification';
import { sidemenuModel } from '../models/sidemenu';
import * as notificationsActions from '../redux/modules/notifications';

class App extends Component {
  state = {
    sideMenuToogled: false,
    navModel: fromJS(sidemenuModel)
  };

  componentDidMount() {
    // drag and drop over app (other than drag and drop field) should be disabled:
    this.wrapper.addEventListener('dragover', this.preventEvent);
    this.wrapper.addEventListener('drop', this.preventEvent);
  }

  render() {
    const { navModel, sideMenuToogled } = this.state;
    const { children, notifications } = this.props;

    return (
      <div
        id="wrapper"
        ref={this.registerWrapperRef}
        style={{ overflow: 'auto' }}
        className={
          cx({
            active: sideMenuToogled
          })
        }>
        {/* <!-- Sidebar --> */}
        <div id="sidebar-wrapper">
          <ul
            id="sidebar_menu"
            className="sidebar-nav">
            <li className="sidebar-brand">
              <a
                id="menu-toggle"
                href="#"
                onClick={this.handlesOnMenuToggleClick}>
                Menu
               <i
                 id="main_icon"
                 className="fa fa-bars"
                 aria-hidden="true"
               />
              </a>
            </li>
          </ul>
          <ul
            className="sidebar-nav"
            id="sidebar">
            {
              navModel.map(
                (navItem, navItemIdx) => (
                  <li key={navItemIdx}>
                    <Link to={navItem.get('linkTo')}>
                      <span>
                        {navItem.get('text')}
                      </span>
                      <i
                        className={`sub_icon fa fa-home ${navItem.get('fontIconName') || 'fa-link'}`}
                        aria-hidden="true"
                      />
                      {/* <span className="sub_icon glyphicon glyphicon-link" /> */}
                    </Link>
                  </li>
                )
              )
            }
          </ul>
        </div>

        {/* <!-- Page content --> */}
        <div id="page-content-wrapper">
          {/* <!-- Keep all page content within the page-content inset div! --> */}
          <div className="page-content inset">
            {children}
          </div>
        </div>
        <NotificationStack
          notifications={notifications.toJS()}
          // notifications={[
          //   {
          //     key: 1,
          //     message: 'test message ultra super sized to tets the limit of super ulatr sized message',
          //     dismissAfter: 1000,
          //     action: 'Dismiss',
          //     onClick: ()=>console.log('should dispatch "query" delete notification key=1')
          //   },
          //   {
          //     key: 2,
          //     message: 'test message',
          //     dismissAfter: 1000,
          //     action: 'Dismiss',
          //     onClick: ()=>console.log('should dispatch "query" delete notification key=2')
          //   }
          // ]
          // }
          onDismiss={this.handlesOnNotificationDismiss}
          activeBarStyleFactory={
            (index, style) => {
              return {
                ...style,
                bottom: `${90 - (5 * index)}%`,
                left: '10%'
              };
            }
          }
          barStyleFactory={
            (index, style) => {
              return {
                ...style,
                bottom: `${90 - (5 * index)}%`,
                left: '10%'
              };
            }
          }
        />
      </div>
    );
  }

  handlesOnNotificationDismiss = (notification) => {
    const { actions: { removeNotification } } = this.props;
    removeNotification(notification);
  }

  registerWrapperRef = (ref) => {
    this.wrapper = ref;
  }

  preventEvent = (event) => {
    event.preventDefault();
    return false;
  }

  handlesOnMenuToggleClick = event => {
    event.preventDefault();
    this.setState({ sideMenuToogled: !this.state.sideMenuToogled });
  }
  /* eslint-disable no-unused-vars*/
  handleLeftNavItemClick = (event, viewName) => {
    // something to do here?
  }

  handleRightNavItemClick = (event, viewName) => {
    // something to do here?
  }
  /* eslint-enable no-unused-vars*/
}

// statics :
App.propTypes = {
  children: PropTypes.node,

  notifications: PropTypes.instanceOf(List),

  actions: PropTypes.shape({
    // notifications:
    addNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired
  })
};

// redux connect:
const mapStateToProps = state => {
  return {
    // notifications:
    notifications: state.notifications
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        // notifications:
        addNotification: notificationsActions.addNotification,
        removeNotification: notificationsActions.removeNotification
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
