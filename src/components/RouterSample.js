import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { Provider, connect } from 'react-redux';
import store from '../store'
import { login } from '../store/user.redux'

function App() {
  return (
    <div>
      {/* 导航 */}
      <ul>
        <li>
          <Link to="/"> home</Link>
        </li>
        <li>
          <Link to="/about"> about</Link>
        </li>
        <li>
          <Link to="/foo"> foo</Link>
        </li>
      </ul>
      {/* 路由配置 */}
      <Switch>
        <Route exact path="/" component={home} />
        <PrivateRoute path="/about" component={about} />
        <Route path="/detail/:course" component={detail} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>

    </div>
  )
}

function NoMatch(props) {
  return <div>404页面</div>
}

function detail({ match, history, location }) {
  return (
    <div>
      {/* 接收参数 */}
      {match.params.course}
      {/* 命令式导航 */}
      <button onClick={history.goBack}>回退</button>
      <button onClick={() => history.push({ pathname: '/', state: { foo: 'bar' } })}>回到首页</button>
    </div>
  )
}

function home({ match, history, location }) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/detail/python"> Python</Link>
        </li>
        <li>
          <Link to="/detail/java"> java</Link>
        </li>
        <li>
          <Link to="/detail/web"> Web</Link>
        </li>
      </ul>
    </div>
  )
}

function about() {
  return <div>
    {/* 用户中心 */}
    <h2>用户中心</h2>
    <div>
      <Link to="/about/me" >用户信息</Link>|
      <Link to="/about/order">订单信息</Link>
    </div>
    <Switch>
      <Route path="/about/me" component={() => (<div>用户信息</div>)}></Route>
      <Route path="/about/order" component={() => (<div>订单信息</div>)}></Route>
      <Redirect to="/about/me"></Redirect>
    </Switch>
  </div>
}

// 1.守卫路由：定义一个可以验证登录的高阶组件
@connect(
  state => ({ isLogin: state.user.isLogin })
)
class PrivateRoute extends Component {
  render() {
    const { isLogin, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isLogin ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location.pathname }
                }} />

            )
        }
      />
    )
  }
}


@connect(
  state => ({ isLogin: state.user.isLogin }),
  { login }
)
class Login extends Component {

  render() {
    console.log('2343')
    const from = this.props.location.state.from || '/';

    if (this.props.isLogin) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <h2>请先登录</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default class RouterSample extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <App></App>
        </Provider>

      </BrowserRouter>
    )
  }
}
