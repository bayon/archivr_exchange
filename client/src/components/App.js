import React, { Component ,useState} from 'react';
import ButtonAppBar from './ButtonAppBar'
import Exchange from './Exchange'; 
//import Compare from './Compare'; 


function App() {
 
  return (
    <div className="App">
      
       <ButtonAppBar title="exchange"/>
         
        <Exchange />
        
      
            
  </div>
  );
}

export default App;
