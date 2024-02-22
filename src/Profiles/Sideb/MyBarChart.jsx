import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import BarChart from './BarChart';
import TopicFilterChart from './Bar';

const MyBarChart = () => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data');
        const data = await response.json();
     
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

    data.forEach(entry => {
      const country = entry.country;
      if (!countryData[country]) {
        countryData[country] = {
          intensity: [],
          relevance: [],
          likelihood: []
        };
      }
      
      countryData[country].intensity.push(entry.intensity);
      countryData[country].relevance.push(entry.relevance);
      countryData[country].likelihood.push(entry.likelihood);
    });

   
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
        height: 800 // Increase the height of the chart
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
        max: 22, 
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
          pointWidth: 6, 
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
        color: '#FF5733' 
      }, {
        name: 'Relevance',
        data: relevanceAverages,
        color: '#33FF57' 
      }, {
        name: 'Likelihood',
        data: likelihoodAverages,
        color: '#5733FF' 
      }],
      
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500 
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
              x: 0,
              y: 0
            }
          }
        }]
      }
    };

    return options;
  };

  return (
    <>
      <div>
        {chartOptions ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : <p>Loading...</p>}
      </div>
      <BarChart />
      <TopicFilterChart />
    </>
  );
};

export default MyBarChart;
