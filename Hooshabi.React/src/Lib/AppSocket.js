import AppContext from "./AppContext";
import AppManager from "./AppManager";

class AppSocket {
  constructor() {}

  static Instance = {
    connect: () => {
      return new Promise(async (resolve, reject) => {
        // var ws = new WebSocket(
        //   `${AppManager.APIUrl}ws?id=${AppContext.GetToken()}`
        //     .replace("https://", "wss://")
        //     .replace("http://", "ws://")
        // );
        // ws.onopen = (evt) => {
        //   AppSocket.Instance.ws = ws;
        //   AppSocket.Instance.IsConnected = true;
        //   AppSocket.Instance.ws.onmessage = (socket) => {
        //     try {
        //       var data = JSON.parse(socket.data);
        //       if (AppSocket.Instance.commands[data.c]) {
        //         AppSocket.Instance.commands[data.c](
        //           data.i,
        //           data.b,
        //           data.r,
        //           data.e
        //         );
        //       } else {
        //         console.log(`The command ${data.c} not found.`);
        //       }
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };

        //   AppSocket.Instance.ws.onerror = (socket) => {
        //     try {
        //       AppSocket.Instance.IsConnected = false;
        //       console.log("socket error.");
        //       socket = null;
        //       AppSocket.Instance.ws = null;
        //       reject(socket);
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };

        //   AppSocket.Instance.ws.onclose = (socket) => {
        //     try {
        //       AppSocket.Instance.IsConnected = false;
        //       console.log("socket closed.");
        //       socket = null;
        //       AppSocket.Instance.ws = null;
        //       reject(socket);
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };

        //   resolve();
        // };
      });
    },
    commands: {
      log: (arg) => {
        console.log(arg);
      },
      connected: (m, id) => {
        AppSocket.Instance.UserId = id;
      },
      setCurrentView: (view) => {
        AppSocket.Instance.CurrentView = view;
        if (!AppSocket.Instance.CurrentView.MessagingName)
          AppSocket.Instance.MessagePageIsloaded = false;
        if (AppSocket.Instance.IsConnected && !AppSocket.Instance.MessagePageIsloaded) {
          if (
            AppSocket.Instance.CurrentView.MessagingName &&
            AppSocket.Instance.CurrentView.MessagingName == "AppMessaging"
          ) {
            if (AppSocket.Instance.IsConnected) {
              AppSocket.Instance.commands.initMessageForm();
            } else {
              if (AppSocket.Instance.IsConnected) {
                AppSocket.Instance.commands.messagingInvisible();
              }
            }
          }
        }
      },
      initMessageForm: (view) => {
        AppSocket.Instance.MessagePageIsloaded = true;
        AppSocket.Instance.commands.getCurrentRooms();
      },
      searchUser: (user) => {},
      sendData: (c, i, b, r, e) => {
        if (AppSocket.Instance.ws) {
          let selfMsg = { i: i, c: c };
          if (b) selfMsg.b = b;
          if (r) selfMsg.r = r;
          if (e) selfMsg.e = e;
          let msg = JSON.stringify(selfMsg);
          AppSocket.Instance.ws.send(msg);
        }
      },
      getCurrentRooms: () => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData("getCurrentRooms");
        }
      },
      messagingInvisible: () => {
        AppSocket.Instance.commands.sendData("messagingInvisible");
      },
      addRoom: (name, type) => {},
      removeRoom: (room) => {},
      sendMessage: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "sendMessage",
            id,
            body,
            room,
            null
          );
        }
      },
      loadMessages: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "loadMessages",
            id,
            body,
            room,
            null
          );
        }
      },
      notify: (data) => {},
      downloadAttachment: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "downloadAttachment",
            id,
            body,
            room,
            null
          );
        }
      },
      startVideoCall: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "startVideoCall",
            id,
            body,
            room,
            error
          );
        }
      },
      startAudioCall: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "startAudioCall",
            id,
            body,
            room,
            error
          );
        }
      },
      videoCallByCallerPeer: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "videoCallByCallerPeer",
            id,
            body,
            room,
            error
          );
        }
      },
      audioCallByCallerPeer: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "audioCallByCallerPeer",
            id,
            body,
            room,
            error
          );
        }
      },
      searchUsers: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "searchUsers",
            id,
            body,
            room,
            error
          );
        }
      },
      joinToRoom: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "joinToRoom",
            id,
            body,
            room,
            error
          );
        }
      },
      //////////////////////
      onSearchUser: (user) => {},
      onGetCurrentRooms: (i, body) => {
        if (
          AppSocket.Instance.CurrentView.state &&
          AppSocket.Instance.CurrentView.state.TempSelectedSearchedRoomId
        ) {
          var newVal =
            AppSocket.Instance.CurrentView.state.TempSelectedSearchedRoomId;

          AppSocket.Instance.CurrentView.setState({
            Rooms: body,
            SelectedRoom: newVal,
            TempSelectedSearchedRoomId: null,
          });

          AppSocket.Instance.commands.loadMessages(
            Date.now(),
            null,
            newVal,
            null,
            null
          );
        } else {
          AppSocket.Instance.CurrentView.setState({ Rooms: body });
        }
      },
      onAddRoom: (name, type) => {},
      onRemoveRoom: (room) => {},
      onSendMessage: (id, body, room) => {
        if (!AppSocket.Instance.CurrentView.state[`Room-${room}`]) {
          var tempState = {};
          tempState[
            `Room-${AppSocket.Instance.CurrentView.state.SelectedRoom}`
          ] = [{ Id: id, Message: body }];
          AppSocket.Instance.CurrentView.setState({ ...tempState });
        } else {
          var data = AppSocket.Instance.CurrentView.state[`Room-${room}`];
          var tempState = {};
          tempState[
            `Room-${AppSocket.Instance.CurrentView.state.SelectedRoom}`
          ] = [
            ...data,
            {
              Id: id,
              Message: body.body,
              MessageStatus: "✓",
              ChatRoomId: room,
              UserId: body.UserId,
              Username: body.Username,
              Attachments: (body.Attachments || []).map((u) => {
                return {
                  AttachmentName: u.Name,
                  AttachmentId: u.AttachmentId,
                  id: u.Id,
                };
              }),
            },
          ];
          AppSocket.Instance.CurrentView.setState({ ...tempState });
        }
      },
      onVerifySendMessage: (id, body, room, error) => {
        console.log(AppSocket.Instance.CurrentView.state[`Room-${room}`]);
        if (AppSocket.Instance.CurrentView.state[`Room-${room}`]) {
          var rec = AppSocket.Instance.CurrentView.state[`Room-${room}`].find(
            (t) => t.TempId == body.id
          );
          if (rec) {
            rec.Sent = true;
            rec.MessageStatus = "✓";
            (rec.Attachments || []).forEach((element) => {
              var item = body.Attachments.find(
                (u) => u.Id == element.TempAttachmentId
              );
              if (item) {
                element.AttachmentId = item.AttachmentId;
              }
            });
          }
          var update = {};
          update[`Room-${room}`] =
            AppSocket.Instance.CurrentView.state[`Room-${room}`];
          AppSocket.Instance.CurrentView.setState(update);
        }
      },
      onLoadMessages: (id, body, room, error) => {
        var tempState = {};
        // if (t["Message.MessageAttachments.AttachmentId"]) {
        //   data.Attachment = t["Message.MessageAttachments.AttachmentId"];
        // }
        var tempData = (tempState[`Room-${room}`] = []);
        body.map((t) => {
          var data = {
            Id: t["Message.Id"],
            Message: t["Message.Message"],
            IsSeen: t["IsSeen"],
            ChatRoomId: t["ChatRoomId"],
            MessageId: t["MessageId"],
            SentDate: t["SentDate"],
            ReceiverId: t["UserId"],
            UserId: t["Message.UserId"],
            Username: t["Message.User.Username"],
            MessageStatus: t["IsSeen"] ? "✓✓" : "✓",
          };

          var old = tempData.find((t) => t.Id == data.Id);
          if (!old) {
            if (t["Message.MessageAttachments.AttachmentId"]) {
              data.Attachments = [
                {
                  AttachmentId: t["Message.MessageAttachments.AttachmentId"],
                  AttachmentName:
                    t["Message.MessageAttachments.Attachment.FileName"] +
                    "." +
                    t["Message.MessageAttachments.Attachment.Extension"],
                },
              ];
            }
            tempData.push(data);
          } else if (
            t["Message.MessageAttachments.AttachmentId"] &&
            t["Message.MessageAttachments.Attachment.FileName"]
          ) {
            old.Attachments.push({
              AttachmentId: t["Message.MessageAttachments.AttachmentId"],
              AttachmentName:
                t["Message.MessageAttachments.Attachment.FileName"] +
                "." +
                t["Message.MessageAttachments.Attachment.Extension"],
            });
          }
          return data;
        });
        AppSocket.Instance.CurrentView.setState({ ...tempState });
      },
      onMakeVideoCall: () => {},
      onMakeAudioCall: () => {},
      onDownloadAttachment: async (id, body, room, error) => {
        if (body && body.file) {
          var buffer = Buffer.from(body.file, "base64");
          const fileURL = window.URL.createObjectURL(
            new Blob([new Uint8Array(buffer, buffer.byteOffset, buffer.length)])
          );
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          const fileName = body.name;
          fileLink.setAttribute("download", fileName);
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
          fileLink.remove();
        }
      },
      onStartVideoCall: (id, body, room, error) => {
        if (body && body.status) {
          AppSocket.Instance.CurrentView.VideoCallStep2();
        }
      },
      onvideoCallStep2: (id, body, room, error) => {
        if (body && body.status) {
          AppSocket.Instance.CurrentView.VideoCallStep2();
        }
      },
      onVideoCallByCallerPeer: (id, body, room, error) => {
        if (body) {
          AppSocket.Instance.CurrentView.VideoCallReceiverPeer(body);
        }
      },
      onReceiveVideoCall: (id, body, room, error) => {
        if (body) {
          AppSocket.Instance.CurrentView.onReceiveVideoCall(body);
        }
      },
      onStartAudioCall: (id, body, room, error) => {
        if (body && body.status) {
          AppSocket.Instance.CurrentView.AudioCallStep2();
        }
      },
      onAudioCallStep2: (id, body, room, error) => {
        if (body && body.status) {
          AppSocket.Instance.CurrentView.AudioCallStep2();
        }
      },
      onAudioCallByCallerPeer: (id, body, room, error) => {
        if (body) {
          AppSocket.Instance.CurrentView.AudioCallReceiverPeer(body);
        }
      },
      onReceiveAudioCall: (id, body, room, error) => {
        if (body) {
          AppSocket.Instance.CurrentView.onReceiveAudioCall(id, body);
        }
      },
      callAccepted: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.commands.sendData(
            "callAccepted",
            id,
            body,
            room,
            error
          );
        }
      },
      onSearchUsers: (id, body, room, error) => {
        AppSocket.Instance.CurrentView.onSearchedUsers(body);
      },
      onJoinToRoom: (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.CurrentView.onJoinToRoom(body);
        }
      },
      OnVideoCallByCallerPeerOffline:  (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.CurrentView.OnVideoCallByCallerPeerOffline(id);
        }
      },
      OnAudioCallByCallerPeer:  (id, body, room, error) => {
        if (AppSocket.Instance.ws) {
          AppSocket.Instance.CurrentView.OnAudioCallByCallerPeer(id);
        }
      },
    },
  };
}

export default AppSocket;
