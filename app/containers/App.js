/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */
/* eslint jsx-a11y/href-no-hash:0 */

import React, {
  Component,
  PropTypes
} from 'react';
import { Link } from 'react-router';
import { fromJS } from 'immutable';
import cx from 'classnames';
import { sidemenuModel } from '../models/sidemenu';

class App extends Component {
  state = {
    sideMenuToogled: false,
    navModel: fromJS(sidemenuModel)
  };

  render() {
    const { navModel, sideMenuToogled } = this.state;
    const { children } = this.props;

    return (
      <div
        id="wrapper"
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
            {/* <BackToTop
              minScrollY={40}
              scrollTo={'appContainer'}
            /> */}
          </div>
        </div>
      </div>
    );
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
  // history: PropTypes.object,
  // location: PropTypes.object
};

export default App;
