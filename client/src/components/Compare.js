import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Flex } from './FlexComponent';
import ExchangeChart from './ExchangeChart';

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
  console.log('mergedData in async fetch ?', merged);
  const response = await fetch(
    `https://api.exchangeratesapi.io/history?start_at=${merged.start}&end_at=${merged.end}&symbols=${merged.to},${merged.from}&base=USD`
  );
  const data = await response.json();
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
  const { register, handleSubmit, errors } = useForm();
  const [finalAmount, setFinalAmount] = useState(0);
  var [from, setFrom] = useState('');
  var [to, setTo] = useState('');
  const [chartData, setChartData] = useState({});

  const onSubmit = (formdata) => {
    let merged = { ...formdata, ...props };
      fetchDataJSON(merged).then((data) => {
        console.log(' comparison data:', data);
        setChartData(data);
        localStorage.setItem('compare_rates_stored', JSON.stringify(data));
      });
  };
  var [optionItems, setOptionItems] = useState('');
  const rates_stored = localStorage.getItem('rates');
  return (
    <Grid item xs={12} sm={12}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex container justifyContent="space-between" width="300px">
            <FormSection>
              <FormLabel>From:</FormLabel>
              <input type="date" name="start" ref={register}></input>
            </FormSection>
            <FormSection>
              <FormLabel>To:</FormLabel>
              <input type="date" name="end" ref={register}></input>
            </FormSection>
            <FormSection>
              <FormLabel>Compare:</FormLabel>
              <input type="submit" value=">"></input>
            </FormSection>
          </Flex>
        </form>
        <ExchangeChart currentChartData={chartData}></ExchangeChart>
      </Paper>
    </Grid>
  );
}

export default Compare;
