import { apiSlice } from "../api/apiSlice";
import { messagesAPI } from "../messages/messagesAPI";

export const conversationsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    }),
    addConversation: builder.mutation({
      query: ({sender, data}) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {

          const conversation = await queryFulfilled;
          if(conversation?.data?.id) {
            // silent entry to message table
            const users = arg.data.users;
            const senderUser = users.find(user =>user.email === arg.sender);
            const receiverUser = users.find(user =>user.email !== arg.sender);

            dispatch(messagesAPI.endpoints.addMessage.initiate({
              conversationId: conversation?.data?.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.data.message,
              timestamp: arg.data.timestamp
            }))
          }
          
        } catch (error) {
          
        }
      }
    }),
    editConversation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({id, sender, data}, {dispatch, queryFulfilled}) {
        // optimistic cache update start
        const pathResult = dispatch(apiSlice.util.updateQueryData('getConversations', sender, (draft) => {
          const draftConversation = draft.find(c => c.id == id);
          draftConversation.message = data.message;
          draftConversation.timestamp = data.timestamp;
        }))
        // optimistic cache update end

        try {

          const conversation = await queryFulfilled;
          if(conversation?.data?.id) {
            // silent entry to message table
            const users = data.users;
            const senderUser = users.find(user =>user.email === sender);
            const receiverUser = users.find(user =>user.email !== sender);

            const res = await dispatch(messagesAPI.endpoints.addMessage.initiate({
              conversationId: conversation?.data?.id,
              sender: senderUser,
              receiver: receiverUser,
              message: data.message,
              timestamp: data.timestamp
            })).unwrap()

            dispatch(apiSlice.util.updateQueryData('getMessages', res?.conversationId.toString(), (draft) => {
              draft.push(res);
            }))

          }
          
        } catch (error) {
          pathResult.undo();
        }
      }
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationsAPI;
