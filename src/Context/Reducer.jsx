export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { state, isLogin: true, user: action.payload }; // ✅ Preserve state

    case "USER_LOGOUT":
      return { state, isLogin: false, user: {} }; // ✅ Preserve state

    default:
      return state; // ✅ Ensure default case returns state
  }
};

export const Idreducer = (stateId, action) => {
  switch (action.type) {
    case "USER_ID":
      return { stateId, idUser: action.payload }; // ✅ Preserve state

    case "USER_ID_NOTFOUND":
      return { stateId, idUser: null }; // ✅ Preserve state

    default:
      return stateId; // ✅ Ensure default case returns stateId
  }
};


