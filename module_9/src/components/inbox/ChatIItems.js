import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversations/conversationsAPI";
import getPartnerInfo from "../../utils/getPartnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const {
    data: conversations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetConversationsQuery(user?.email);

  // decide what to render
  let content = null;
  if (isLoading) content = <li className="m-2 text-center">Loading....</li>;
  if (isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  }
  if (isSuccess && conversations.length === 0) {
    content = <li className="m-2 text-center">No conversations found!</li>;
  }
  if (isSuccess && conversations.length) {
    content = conversations.map((conversation) => {
      const { id, message, timestamp } = conversation;
      const { name, email } = getPartnerInfo(conversation?.users, user?.email);

      return (
        <li key={id}>
          <Link to={`/inbox/${id}`}>
            <ChatItem
              avatar={gravatarUrl(email, {
                size: 80,
              })}
              name={name}
              lastMessage={message}
              lastTime={moment(timestamp).fromNow()}
            />
          </Link>
        </li>
      );
    });
  }

  return <ul>{content}</ul>;
}
