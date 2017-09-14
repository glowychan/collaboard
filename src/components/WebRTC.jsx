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

      localVideo: {
        autoplay: true, // automatically play the video stream on the page
        mirror: true, // flip the local video to mirror mode (for UX)
        muted: true // mute local video stream to prevent echo
      },

      media: {audio: true, video: true}
     
    });

        this.webrtc.on('readyToCall', () => {
            
            this.webrtc.joinRoom(this.props.roomName);
          });
    }
    
  
  

  render () {
    return (
    <div className='chatbar'>
      <div id="remoteVideos"></div>
   </div>
    )
  }

}

export default WebRTC;
