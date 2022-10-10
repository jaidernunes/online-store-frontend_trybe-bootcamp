import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CartProducts from './pages/CartProducts.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ CartProducts } />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
