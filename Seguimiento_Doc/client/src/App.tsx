import React from 'react';
import DarkModeToggle from './components/DarkModeToggle';  
import Background from './components/Background';
import Search from './components/Search'

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center p-4">
      <Background/>
      <div className="p-4 border rounded-lg shadow-lg">
        <DarkModeToggle />
        <Search />
      </div>
    </div>
  );
}

export default App;
