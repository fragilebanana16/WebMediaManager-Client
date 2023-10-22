import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTheme, styled } from "@mui/material/styles";
import { Box, IconButton, Stack, Divider, Switch } from "@mui/material";
import useSettings from "../../hooks/useSettings";
import { useDispatch, useSelector } from "react-redux";
import { socket, connectSocket } from "../../utils/socket";
import {  UpdateDirectConversation,  AddDirectConversation,AddDirectMessage,} from "../../redux/slices/conversation";
import { FetchUserProfile, SelectConversation, showSnackbar } from "../../redux/slices/app";
const ChatDashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const {user_id} = useSelector((state) => state.auth);
  const user_id = window.localStorage.getItem("user_id");
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  const dispatch = useDispatch();
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  // const isDesktop = useResponsive("up", "md");
  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // window.onload = function () {
      //   if (!window.location.hash) {
      //     window.location = window.location + "#loaded";
      //     window.location.reload();
      //   }
      // };

      // window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      // socket.on("audio_call_notification", (data) => {
      //   // TODO => dispatch an action to add this in call_queue
      //   dispatch(PushToAudioCallQueue(data));
      // });
      
      // socket.on("video_call_notification", (data) => {
      //   // TODO => dispatch an action to add this in call_queue
      //   dispatch(PushToVideoCallQueue(data));
      // });

      socket.on("new_message", (data) => {
        const message = data.message;
        // console.log(current_conversation, data);
        console.log("new_message:", current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });

      socket.on("start_chat", (data) => {
        console.log(data);
        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el) => el?.id === data._id
        );
        
        if (existing_conversation) {
          // update direct conversation
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      });

      socket.on("new_friend_request", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "New friend request received",
          })
        );
      });

      socket.on("request_accepted", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Friend Request Accepted",
          })
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
      // socket?.off("audio_call_notification");
    };
  }, [isLoggedIn, socket]);

  if(!isLoggedIn){
    return <Navigate to="/auth/login">
    </Navigate>
  }
  return (
    <>
      <Stack direction='row'> {/*if no stack list will under sidebar*/}

        <Outlet />
      </Stack>
    </>
  );
};

export default ChatDashboardLayout;
