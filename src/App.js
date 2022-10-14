import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CartProducts from './pages/CartProducts';
import DetailsProduct from './pages/DetailsProduct';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ CartProducts } />
          <Route path="/details/:id" component={ DetailsProduct } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
