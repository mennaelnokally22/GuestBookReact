const authReducerDefaultSatate = {
  token: null,
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
};

const authenticationReducer = (state = authReducerDefaultSatate, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...action.userData };
    default:
      return state;
  }
};

export default authenticationReducer;
