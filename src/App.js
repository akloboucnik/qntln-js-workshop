// @flow
import 'bulma/css/bulma.css';
import './App.css';
import React, { Component } from 'react';

import { Fetcher } from './components/Fetcher';

const DEFAULT_URL = 'http://api.gdax.com/products/BTC-EUR/trades'

class App extends Component<*> {
  render() {
    return (
      <section className='section is-flex'>
          <div className='container'>
            <Fetcher defaultUrl={DEFAULT_URL} />
          </div>
      </section>
    );
  }
}

export default App;
