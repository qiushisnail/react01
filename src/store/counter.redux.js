// reducer : 状态修改具体执行者
export default (state = 0, action) => {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state
  }
}

function add() {
  return ({ type: 'add' })
}
function minus() {
  return ({ type: 'minus' })
}
function asyncAdd() {
  return (dispatch, getState) => { // 返回函数的为异步操作
    console.log(getState()) // 获取当前状态值
    setTimeout(() => {
      dispatch({ type: 'add' })
    }, 1000)
  }
}

export { add, minus, asyncAdd }