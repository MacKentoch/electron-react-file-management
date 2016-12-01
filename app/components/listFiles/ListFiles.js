/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import appConfig from '../../config';
import File from './File';


class ListFiles extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { files } = this.props;

    return (
      <div
        style={{
          marginTop: '30px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFFFF'
          }}>
          <div
            className="list-group"
            style={{
              width: '400px'
            }}>
            {
            files.map(
              ({ name, type, filePath, size }, fileIdx) => (
                <File
                  key={fileIdx}
                  name={name}
                  type={type}
                  filePath={filePath}
                  size={size}
                />
              )
            )
          }
          </div>
        </div>
      </div>
    );
  }
}

ListFiles.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(appConfig.fileMimeTypes),
      name: PropTypes.string.isRequired,
      filePath: PropTypes.string,
      size: PropTypes.any.isRequired
    })
  )
};

export default ListFiles;
