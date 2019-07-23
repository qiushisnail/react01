import React, { Component } from 'react'



// 高阶组件：给你一个组件，返回一个扩展后的组件
const withName = Comp => {
  // 甚至可以重写组件生命周期``
  class NewComponent extends Component {
    componentDidMount() {
      console.log(' do  something')
    }
    render() {
      return <Comp {...this.props} name="高阶组件使用介绍" />
    }
  }
  // 假设通过某种特殊手段获取了本节课的名字
  return NewComponent
}



const withLog = Comp => {
  console.log(Comp.name + '渲染了')
  return props => <Comp {...props} /> // 保证属性不能丢失
}
// 注解就是工厂函数
@withLog
@withName
@withLog
class Kaikeba extends Component {
  render() {
    return (
      <div>{this.props.stage} - {this.props.name}</div>
    )
  }

}
//export default withLog(withName(Kaikeba))
export default Kaikeba;