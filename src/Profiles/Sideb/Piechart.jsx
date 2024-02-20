import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MyPieChart = () => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        console.log(response)
        const data = await response.json();
        // Process data and create chart options
        console.log(data)
        const processedData = processData(data);
        setChartOptions(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const { country, region } = data;
    
    // Initialize chart data array
    const chartData = [];

    // Add country data to chart data if available
    if (country) {
      chartData.push({
        name: 'Country',
        y: 1
      });
    }

    // Add region data to chart data if available
    if (region) {
      chartData.push({
        name: 'Region',
        y: 1
      });
    }

    // Create chart options
    const options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Distribution'
      },
      series: [{
        name: 'Data',
        data: chartData
      }]
    };

    return options;
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      {chartOptions ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : <p>Loadingghjg...</p>}
    </div>
  );
};

export default MyPieChart;
