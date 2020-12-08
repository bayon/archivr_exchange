import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Flex } from './FlexComponent';

import Compare from './Compare';

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

async function fetchDataJSON() {
  const response = await fetch(
    'https://api.exchangeratesapi.io/latest?base=USD'
  );
  const data = await response.json();
  const theRates = data.rates;
  var arrayOfRates = [];
  for (const [key, value] of Object.entries(theRates)) {
    let obj = { key: key, value: value };
    arrayOfRates.push(obj);
  }
  arrayOfRates.sort(compareExchangeRates);
  //console.log('arrayOfRates:', arrayOfRates);
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

function Exchange() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();
  const [finalAmount, setFinalAmount] = useState(0);
  const [fromSymbol, setFromSymbol] = useState('');
  const [toSymbol, setToSymbol] = useState('');

  const onSubmit = (formdata) => {
    //console.log(formdata);
    const amount = parseFloat(formdata.amount1);
    const currFrom = parseFloat(formdata.currencyFrom);
    const currTo = parseFloat(formdata.currencyTo);
    const exchangeRate = currTo / currFrom;
    const this_final = amount * exchangeRate;
    setFinalAmount(this_final);

    const sel1 = document.getElementById('currencyFrom');
    let fromSymbol = sel1.options[sel1.selectedIndex].text;
    setFromSymbol(fromSymbol);
    const sel2 = document.getElementById('currencyTo');
    let toSymbol = sel2.options[sel2.selectedIndex].text;
    setToSymbol(toSymbol);
  };

  var [ratesLoaded, setRatesLoaded] = useState(false);
  var [optionItems, setOptionItems] = useState('');
  const rates_stored = localStorage.getItem('rates');
  if (!ratesLoaded) {
    fetchDataJSON().then((data) => {
      console.log('data:', data);

      var options = data.map((obj) => (
        <option key={obj.value} value={obj.value}>
          {obj.key}
        </option>
      ));
      setOptionItems(options);
      localStorage.setItem('rates_stored', JSON.stringify(data));
    });
    setRatesLoaded(true);
  }
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
              <FormLabel>Amount:</FormLabel>
              <input name="amount1" placeholder="amount" ref={register} />
            </FormSection>
            <FormSection>
              <FormLabel>From:</FormLabel>
              <select name="currencyFrom" id="currencyFrom" ref={register}>
                {optionItems}
              </select>
            </FormSection>

            <FormSection>
              <FormLabel>To:</FormLabel>
              <select name="currencyTo" id="currencyTo" ref={register}>
                {optionItems}
              </select>
            </FormSection>
            <FormSection>
              <FormLabel>Convert:</FormLabel>
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
      <Compare from={fromSymbol} to={toSymbol} />
    </Grid>
  );
}

export default Exchange;
