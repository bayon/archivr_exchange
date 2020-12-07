import React, { Component,useState } from 'react';
import { useForm } from "react-hook-form";

async function fetchDataJSON() {
    const response = await fetch('https://api.exchangeratesapi.io/latest');
    const data = await response.json();
    const theRates = data.rates
    var arrayOfRates = []
    for (const [key, value] of Object.entries(theRates)) {
        let obj =  {"key":key, "value": value}
        arrayOfRates.push(obj)
    }
    console.log("arrayOfRates:",arrayOfRates) 
    return arrayOfRates
}
  
function Exchange(){
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = formdata => console.log(formdata);
    console.log(watch("currency1")); 
  
    var [ratesLoaded,setRatesLoaded] = useState(false)
    var [ratesArray, setRatesArray] = useState([])
    var [optionItems, setOptionItems] = useState("")
    const rates_stored = localStorage.getItem("rates")
    if(!ratesLoaded){
    fetchDataJSON().then(data => {
        console.log("data:",data)

        var options =  data.map((obj) =>
        <option key={obj.value}>{obj.key}</option>
            );
            setOptionItems(options)
            localStorage.setItem("rates_stored",JSON.stringify(data))
            
        });
        setRatesLoaded(true);
    }
    return (
        <div>
            
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            {/* <input name="currency1_type"  placeholder="currency type dropdown" ref={register} /> */}
            <select name="currency1_type" ref={register}>
                {optionItems}
             </select>
            <input name="amount1"  placeholder="amount" ref={register} />
           
            <input type="submit" value="convert to " ></input>
            {/* include validation with required or other standard HTML validation rules */}
            {/* <input name="currency2_type"  placeholder="currency type dropdown" ref={register} /> */}
            <select name="currency2_type" ref={register}>
                {optionItems}
             </select>
            <input name="amount2" placeholder="amount"  ref={register({ required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
           
           
            </form>
        </div>
    )
}


export default Exchange

