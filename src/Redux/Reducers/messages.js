const messageReducerDefaultState = [];

const messagesReducer = (state = messageReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return [...action.messages];
    case 'ADD_MESSAGE':
      return state.concat(action.message);
    case 'EDIT_MESSAGE':
      return state.map((message) =>
        message._id !== action.messageId
          ? message
          : { ...message, ...action.updates }
      );
    case 'DELETE_MESSAGE':
      return state.filter((message) => message._id !== action.messageId);
    default:
      return state;
  }
};

export default messagesReducer;
