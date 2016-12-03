/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { TransitionMotion, spring, presets } from 'react-motion';
import File from './File';


class ListFiles extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { files, onFileRemove } = this.props;

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
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            // styles={this.getStyles()}
            styles={
              files.map((file, fileIdx) => ({
                key: String(fileIdx),
                data: {
                  type: file.type,
                  name: file.name,
                  filePath: file.filePath,
                  size: file.size
                },
                style: {
                  height: spring(60, presets.gentle),
                  opacity: spring(1, presets.gentle)
                }
              }))
            }
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {
              interpolatedStyles =>
                <div
                  className="list-group"
                  style={{ width: '400px' }}>
                  {
                    interpolatedStyles.map(
                      ({ key, data: { name, type, filePath, size }, style }, fileIdx) => {
                        // { name, type, filePath, size, key, style },
                        return (
                          <File
                            key={fileIdx}
                            fileIndex={fileIdx}
                            name={name}
                            type={type}
                            filePath={filePath}
                            size={size}
                            onFileRemove={onFileRemove}
                            style={style}
                          />
                        );
                      }
                    )
                  }
                </div>
            }
          </TransitionMotion>
        </div>
      </div>
    );
  }

  // actual animation-related logic
  getDefaultStyles() {
    const { files } = this.props;
    return files.map((file, fileIdx) => (
      {
        key: String(fileIdx),
        data: {
          type: file.type,
          name: file.name,
          filePath: file.filePath,
          size: file.size
        },
        style: {
          height: 0,
          opacity: 1
        }
      }
    ));
  }

  getStyle() {
    const { files } = this.props;
    files.map((file, fileIdx) => (
      {
        key: String(fileIdx),
        data: {
          type: file.type,
          name: file.name,
          filePath: file.filePath,
          size: file.size
        },
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle)
        }
      }
    ));
  }

  willEnter = () => {
    return {
      height: 0,
      opacity: 1
    };
  }

  willLeave = () => {
    return {
      height: spring(0, presets.gentle),
      opacity: spring(0, presets.gentle)
    };
  }
}

ListFiles.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string.isRequired,
      filePath: PropTypes.string,
      size: PropTypes.any.isRequired
    })
  ),
  onFileRemove: PropTypes.func.isRequired
};

export default ListFiles;
