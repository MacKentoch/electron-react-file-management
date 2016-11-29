/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */

import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';

class History extends Component {
  state = {
    animated: true,
    viewEntersAnim: true
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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
              content to add
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }
}

export default History;
