import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

function ExchangeChart(props) {
  //const [chartData, setChartData] = useState({});

   console.log("Exchange Chart props:",props)
   console.log("type:")
   console.log(typeof props)
   console.log("type:")
   console.log(typeof props.currentChartData)
   const roughObj = props.currentChartData;
   console.log(Array.isArray(roughObj))
   console.log(roughObj);

   var _labels = [];
   var _dataset1 = [];
   var _dataset2 = [];
   var _curr1 = ""
   var _curr2 = ""

    for(var i in roughObj){
       console.log("loop i:",i)
       let obj = roughObj[i]
       console.log(obj) 
       _labels.push(obj.key) 
        
       var valuesObj = obj.value;
       var valArray = Object.values(valuesObj)
       _dataset1.push(valArray[0]);
       _dataset2.push(valArray[1])

       var keyArray = Object.keys(valuesObj) 
       _curr1 = keyArray[0];
       _curr2 = keyArray[1];


    }


   

  const chartData = {
      // labels will be dates.
    labels: _labels ,
   
    datasets: [
      {
        label: _curr1,
        data: _dataset1, 
      },
      {
        label: _curr2,
        data: _dataset2, 
      },
    ],
  }


  return (
    <div className="chart">
      <Line
        data={chartData}
        width={100}
        height={15}
        options={{
          title:{
              display: true,
              text:'Exchange Rate Comparison'
          },
          legend: {
              display:true,
              position:'right'
          }

        }}
      />
    </div>
  );
}

export default ExchangeChart;
