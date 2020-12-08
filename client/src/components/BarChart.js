import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

function BarChart(props) {
  //const [chartData, setChartData] = useState({});

   

  const chartData = {
    labels: [
      'Boston',
      'WOrchester',
      'Springfield',
      'Lowell',
      'Cambridge',
      'New Bedford',
    ],
    datasets: [
      {
        label: 'Population',
        data: [217594, 181092, 153933, 106354, 105765, 95072],
        backgroundColor: [
          'rgba(255,99,132,0.6)',
          'rgba(255,99,20,0.6)',
          'rgba(255,99,40,0.6)',
          'rgba(255,99,60,0.6)',
          'rgba(255,99,80,0.6)',
          'rgba(255,99,100,0.6)',
        ],
      },
    ],
  }


  return (
    <div className="chart">
      <Line
        data={chartData}
        width={100}
        height={200}
        options={{
          title:{
              display: true,
              text:'Largest cities in Mass.'
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

export default BarChart;
