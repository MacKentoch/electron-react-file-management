/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/no-unused-prop-types:0 */
import React, { PureComponent, PropTypes } from 'react';
import { List } from 'immutable';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';

class Info extends PureComponent {
  state = {
    animated: true,
    viewEntersAnim: true
  };

  componentWillMount() {
    const { actions: { enterInfo } } = this.props;
    enterInfo();
  }

  componentWillUnmount() {
    const { actions: { leaveInfo } } = this.props;
    leaveInfo();
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
              title={'Info'}
              faIconName={'fa-info-circle'}
            />
            <div>
              <p>
                TODO
              </p>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }
}

Info.propTypes = {
  // views:
  currentView: PropTypes.string.isRequired,
  // notifications:
  notifications: PropTypes.instanceOf(List),

  actions: PropTypes.shape({
    // views:
    enterHome: PropTypes.func.isRequired,
    leaveHome: PropTypes.func.isRequired,
    // notifications:
    addNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired
  }).isRequired
};

export default Info;
