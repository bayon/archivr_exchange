import React, { Component } from 'react';

 

 

function App() {


  const callApi = async () => {
    //const resp = await fetch('/api');
    const resp = await fetch('https://api.exchangeratesapi.io/latest')
    window._resp = resp;
  
    let text = await resp.text();
  
    let data = null;
    try {
      data = JSON.parse(text);  
      console.log("data:",data)
    } catch (e) {
      console.err(`Invalid json\n${e}`);
    }
  
    if (resp.status !== 200) {
      throw Error(data ? data.message : 'No data');
    }
  
    return data;
  };


  callApi()

  return (
    <div className="App">
      
        
     
    </div>
  );
}

export default App;
