import React from 'react'
import SimpleWebRTC from 'simplewebrtc'
import Draggable from 'react-draggable'


class WebRTC extends React.Component {
  constructor(props) { 
    super(props);
    this.state = ({
      videoOn: true
    })

   this.toggleVideo = this.toggleVideo.bind(this)
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
        muted: true // mute local video stream to prevent echo
      },

      media: {audio: true, video: true}
     
    });

        this.webrtc.on('readyToCall', () => {
            
           this.webrtc.joinRoom(this.props.roomName + 'gra091873');
          });
    }
    
    toggleVideo = () => {
    if (this.state.videoOn === true) {
      this.webrtc.pauseVideo()
      this.setState({
        videoOn: false
      })
    } else {
      this.webrtc.resumeVideo()
      this.setState({
        videoOn: true
      })
    }
  }
  
  

  render () {
    return (
    <div className='chatbar'>
     <video id="localVideo" onClick={this.toggleVideo}></video>
      <Draggable>
      <div id="remoteVideos"></div>
      </Draggable>
    </div>
    )
  }

}

export default WebRTC;
