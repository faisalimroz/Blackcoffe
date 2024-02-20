import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MyBarChart = () => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        // Process data and create chart options
        const processedData = processData(data);
        setChartOptions(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const countryData = {};

    // Aggregate data by country and calculate averages
    data.forEach(entry => {
      const country = entry.country;
      if (!countryData[country]) {
        countryData[country] = {
          intensity: [],
          relevance: [],
          likelihood: []
        };
      }
      // Push intensity, relevance, and likelihood values to arrays
      countryData[country].intensity.push(entry.intensity);
      countryData[country].relevance.push(entry.relevance);
      countryData[country].likelihood.push(entry.likelihood);
    });

    // Calculate averages for each country
    const categories = [];
    const intensityAverages = [];
    const relevanceAverages = [];
    const likelihoodAverages = [];

    for (const country in countryData) {
      if (countryData.hasOwnProperty(country)) {
        categories.push(country);
        intensityAverages.push(
          countryData[country].intensity.reduce((a, b) => a + b, 0) / countryData[country].intensity.length
        );
        relevanceAverages.push(
          countryData[country].relevance.reduce((a, b) => a + b, 0) / countryData[country].relevance.length
        );
        likelihoodAverages.push(
          countryData[country].likelihood.reduce((a, b) => a + b, 0) / countryData[country].likelihood.length
        );
      }
    }

    const options = {
      chart: {
        type: 'bar',
        height: 800, // Adjust the height as needed
        width: 800   // Adjust the width as needed
      },
      title: {
        text: 'Country Data'
      },
      xAxis: {
        categories: categories,
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        max: 25, // Set maximum value
        title: {
          text: 'Average Value',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ''
      },
      plotOptions: {
        bar: {
          pointWidth: 5, // Reduce the width of bars
          dataLabels: {
            enabled: false
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Intensity',
        data: intensityAverages,
        color: '#FF5733' // Set intensity color
      }, {
        name: 'Relevance',
        data: relevanceAverages,
        color: '#33FF57' // Set relevance color
      }, {
        name: 'Likelihood',
        data: likelihoodAverages,
        color: '#5733FF' // Set likelihood color
      }]
    };

    return options;
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      {chartOptions ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : <p>Loading...</p>}
    </div>
  );
};

export default MyBarChart;
