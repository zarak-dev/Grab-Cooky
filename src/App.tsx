import React from 'react';
import { Home } from './containers/Home';
import { Navbar } from './components/Layout/Navbar'; // If you want your navbar to show up too!

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;