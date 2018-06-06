import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import Posts from './posts/Posts';
import PostDetail from './posts/PostDetail';
import PostCreate from './posts/PostCreate'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/posts/create' component={PostCreate}/>
            <Route exact path='/posts' component={Posts}/>
            <Route exact path='/posts/:slug' component={PostDetail}/>
            <Route component={Posts}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
