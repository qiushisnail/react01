import React, { Component } from 'react'
import logo from './logo.jpeg'
import "./App.css"
import { Button } from 'antd';

// 函数型组件 传递props
function Welcome1(props) {
  return (
    <div>
      hello, {props.name}
    </div>
  )
}

export default class App extends Component {//  React.Component
  // 1. 当需要状态时，需要构造函数
  constructor(props) {
    super(props); // 必写

    //2. 初始化状态
    this.state = { // 类似vue的data，响应式
      count: 0,
      date: new Date()
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      //3. 更新状态 -每次更新，render都会重新执行
      this.setState({
        date: new Date(),
        count: this.state.count + 1 // 不科学， 不能依赖上一次对象
      })
    }, 1000)

    // 注意1： 不能直接该状态
    // this.state.date = new Date(); 不行

    // 注意2： setState() 批量异步的
    this.setState((prevState, prevProps) => ({
      count: prevState.count + 1//  如果依赖之前的状态或数学，就使用function
    }), () => { // 回调函数获取最新的值
      console.log(this.state.count)
    })

  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }
  render() {
    const name = 'jerry';
    // jsx本身也是表达式
    const jsx = <p>hello,你好</p>
    return ( //JSX html模板块
      <div>
        {/* antd试用 */}
        <Button type="primary">按钮</Button>
        App组件
        {/* 表达式 */}
        <h1>{name}</h1>
        <p>{this.formatName({ firstName: 'Tom', lastName: 'White' })}</p>
        {/* 属性 */}
        <img src={logo} style={{ width: '100px' }} className='img' />
        {/* jsx也是表达式 */}
        {jsx}
        {/* 组件属性传值: 传入属性是只读的，严格遵循单向数据流*/}
        <Welcome1 name="Tom"></Welcome1>
        {/* 使用状态 */}
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
