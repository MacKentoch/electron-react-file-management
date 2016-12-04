/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/no-unused-prop-types:0 */
import React, { PureComponent, PropTypes } from 'react';
import { Map, List, fromJS } from 'immutable';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';

class History extends PureComponent {
  state = {
    animated: true,
    viewEntersAnim: true
  };

  componentWillMount() {
    const { actions: { enterHistory } } = this.props;
    enterHistory();
  }

  componentWillUnmount() {
    const { actions: { leaveHistory } } = this.props;
    leaveHistory();
  }

  render() {
    const { animated, viewEntersAnim } = this.state;
    return (
      <ViewContainer
        animated={animated}
        launchAnimation={viewEntersAnim}>
        <div className="row">
          <div className="col-sm-12">
            <ViewTitle
              title={'History'}
              faIconName={'fa-history'}
            />
            <div>
              <div className="list-group">
                <a href="#" className="list-group-item active">
                  <div
                    style={{ height: '40px', width: '40px', backgroundColor: '#F1F2F3', marginRight: '10px'}}
                    className="pull-left">
                    test
                  </div>
                  <h4 className="list-group-item-heading">First List Group Item Heading</h4>
                  <p className="list-group-item-text">List Group Item Text</p>
                </a>
                <a href="#" className="list-group-item">
                  <h4 className="list-group-item-heading">Second List Group Item Heading</h4>
                  <p className="list-group-item-text">List Group Item Text</p>
                </a>
                <a href="#" className="list-group-item">
                  <h4 className="list-group-item-heading">Third List Group Item Heading</h4>
                  <p className="list-group-item-text">List Group Item Text</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }
}

History.propTypes = {
  currentView: PropTypes.string.isRequired,
  actions: {
    enterHistory: PropTypes.func.isRequired,
    leaveHistory: PropTypes.func.isRequired
  }
};

export default History;
