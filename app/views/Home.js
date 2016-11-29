import React, {
  Component
}                     from 'react';
import cx             from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import { Link }       from 'react-router';
import Dropzone       from 'react-dropzone';
const fs              = require('fs');
const path            = require('path');

class Home extends Component {
  _defaultPartage = 'D:\\TODEL';

  state = {
    files: null,
    animated: true,
    viewEntersAnim: true
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { animated, viewEntersAnim } = this.state;
    return(
      <div
        key="homeView"
        className={cx({
          'view--content': true,
          'animatedViews': animated,
          'view-enter': viewEntersAnim
        })}>
        <div className="row">
          <div className="col-sm-12">

              <h1>
                Uploader
              </h1>

              <div>
                <Dropzone
                  ref="dropzone"
                  className="center-block"
                  style={
                    {
                      width: '400px',
                      height: '300px',
                      borderWidth: 2,
                      borderColor: '#f07d00',
                      borderStyle: 'dashed',
                      borderRadius: 5
                    }
                  }
                  onDrop={this.onDrop}>
                  <div>
                    Drop here files, or click this area to manually select files
                  </div>
                </Dropzone>
                {/* <button
                  type="button"
                  onClick={this.onOpenClick}>
                    Open Dropzone
                </button> */}
                {
                  this.state.files
                  ? <div>
                    {
                      this.state.files.length === 0
                      ?
                        <h2>
                          Upload done.
                        </h2>
                      :
                        <h2>
                          Uploading {this.state.files.length} files...
                        </h2>
                    }
                      <div>
                        {
                          this.state.files.map(
                            (file, fileIdx) => <img key={fileIdx} src={file.preview} />
                          )
                        }
                      </div>
                    </div>
                : null
              }
              </div>

              {/* <p>
                <Link
                  className="btn btn-success btn-lg"
                  to={'/about'}>
                  <i className="fa fa-info" />
                  &nbsp;
                  go to about
                </Link>
              </p> */}

          </div>
        </div>
      </div>
    );
  }
  onDrop = files => {
    this.setState({
      files: files
    });
    this.saveToDisk(files);
  }

  onOpenClick = () => {
    this.refs.dropzone.open();
  }

  saveToDisk = files => {
    files.forEach((file)=> {
      const filePath = path.join(this._defaultPartage, file.name);
      this.writeFile(file, filePath)
        .then(
          () => {
            const newListOfFiles = [...this.state.files].filter(fil=>fil.name !== file.name);
            console.log('upload done for file name: ', file.name);
            this.setState({files: newListOfFiles});
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
            return resolve({file: file.name});
          }
        );
      }
    );
  }
}

export default Home;
