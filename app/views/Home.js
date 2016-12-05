/* eslint react/jsx-closing-bracket-location:0 */
/* eslint react/sort-comp:0 */
/* eslint arrow-body-style:0 */
/* eslint react/no-unused-prop-types:0 */
import React, { PureComponent, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { List, fromJS } from 'immutable';
import ViewContainer from '../components/ViewContainer';
import ViewTitle from '../components/ViewTitle';
import ListFiles from '../components/listFiles/ListFiles';

class Home extends PureComponent {
  defaultPartage = '~/fileStore'; // 'D:\\TODEL';

  state = {
    animated: true,
    viewEntersAnim: true,
    showNotification: true,
    dropZoneMouseHover: false
  };

  componentWillMount() {
    const { actions: { enterHome, setFilePath } } = this.props;
    enterHome();
    setFilePath(this.defaultPartage);
  }

  // componentDidMount() {
  //   // this.dropzone.addEventListener('dragover', this.setDropzoneHover);
  //   // this.dropzone.addEventListener('drop', this.resetDropzoneHover);
  // }

  componentWillUnmount() {
    const { actions: { leaveHome } } = this.props;
    leaveHome();
  }

  render() {
    const { animated, viewEntersAnim, dropZoneMouseHover } = this.state;
    const { files } = this.props;
    const currentNbFiles = files && files.size ? files.size : 0;

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
                ref={this.setDropzoneRef}
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
                  backgroundColor: `${dropZoneMouseHover ? '#EB9532' : 'transparent'}`
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
                  alignItems: 'center',
                  flexDirection: 'column'
                }}>
                <div>
                  <button
                    className="btn btn-primary"
                    style={{
                      marginTop: 20,
                      width: 400
                    }}
                    disabled={currentNbFiles === 0}
                    onClick={this.saveFiles}>
                    {
                      currentNbFiles > 0
                      ?
                        <span>
                          <i className="fa fa-floppy-o" />&nbsp;
                          Save files
                        </span>
                      :
                        <span>
                          <i className="fa fa-info-circle" />&nbsp;
                          Add files to save
                        </span>
                    }
                  </button>
                </div>
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

  setDropzoneHover = () => {
    this.setState({ dropZoneMouseHover: true });
  }

  resetDropzoneHover = () => {
    this.setState({ dropZoneMouseHover: false });
  }

  setDropzoneRef = (ref) => {
    this.dropzone = ref;
  }

  handlesOnFileRemove = fileIndex => {
    const { actions: { removeFileByIndex } } = this.props;
    removeFileByIndex(fileIndex);
  }

  onDrop = newFiles => {
    const { actions: { addfiles } } = this.props;
    const immutableFiles = fromJS(newFiles);
    addfiles(immutableFiles);
  }

  saveFiles = (event) => {
    event.preventDefault();
    const { files, actions: { writeFiles } } = this.props;
    writeFiles(files);
  }

  onOpenClick = () => {
    this.dropzone.open();
  }
}

Home.propTypes = {
  // views:
  currentView: PropTypes.string.isRequired,
  // files:
  filePath: PropTypes.string,
  lastUploadTime: PropTypes.string,
  files: PropTypes.instanceOf(List),

  actions: PropTypes.shape({
    // views:
    enterHome: PropTypes.func.isRequired,
    leaveHome: PropTypes.func.isRequired,
    // files:
    setFilePath: PropTypes.func.isRequired,
    addfiles: PropTypes.func.isRequired,
    removeFileByIndex: PropTypes.func.isRequired,
    removeFileByFileName: PropTypes.func.isRequired,
    writeFiles: PropTypes.func.isRequired
  }).isRequired
};

export default Home;
