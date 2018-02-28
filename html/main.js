import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import './styles/main.less'

import One from "./components/One"

class Main extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div>
         <p>Hello World!</p>
         <br/>
         <button onClick={() => window.location.href="#/one" }>Go next</button>
      </div>
    )
  }
}  
ReactDOM.render (
  (
    <Router history={hashHistory}>
      <Route path={'/'} component={Main}></Route>
      <Route path={'one'} component={One} />      
  </Router>
  ),
  document.getElementById('main')
);