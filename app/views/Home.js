/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */

import React, { Component } from 'react';
import { Notification } from 'react-notification';
import shallowCompare from 'react-addons-shallow-compare';
import Dropzone from 'react-dropzone';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';


const fs = require('fs');
const path = require('path');

class Home extends Component {
  defaultPartage = 'D:\\TODEL';

  state = {
    files: null,
    animated: true,
    viewEntersAnim: true,
    showNotification: true
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { animated, viewEntersAnim, files } = this.state;
    return (
      <ViewContainer
        animated={animated}
        launchAnimation={viewEntersAnim}>
        <div className="row">
          <div className="col-sm-12">
            <ViewTitle
              title={'Uploader'}
              faIconName={'fa-upload'}
            />
            <div>
              <Dropzone
                ref={ref => (this.dropzone = ref)}
                className="center-block"
                style={{
                  width: '400px',
                  height: '300px',
                  borderWidth: 2,
                  borderColor: '#f07d00',
                  borderStyle: 'dashed',
                  borderRadius: 5
                }}
                onDrop={this.onDrop}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <div>
                    Drop here files, or click this area to manually select files
                  </div>
                </div>
              </Dropzone>
              {
                files
                ?
                  <div>
                    {
                      files.length === 0
                      ?
                        <h2>
                          Upload done.
                        </h2>
                      :
                        <h2>
                          Uploading {files.length} files...
                        </h2>
                    }
                    <div>
                      {
                        files.map((file, fileIdx) => <img key={fileIdx} alt="" src={file.preview} />)
                      }
                    </div>
                  </div>
              : null
            }
            </div>
          </div>
        </div>
        <Notification
          isActive={this.state.showNotification}
          title="Title!"
          message={'Notification'}
          action={'Dismiss'}
          onDismiss={this.onNotificationClick}
          onClick={this.onNotificationClick}
        />
      </ViewContainer>
    );
  }

  onNotificationClick = () => {
    this.setState({ showNotification: false });
  }

  onDrop = files => {
    this.setState({ files });
    this.saveToDisk(files);
  }

  onOpenClick = () => {
    this.dropzone.open();
  }

  saveToDisk = files => {
    files.forEach((file) => {
      const filePath = path.join(this.defaultPartage, file.name);
      this.writeFile(file, filePath)
        .then(
          () => {
            const newListOfFiles = [...this.state.files].filter(fil => fil.name !== file.name);
            this.setState({ files: newListOfFiles });
            return true;
          }
        )
        .catch(
          err => {
            throw new Error(err);
          }
        );
    });
  }

  writeFile = (file, filePath) => {
    return new Promise(
      (resolve, reject) => {
        fs.writeFile(filePath, file,
          err => {
            if (err) {
              return reject(err);
            }
            return resolve({ file: file.name });
          }
        );
      }
    );
  }
}

export default Home;
