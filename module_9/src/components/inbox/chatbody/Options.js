import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useEditConversationMutation } from "../../../features/conversations/conversationsAPI";

export default function Options({ message }) {
    const [msg, setMsg] = useState("");
    const [editConversation, { isSuccess, isError, error }] =
    useEditConversationMutation();
    const { user } = useSelector((state) => state.auth) || {};
    const {sender, receiver} = message;
    const participantUser = receiver?.email !== user?.email ? receiver : sender;

    const handleSubmit = (e) => {
        e.preventDefault();

        editConversation({
            id: message?.conversationId,
            sender: user?.email,
            data: {
              participants: `${user?.email}-${participantUser.email}`,
              users: [user, participantUser],
              message: msg,
              timestamp: new Date().getTime(),
            }
        });
    }

    useEffect(() => {

        if(isError) {
            console.log(error, 'error')
        }

    }, [isError, error])


    useEffect(() => {

        if(isSuccess) {
            setMsg("");
        }

    }, [isSuccess])

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-between w-full p-3 border-t border-gray-300">
            <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            />
            <button type="submit">
                <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </form>
    );
}
