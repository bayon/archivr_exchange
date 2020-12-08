import React from 'react';
import { Line } from 'react-chartjs-2'; 

function ExchangeChart(props) {
   
  const roughObj = props.currentChartData;
   
  var _labels = [];
  var _dataset1 = [];
  var _dataset2 = [];
  var _curr1 = '';
  var _curr2 = '';

  for (var i in roughObj) {
     let obj = roughObj[i];
     _labels.push(obj.key);

    var valuesObj = obj.value;
    var valArray = Object.values(valuesObj);
    _dataset1.push(valArray[0]);
    _dataset2.push(valArray[1]);

    var keyArray = Object.keys(valuesObj);
    _curr1 = keyArray[0];
    _curr2 = keyArray[1];
  }

  const chartData = {
    labels: _labels,
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
  };

  return (
    <div className="chart">
      <Line
        data={chartData}
        width={100}
        height={15}
        options={{
          title: {
            display: true,
            text: 'Exchange Rate Comparison',
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  );
}

export default ExchangeChart;
