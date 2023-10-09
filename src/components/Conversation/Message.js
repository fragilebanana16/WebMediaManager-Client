import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { Chat_History } from "../../data";
import { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg } from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import {  FetchCurrentMessages,  SetCurrentConversation,} from "../../redux/slices/conversation";
import { socket } from "../../utils/socket";
const Message = ({menu}) => {
    const dispatch = useDispatch();

    const { conversations, current_messages } = useSelector(
      (state) => state.conversation.direct_chat
    );
    const { room_id } = useSelector((state) => state.app);
  
    useEffect(() => {
      const current = conversations.find((el) => el?.id === room_id);
  
      socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
        // data => list of messages
        console.log(data, "List of messages");
        dispatch(FetchCurrentMessages({ messages: data }));
      });
  
      dispatch(SetCurrentConversation(current));
    }, []);
    return (
        <Box p={3} >
            <Stack spacing={3}>
            {/* Chat_History.map */}
                {current_messages.map((el) => {
                    switch (el.type) {
                        case "divider":
                            return <TimeLine el={el} key={el.id} />
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    return <MediaMsg el={el} key={el.id} menu={menu}></MediaMsg>
                                case "link":
                                    return <LinkMsg el={el} key={el.id} menu={menu}></LinkMsg>
                                case "reply":
                                    return <ReplyMsg el={el} key={el.id} menu={menu}></ReplyMsg>
                                case "doc":
                                    return <DocMsg el={el} key={el.id} menu={menu}></DocMsg>
                                default:
                                    return <TextMsg el={el} key={el.id} menu={menu}></TextMsg>
                            }
                        default:
                            return <></>
                    }
                })
                }
            </Stack>

        </Box>
    )
}

export default Message