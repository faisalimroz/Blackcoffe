import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import PestleCountChart from './Pestle';

const EconomicGrowthByCountryChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const countries = {};
      data.forEach(entry => {
        const country = entry.country;
        if (!countries[country]) {
          countries[country] = {
            totalIntensity: entry.intensity,
            count: 1
          };
        } else {
          countries[country].totalIntensity += entry.intensity;
          countries[country].count++;
        }
      });

      const countryData = Object.entries(countries).map(([country, { totalIntensity, count }]) => ({
        name: country,
        economy: totalIntensity / count // Calculating average intensity as a proxy for economy
      }));

      const options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Economic Growth by Country'
        },
        xAxis: {
          type: 'category',
          title: {
            text: 'Country'
          }
        },
        yAxis: {
          title: {
            text: 'Economic Growth'
          }
        },
        credits: {
            enabled: false // Remove the credits label
          },
        series: [{
          name: 'Economy',
          data: countryData.map(({ name, economy }) => ({
            name,
            y: economy
          }))
        }]
      };

      setChartOptions(options);
    }
  }, [data]);

  return (
 <>
     <div>
      {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </div>
    <PestleCountChart></PestleCountChart>
 </>
  );
};

export default EconomicGrowthByCountryChart;
