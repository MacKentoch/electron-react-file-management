/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
import React, { PureComponent, PropTypes } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import { List } from 'immutable';
import File from './File';


class ListFiles extends PureComponent {
  render() {
    const { onFileRemove, showDeleteButton } = this.props;

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
            styles={this.getStyle()}
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
                        return (
                          <File
                            key={fileIdx}
                            fileIndex={fileIdx}
                            name={name}
                            type={type}
                            filePath={filePath}
                            size={size}
                            showDeleteButton={showDeleteButton}
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

  getStyle() {
    const { files } = this.props;
    return files.map(
      (file, fileIdx) => (
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
      )
    ).toJS();
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
  files: PropTypes.instanceOf(List),
  // files: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     type: PropTypes.string,
  //     name: PropTypes.string.isRequired,
  //     filePath: PropTypes.string,
  //     size: PropTypes.any.isRequired
  //   })
  // ),
  showDeleteButton: PropTypes.bool,
  onFileRemove: PropTypes.func
};

ListFiles.defaultProps = {
  showDeleteButton: true
};

export default ListFiles;
