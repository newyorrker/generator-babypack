import './local.scss';

import React from 'react';
import { render } from 'react-dom';

import { hot } from 'react-hot-loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state1: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    console.log('yoo ma');
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.clickHandler}>Simple Button</button>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
);

export default hot(module)(App)