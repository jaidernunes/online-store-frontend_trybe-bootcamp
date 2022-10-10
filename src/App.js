import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CartProducts from './pages/CartProducts';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ CartProducts } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
