/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */

import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class FileRemove extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <a
        onClick={this.handlesOnClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontSize: '16px',
          color: '#F1F1F1',
          padding: '5px'
        }}>

        <i className="fa fa-trash-o" />
      </a>
    );
  }

  handlesOnClick = event => {
    event.preventDefault();
    const { onClick, fileIndex } = this.props;
    onClick(fileIndex);
  }
}

FileRemove.propTypes = {
  onClick: PropTypes.func.isRequired,
  fileIndex: PropTypes.number.isRequired
};

export default FileRemove;
