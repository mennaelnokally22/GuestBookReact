import axios from 'axios';

const setMessages = (messages) => ({
  type: 'SET_MESSAGES',
  messages,
});

const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message,
});

const editMessage = (messageId, updates) => ({
  type: 'EDIT_MESSAGE',
  messageId,
  updates,
});

const deleteMessage = (messageId) => ({
  type: 'DELETE_MESSAGE',
  messageId,
});

const fetchMessages = () => {
  return async (dispatch) => {
    const { data: messages } = await axios.get(
      'http://localhost:3000/message/received',
      {
        headers: {
          authorization: `${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch(setMessages(messages));
  };
};

const fetchSentMessages = () => {
  return async (dispatch) => {
    const { data: messages } = await axios.get(
      'http://localhost:3000/message/sent',
      {
        headers: {
          authorization: `${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch(setMessages(messages));
  };
};

const onAddMessage = (message) => {
  console.log(message);
  return async (dispatch) => {
    const { data } = await axios.post(
      'http://localhost:3000/message',
      message,
      {
        headers: {
          authorization: `${localStorage.getItem('token')}`,
        },
      }
    );
    // dispatch(addMessage(data.message));
    return data;
  };
};

const onEditMessage = (messageId, updates) => {
  return async (dispatch) => {
    console.log(updates);
    const { data } = await axios.patch(
      `http://localhost:3000/message/${messageId}`,
      updates,
      {
        headers: { authorization: `${localStorage.getItem('token')}` },
      }
    );
    console.log(data);
    dispatch(editMessage(messageId, updates));
  };
};

const onDeleteMessage = (messageId) => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      `http://localhost:3000/message/${messageId}`,
      {
        headers: { authorization: `${localStorage.getItem('token')}` },
      }
    );
    console.log(data);
    dispatch(deleteMessage(messageId));
  };
};

export {
  setMessages,
  addMessage,
  editMessage,
  deleteMessage,
  fetchMessages,
  fetchSentMessages,
  onAddMessage,
  onEditMessage,
  onDeleteMessage,
};
