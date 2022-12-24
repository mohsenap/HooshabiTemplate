
import AppManager from "./AppManager";

class AppPeer {
  constructor() {
    this.LoadPeer = async function () {
      const PeerJs = await import("peerjs");
      Window.Peer = PeerJs.default;
      return PeerJs;
    };

    this.PreparePeer = () => {
      let Peer = window.Peer;
      this.appNavigator =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia ||
        navigator.mediaDevices.msGetUserMedia;

      let messagesEl = window.document.querySelector(".messages");
      let peerIdEl = window.document.querySelector("#connect-to-peer");
      let videoEl = window.document.querySelector(".remote-video");

      let logMessage = (message) => {
        if (messagesEl) {
          let newMessage = document.createElement("div");
          newMessage.innerText = message;
          messagesEl.appendChild(newMessage);
        }
      };

      let renderVideo = (stream) => {
        videoEl.srcObject = stream;
      };

      let peer = new Peer({
        host: "/",
        port:
          process.env.REACT_APP_APIPORT > 0
            ? process.env.REACT_APP_APIPORT
            : 80,
        path: "/peerjs/myapp",
        secure: false,
      });

      peer.on("open", (id) => {
        logMessage("My peer ID is: " + id);
      });

      peer.on("error", (error) => {
        console.error(error);
      });

      // Handle incoming data connection
      peer.on("connection", (conn) => {
        logMessage("incoming peer connection!");
        conn.on("data", (data) => {
          logMessage(`received: ${data}`);
        });
        conn.on("open", () => {
          conn.send("hello!");
        });
      });

      // Handle incoming voice/video connection
      peer.on("call", (call) => {
        this.appNavigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on("stream", renderVideo);
          })
          .catch((err) => {
            console.error("Failed to get local stream", err);
          });
      });

      // Initiate outgoing connection
      let connectToPeer = () => {
        let peerId = peerIdEl.value;
        logMessage(`Connecting to ${peerId}...`);
        let conn = peer.connect(peerId);
        conn.on("data", (data) => {
          logMessage(`received: ${data}`);
        });
        conn.on("open", () => {
          conn.send("hi!");
        });
        this.appNavigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            let call = peer.call(peerId, stream);
            call.on("stream", renderVideo);
          })
          .catch((err) => {
            logMessage("Failed to get local stream", err);
          });
      };
      window.connectToPeer = connectToPeer;
    };

  }
}

export default AppPeer;
