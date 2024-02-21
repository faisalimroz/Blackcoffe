import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MyPieChart = () => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const chartData = processData(data);
        setChartOptions(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const regionCountryCounts = {};
    data.forEach(entry => {
      const region = entry.region;
      const country = entry.country;
      if (region && country) {
        if (!regionCountryCounts[region]) {
          regionCountryCounts[region] = new Set();
        }
        regionCountryCounts[region].add(country);
      }
    });

    const regionData = Object.keys(regionCountryCounts).map(region => ({
      name: region,
      y: regionCountryCounts[region].size
    }));

    return {
      chart: {
        type: 'pie',
        width: 500, // Adjust the width as needed
        height: 600 // Adjust the height as needed
      },
      title: {
        text: 'Country Count by Region'
      },
      tooltip: {
        pointFormat: '{point.countries} Countries:</span> {point.countries}<b>{point.y}</b>'
      },
      series: [{
        name: 'Region',
        data: regionData
      }]
    };
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      {chartOptions ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : <p>Loading...</p>}
    </div>
  );
};

export default MyPieChart;
