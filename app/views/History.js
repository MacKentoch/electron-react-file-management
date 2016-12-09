/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/no-unused-prop-types:0 */
import React, { PureComponent, PropTypes } from 'react';
import { List } from 'immutable';
import moment from 'moment';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';
import ListFiles from '../components/listFiles/ListFiles';


class History extends PureComponent {
  state = {
    animated: true,
    viewEntersAnim: true
  };

  componentWillMount() {
    const {
      actions: {
        enterHistory
      }
    } = this.props;

    enterHistory();
  }

  componentWillUnmount() {
    const { actions: { leaveHistory } } = this.props;
    leaveHistory();
  }

  render() {
    const { animated, viewEntersAnim } = this.state;

    const filter = 'all';

    const filteredHistoFiles = this.filterHistoFiles(filter).sort(this.sortFilesByDateAsc);
    const distinctFileDates = filteredHistoFiles.groupBy(file => file.date).keySeq();

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
            {
              distinctFileDates.map(
                (dateRef, dateRefIdx) => (
                  <div
                    key={dateRefIdx}>
                    <h3 style={{ textAlign: 'center' }}>
                      {dateRef}
                    </h3>
                    {
                      <ListFiles
                        files={filteredHistoFiles.filter(file => file.date === dateRef)}
                        showDeleteButton={false}
                      />
                    }
                  </div>
                )
              )
            }
          </div>
        </div>
      </ViewContainer>
    );
  }

  sortFilesByDateAsc = (fileA, fileB) => {
    if (moment(fileA.date, 'DD/MM/YYYY').diff(moment(fileB.date, 'DD/MM/YYYY')) < 0) {
      return -1;
    }
    if (moment(fileA.date, 'DD/MM/YYYY').diff(moment(fileB.date, 'DD/MM/YYYY')) > 0) {
      return 1;
    }
    return 0;
  }

  filterHistoFiles(filter = 'today') {
    const { histoFiles } = this.props;
    switch (filter) {

      case 'today':
        return histoFiles.filter(file => {
          const diffInDays = moment().diff(moment(file.date, 'DD/MM/YYYY'), 'days');
          return diffInDays === 0;
        });

      case 'thisWeek':
        return histoFiles.filter(file => {
          const diffInWeeks = moment().diff(moment(file.date, 'DD/MM/YYYY'), 'week');
          return diffInWeeks === 0;
        });

      case 'thisMonth':
        return histoFiles.filter(file => {
          const diffInMonths = moment().diff(moment(file.date, 'DD/MM/YYYY'), 'month');
          return diffInMonths === 0;
        });

      case 'all':
        return histoFiles;

      default:
        return histoFiles;
    }
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
