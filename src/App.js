import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <main>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
