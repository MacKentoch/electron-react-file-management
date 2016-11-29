import React, {
  Component
}                     from 'react';
import cx             from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

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
    return(
      <div
        className={
            cx({
            'animatedViews': animated,
            'view-enter': viewEntersAnim
          })
        }>
        <div className="row">
          <div className="col-sm-12">
            <h1>
              History
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
