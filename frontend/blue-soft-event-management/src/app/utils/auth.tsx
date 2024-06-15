export const loadUserFromLocalStorage = (dispatch:any, loginAction:any) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
  
    if (token && user) {
      dispatch(loginAction(JSON.parse(user)));
    }
  };
  