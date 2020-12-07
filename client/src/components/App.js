import React, { Component ,useState} from 'react';
import ButtonAppBar from './ButtonAppBar'
import Exchange from './Exchange'; 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function App() {
  const [ratesLoaded,setRatesLoaded] = useState(false)

  const callApi = async () => {
    //const resp = await fetch('/api');
    const resp = await fetch('https://api.exchangeratesapi.io/latest')
    window._resp = resp;
  
    let text = await resp.text();
  
    let data = null;
    try {
      localStorage.setItem("rates",text) 
      data = JSON.parse(text);  
      console.log("data:",data)
      setRatesLoaded(true)
    } catch (e) {
      console.err(`Invalid json\n${e}`);
    }
  
    if (resp.status !== 200) {
      throw Error(data ? data.message : 'No data');
    }
  
    return data;
  };

  if(!ratesLoaded){
    const rates_stored = localStorage.getItem("rates")
    if(!rates_stored){
      callApi()
    }
   
  }
 
  const classes = useStyles();

  return (
    <div className="App">
       <div className={classes.root}>
       <ButtonAppBar title="exchange"/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Exchange />
            </Paper>
        </Grid> 
      </Grid>
    </div>
  </div>
  );
}

export default App;
