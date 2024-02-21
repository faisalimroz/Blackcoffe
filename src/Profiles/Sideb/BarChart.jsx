import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
        // Filter out entries with null start_year or null sector
        data = data.filter(entry => entry.start_year !== null && entry.sector !== null);

        // Calculate average intensity for each sector based on year
        const averagedData = data.reduce((acc, entry) => {
          const { start_year, intensity, sector } = entry;
          if (!acc[sector]) {
            acc[sector] = { totalIntensity: 0, count: 0 };
          }
          acc[sector].totalIntensity += intensity;
          acc[sector].count++;
          return acc;
        }, {});

        // Compute average intensity for each sector
        const averagedSeries = [{
          name: 'Average Intensity',
          data: Object.entries(averagedData).map(([sector, { totalIntensity, count }]) => ({
            name: sector,
            y: totalIntensity / count
          }))
        }];

        // Set chart options
        setChartOptions({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Average Intensity by Sector'
          },
          xAxis: {
            categories: Object.keys(averagedData).filter(sector => sector !== 'null'),
            title: {
              text: 'Sector'
            }
          },
          yAxis: {
            title: {
              text: 'Average Intensity'
            }
          },
          series: averagedSeries
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default BarChart;
