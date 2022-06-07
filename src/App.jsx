import React from 'react';
import Main from './components/Main';
import Header from './components/Header';
import Accordion from './components/Accordion';


function App() {
   return (
      <div className="container">
         <Header />
         <Accordion />
         <Main />
      </div>
   );
}

export default App;
