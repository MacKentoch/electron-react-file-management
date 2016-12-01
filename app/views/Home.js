/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Dropzone from 'react-dropzone';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';
import ListFiles from '../components/listFiles/ListFiles';

const fs = require('fs');
const path = require('path');

class Home extends Component {
  defaultPartage = '~/fileStore';// 'D:\\TODEL';

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
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onDrop={this.onDrop}>
                <div
                  style={{
                    flex: 1,
                    display: 'flex'
                  }}>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                    <i>
                      Drop here files, or click this area to manually select files
                    </i>
                  </div>
                </div>
              </Dropzone>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                {
                files
                ?
                  <ListFiles
                    files={files}
                    onFileRemove={this.handlesOnFileRemove}
                  />
                :
                  null
              }
              </div>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }

  handlesOnFileRemove = fileIndex => {
    const { files } = this.state;
    if (files) {
      this.setState({ files: files.filter((_, idx) => idx !== fileIndex) });
    }
  }

  onDrop = newFiles => {
    const { files } = this.state;
    if (files) {
      this.setState({ files: [...files, ...newFiles] });
    } else {
      this.setState({ files: [...newFiles] });
    }
    // this.saveToDisk(newFiles);
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
            const newListOfFiles = [...this.state.files]; //.filter(fil => fil.name !== file.name);
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
