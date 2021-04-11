export const AuthReducer = (
  state = 
  localStorage.getItem("tok") 
  || 
  false,
  action
) => {
  switch (action.type) {
    case "AuthChange":
      return action.token;

    case "Authfalse":
      return !state;

    case "LocalChange":
      return action.local;

    default:
      return state;
  }
};

export const DashbdPersonalReducer = (state = true, action) => {
  switch (action.type) {
    case "DashbdPersonal":
      return !state;
    
    default:
      return state;
  }
};
export const HistryPersonalReducer = (state = true, action) => {
  switch (action.type) {
    case "HistryPersonal":
      return !state;
    
    default:
      return state;
  }
};
