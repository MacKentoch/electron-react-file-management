/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import appConfig from '../../config';
// import { Motion, spring, presets } from 'react-motion';
import FileExtension from './FileExtension';
import FileName from './FileName';
import FileSize from './FileSize';
import FileRemove from './FileRemove';


class File extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { type, name, size, fileIndex, style } = this.props;

    return (
      <div>


      <a
        onClick={this.handlesOnFileClick}
        className="list-group-item"
        style={{
          // height: '45px',
          paddingTop: '10px',
          paddingRight: '10px',
          backgroundColor: '#4A4A4A',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '0px',
          ...style
        }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <FileExtension fileType={type} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
            <FileName fileName={name} />
            <FileSize fileSize={size} />
          </div>
          <FileRemove
            fileIndex={fileIndex}
            onClick={this.handlesOnRemoveClick}
          />
        </div>
      </a>
      </div>
    );
  }

  handlesOnRemoveClick = fileIdx => {
    event.preventDefault();
    const { onFileRemove } = this.props;
    onFileRemove(fileIdx);
  }
}

File.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  // filePath: PropTypes.string,
  size: PropTypes.any.isRequired,
  fileIndex: PropTypes.number.isRequired,
  onFileRemove: PropTypes.func.isRequired,
  style: PropTypes.any
};

File.defaultProps = {
  type: 'unknown'
};

export default File;
