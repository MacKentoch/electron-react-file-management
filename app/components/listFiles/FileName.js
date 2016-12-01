/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */

import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class FileName extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { fileName } = this.props;

    return (
      <p
        className="list-group-item-heading"
        style={{
          fontSize: '12px',
          color: '#F1F1F1'
        }}>
        { fileName }
      </p>
    );
  }
}

FileName.propTypes = {
  fileName: PropTypes.string
};

FileName.defaultProps = {
  fileName: ''
};

export default FileName;
