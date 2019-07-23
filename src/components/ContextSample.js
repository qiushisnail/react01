import React, { Component } from 'react'


// 1. 创建上下文
const Context = React.createContext();

const store = {
  name: '开课吧',
  sayHi() {
    console.log(this.name);
  }
}

const WithProvider = Comp => props => (
  <Context.Provider value={store}>
    <Comp {...props}></Comp>
  </Context.Provider>
)

const WithComsumer = Comp => props => (

  < Context.Consumer >
    {/* 获取数据 */}
    {/* 必须内嵌一个函数 */}
    {value => <Comp {...props} value={value}></Comp>}
  </Context.Consumer >
)

@WithComsumer // 消费
class Inner extends Component {
  render() {
    return <div onClick={() => console.log(this.props.value.name)}>{this.props.value.name}</div>
  }
}

@WithProvider // 注入
class ContextSample extends Component {
  render() {
    return <div><Inner></Inner></div>

  }
}
export default ContextSample