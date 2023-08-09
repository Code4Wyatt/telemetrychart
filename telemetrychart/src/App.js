import { useEffect, useState } from 'react';
import parseCsv from './hooks/parseCsv';

import csv from './assets/telemetry_data.csv';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Flow Telemetry Chart',
    },
  },
};

function App() {
  const [csvData, setCsvData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    parseCsv(csv, (data) => {
      console.log('parseCsv data', data);
      data && setCsvData(data);
    });
  }, []);

  const processData = (csvData) => {
    let labels = csvData.map(row => row['Date/Time']);

    let datasets = [];
    for (let column in csvData[0]) {
      if (column !== 'Date/Time') {
        datasets.push({
          label: column,
          data: csvData.map(row => row[column]),
          borderColor: getRandomColor(),
          borderWidth: 2,
          fill: false
        });
      }
    }

    setChartData({
      labels: labels,
      datasets: datasets
    });
  };
  
  useEffect(() => {
    if (csvData.length > 0) {
      processData(csvData);
    }
  }, [csvData]);

  let labels = chartData.labels;

  const data = {
    labels,
    datasets: []
  }

  chartData && chartData?.datasets?.forEach((dataset) => {
    data.datasets.push(dataset);
  });

  console.log('formatted data', data);

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  console.log('app', csvData);
  console.log('chart data', chartData);

  return (
    <div className="App">
      <div>
        {data ? (<Line options={options} data={data} />) : (<p>Loading chart...</p>) }
      </div>
    </div>
  );
}

export default App;
