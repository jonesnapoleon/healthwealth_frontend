import React from "react";
// import { IconButton } from "@material-ui/core";
// import { ChevronLeft } from "@material-ui/icons";

class OpenCam extends React.Component {
  initializeMedia = () => {
    this.props.imageDataURL?.set(null);

    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia Not Implemented"));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: this.props.facingMode ?? "user" } })
      .then((stream) => {
        this.player.srcObject = stream;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.initializeMedia();
  }

  //   componentDidUpdate() {
  //     this.initializeMedia();
  //   }

  capturePicture = () => {
    if (this.player && this.player.srcObject) {
      var canvas = document.createElement("canvas");
      canvas.width = this.player.videoWidth;
      canvas.height = this.player.videoHeight;
      var contex = canvas.getContext("2d");
      contex.drawImage(this.player, 0, 0, canvas.width, canvas.height);
      this.player.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });

      this.props.imageDataURL?.set(canvas.toDataURL());
      this.props.setIsRecording((a) => !a);
    }
  };

  render() {
    return (
      <>
        <div className="open-cam-container item-centery">
          <video
            ref={(refrence) => {
              this.player = refrence;
            }}
            autoPlay
          ></video>
          <button
            onClick={() => {
              this.capturePicture();
              //   this.props.setIsRecording(false);
            }}
            className="btn btn-outline-light"
          >
            ⚪
          </button>
          {/* <div className="small-icon" onClick={}></div> */}
        </div>
      </>
    );
  }
}

export default OpenCam;
