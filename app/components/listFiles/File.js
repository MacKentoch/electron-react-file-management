/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/forbid-prop-types:0 */
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import appConfig from '../../config';
import { Motion, spring, presets } from 'react-motion';
import FileExtension from './FileExtension';
import FileName from './FileName';
import FileSize from './FileSize';

class File extends Component {
  state = {
    showActions: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { type, name, size } = this.props;
    const { showActions } = this.state;

    return (
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
          borderRadius: '0px'
        }}>
        {/* file description */}
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontSize: '16px',
              color: '#F1F1F1',
            }}>
            <i className="fa fa-trash-o" />
          </div>
        </div>
        {/* actions */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Motion
            defaultStyle={{ y: 0 }}
            style={{
              y: spring(showActions ? 40 : 0)
            }}>
            {
              ({ y }) => (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    height: y,
                    color: '#F1F2F3'
                  }}>
                </div>
              )
            }
          </Motion>
        </div>
      </a>
    );
  }

  handlesOnFileClick = event => {
    event.preventDefault();
    this.setState({ showActions: !this.state.showActions });
  }
}

File.propTypes = {
  type: PropTypes.oneOf(appConfig.fileMimeTypes),
  name: PropTypes.string.isRequired,
  // filePath: PropTypes.string,
  size: PropTypes.any.isRequired
};

File.defaultProps = {
  type: 'unknown'
};

export default File;
