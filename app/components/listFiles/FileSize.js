/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */

import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { formatBytes } from '../../utils/file';

class FileSize extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { fileSize } = this.props;

    return (
      <p
        className="list-group-item-text"
        style={{
          fontSize: '11px',
          color: '#F1F1F1'
        }}>
        {formatBytes(fileSize)}
      </p>
    );
  }
}

FileSize.propTypes = {
  fileSize: PropTypes.number
};

FileSize.defaultProps = {
  fileSize: 0
};

export default FileSize;
