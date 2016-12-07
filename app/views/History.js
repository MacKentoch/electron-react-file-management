/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/no-unused-prop-types:0 */
import React, { PureComponent, PropTypes } from 'react';
import { Map, List, fromJS } from 'immutable';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';
import ListFiles from '../components/listFiles/ListFiles';

class History extends PureComponent {
  state = {
    animated: true,
    viewEntersAnim: true,
    demoFiles: [
      { name: 'test1', filePath: './abc', size: 1024 },
      { name: 'test2', filePath: './abcd', size: 102345 }
    ]
  };

  componentWillMount() {
    const {
      actions: {
        enterHistory,
        getPersistHistoFiles
      }
    } = this.props;

    enterHistory();
    getPersistHistoFiles();
  }

  componentWillUnmount() {
    const { actions: { leaveHistory } } = this.props;
    leaveHistory();
  }

  render() {
    const { animated, viewEntersAnim } = this.state;
    const { histoFiles } = this.props;

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

            <ListFiles
              files={List(this.state.demoFiles)}
              showDeleteButton={false}
            />

          </div>
        </div>
      </ViewContainer>
    );
  }
}

History.propTypes = {
  // views:
  currentView: PropTypes.string.isRequired,
  // files:
  histoFiles: PropTypes.instanceOf(List),

  actions: PropTypes.shape({
    // views:
    enterHistory: PropTypes.func.isRequired,
    leaveHistory: PropTypes.func.isRequired,
    // files:
    getPersistHistoFiles: PropTypes.func.isRequired
  })
};

export default History;
