import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Flex } from './FlexComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
 
const FormLabel = styled.section`
  margin-bottom: 10px;
  text-align: left;
`;
 
const FormSection = styled.section`
  margin: 15px;
`;

async function fetchDataJSON(merged) {
  console.log("mergedData in async fetch ?",merged)
  const response = await fetch(
    `https://api.exchangeratesapi.io/history?start_at=${merged.start}&end_at=${merged.end}&symbols=${merged.to},${merged.from}&base=USD`
  );
   const data = await response.json();
  console.log("data from compare:",data);

  const theRates = data.rates;
  var arrayOfRates = [];
  for (const [key, value] of Object.entries(theRates)) {
    let obj = { key: key, value: value };
    arrayOfRates.push(obj);
  }
  arrayOfRates.sort(compareExchangeRates);
   console.log('arrayOfRates:', arrayOfRates);
  return arrayOfRates;
}

function compareExchangeRates(a, b) {
  // Use toUpperCase() to ignore character casing
  const key_A = a.key.toUpperCase();
  const key_B = b.key.toUpperCase();

  let comparison = 0;
  if (key_A > key_B) {
    comparison = 1;
  } else if (key_A < key_B) {
    comparison = -1;
  }
  return comparison;
}



function Compare(props) {
  const classes = useStyles();

  const { register, handleSubmit,  errors } = useForm();
  const [finalAmount, setFinalAmount] = useState(0);
  var [from,setFrom] = useState("")
  var [to,setTo] = useState("")
  console.log("...- - compare props:",props)

  //setFrom(props.from);
  //setTo(props.to);


  const onSubmit = (formdata) => {
    console.log("onSubmit - - - - - - -")
    console.log(formdata);
    console.log(props)
    let merged = {...formdata,...props}
    if (!compareRatesLoaded) {
      fetchDataJSON(merged).then((data) => {
        console.log(' comparison data:', data);
       // console.log("compare props from state:",from,to)
       // console.log('merged:',merged)
        
       
        localStorage.setItem('compare_rates_stored', JSON.stringify(data));
      });
      setCompareRatesLoaded(true);
    }
  };

  var [compareRatesLoaded, setCompareRatesLoaded] = useState(false);
  var [optionItems, setOptionItems] = useState('');
  const rates_stored = localStorage.getItem('rates');
  
  return (
    <Grid item xs={12} sm={12}>
      <Paper className={classes.paper}>
        {/* NOTES FOR: react-hook-form  */}
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input name="currencyFrom"  placeholder="currency type dropdown" ref={register} /> */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex container justifyContent="space-between" width="300px">
            
            <FormSection>
              <FormLabel>From:</FormLabel>
              <input type="date" name="start" ref={register}></input>
            </FormSection>

            <FormSection>
              <FormLabel>To:</FormLabel>
              <input type="date" name="end" ref={register} ></input>
            </FormSection>
            <FormSection>
              <FormLabel>Compare:</FormLabel>
              <input type="submit" value=">"></input>
            </FormSection>
            <FormSection>
              {errors.exampleRequired && <span>This field is required</span>}
            </FormSection>
            <FormSection>
              <FormLabel>Result:</FormLabel>
              <div>{finalAmount} </div>
            </FormSection>
          </Flex>
        </form>
      </Paper>
    </Grid>
  );
}

export default Compare;
