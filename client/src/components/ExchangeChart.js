import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

function ExchangeChart(props) {
  //const [chartData, setChartData] = useState({});

   console.log("Exchange Chart props:",props)

  const chartData = {
      // labels will be dates.
    labels: [
      '2020-11-01',
      '2020-11-05',
      '2020-11-27',
      '2020-12-01',
      '2020-12-23',
      '2020-12-26',
    ],
    datasets: [
      {
        label: 'Currency One',
        data: [1.33, 1.30, 1.1, 1.0, 1.1, 1.2],
      },
      {
        label: 'Currency Two',
        data: [.85, .95, .85, .83, .82, .95],
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
