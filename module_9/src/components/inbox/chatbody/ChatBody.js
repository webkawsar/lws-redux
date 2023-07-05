// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesAPI";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
  const { id } = useParams();
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery(id);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading....</div>
  }
  
  if (isError) {
    content = (
      <div>
        <Error message={error?.data ?? "Something went wrong!"} />
      </div>
    )
  }
    
  if (isSuccess && messages.length === 0) {
    content = <div className="p-5 text-center">No messages found!</div>;
  }
  
  if (isSuccess && messages.length) {
    content = (
      <>
        <ChatHead
          message={messages[0]}
        />
        <Messages messages={messages} />
        <Options />
      </>
    );
  }

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        {content}
      </div>
    </div>
  );
}
