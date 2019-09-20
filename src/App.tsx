import React from 'react';
import './App.css';
import WineList from './components/WineList';

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
      <WineList />
    </div>
  );
};

export default App;
