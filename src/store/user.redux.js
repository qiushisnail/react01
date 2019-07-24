const initialState = {
  isLogin: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'login':
      return { isLogin: true };

    default:
      return state
  }
};


export function login() {
  return (dispatch) => {
    // mock 一个登录
    setTimeout(() => {
      dispatch({ type: 'login' })
    }, 1000)
  }

}
