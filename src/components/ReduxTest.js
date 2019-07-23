import React, { Component } from 'react'
//import store from '../store'
import { add, minus, asyncAdd } from '../store/counter.redux'
import { connect } from 'react-redux' // 高阶

// const mapStateToProps = state => ({ num: state }) // 状态映射
// const mapDispatchToProps = dispatch => ({
//   add: () => dispatch({ type: 'add' }),
//   minus: () => dispatch({ type: "minus" })
// })

// @connect(mapStateToProps, mapDispatchToProps)

@connect(
  state => ({ num: state.counter }),
  { add, minus, asyncAdd }
)
class ReduxTest extends Component {
  render() {
    return (
      <div>
        {/* <p>{store.getState()}</p>
        <div>
          <button onClick={() => store.dispatch({ type: 'minus' })}>-</button>
          <button onClick={() => store.dispatch({ type: 'add' })}>+</button>
        </div> */}

        <p>{this.props.num}</p>
        <div>
          <button onClick={() => this.props.minus()}>-</button>
          <button onClick={() => this.props.add()}>+</button>
          <button onClick={() => this.props.asyncAdd()}>asyncAdd</button>
        </div>
      </div>
    )
  }
}


export default ReduxTest