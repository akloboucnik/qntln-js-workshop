import 'bulma/css/bulma.css';
import React, { Component } from 'react';

import { Fetcher } from './components/Fetcher';

class App extends Component {
  render() {
    return (
      <section className='section is-flex'>
          <div className='container'>
            <Fetcher />
          </div>
      </section>
    );
  }
}

export default App;
