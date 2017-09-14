import React from 'react'
import SimpleWebRTC from 'simplewebrtc'

class WebRTC extends React.Component {
  constructor(props) { 
    super(props);

  }

  componentDidMount() {
    this.webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access
      autoRequestMedia: true,

      media: {audio: true, video: false}
     
    });

        this.webrtc.on('readyToCall', () => {
            
            this.webrtc.joinRoom(this.props.roomName);
          });
    }

  

  render () {
    return (
    <div>
      <video id="localVideo" height='300'></video>
      <div id="remoteVideos"></div>
   </div>
    )
  }

}

export default WebRTC;
