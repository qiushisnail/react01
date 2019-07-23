import React, { Component } from 'react';

function Cart(props) {
  return (
    <table border='1'>
      <tbody>
        {props.data.map(d => (
          <tr key={d.text}>
            <td>{d.text}</td>
            <td>￥{d.price}</td>
            <td>
              <button>-</button>
              {d.count}
              <button onClick={() => props.addCount(d)}>+</button>
            </td>
            <td>￥{d.count * d.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


export default class CartSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [
        { id: 1, text: 'web全栈架构师1', price: 666 },
        { id: 2, text: 'web全栈架构师2', price: 366 }
      ],
      text: '', // 商品名c
      cart: [],
    }

    // 回调写法1
    //this.addGood = this.addGood.bind(this)
  }
  // 写法2
  addGood = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods, { text: prevState.text, price: 566, id: 3 }]
    }))
  }

  // 写法3
  textChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  // 写法1
  // addGood(){

  // }

  addToCart(good) {
    const newCart = [...this.state.cart]; // react 里面更新比较是根据引用来的
    const idx = newCart.findIndex(c => c.text === good.text)
    const item = newCart[idx];

    if (item) {
      newCart.splice(idx, 1, { ...item, count: item.count + 1 })
    } else {
      newCart.push({ ...good, count: 1 })
    }
    this.setState({ cart: newCart });// 全新的cart 一定会更新
  }

  addCount = (item) => {
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c => c.text === item.text)
    newCart.splice(idx, 1, { ...item, count: item.count + 1 })
    this.setState({ cart: newCart });
  }

  render() {
    const title = this.props.title ? <h1>{this.props.title}</h1> : null
    // 循环: 将js对象数组转换为jsx数组
    const goods = this.state.goods.map(good => (
      <li key={good.id} > {good.text}
        <button onClick={() => this.addToCart(good)}>加购</button></li>
    ))
    return (
      <div>
        {/* 条件语句 */}
        {/*this.props.title && <h1>{this.props.title}</h1>*/}
        {title}
        {/* 添加商品 受控组件：一个值和一个change事件*/}
        <div>
          <input type="text" value={this.state.text} onChange={(e) => this.textChange(e)} />
          <button onClick={this.addGood}>添加商品</button>
        </div>
        {/* 列表渲染 */}
        <ul>{goods}</ul>
        {/* 购物车 */}
        <Cart data={this.state.cart} addCount={this.addCount} />
      </div>
    )
  }
}
