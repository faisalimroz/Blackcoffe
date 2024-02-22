import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TopicFilterChart = () => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data');
        const data = await response.json();
        generateChart(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const generateChart = (data) => {
    if (data) {
      const topics = {};
      data.forEach(entry => {
        const topic = entry.topic;
        if (topics[topic]) {
          topics[topic]++;
        } else {
          topics[topic] = 1;
        }
      });

      const seriesData = Object.keys(topics).map(topic => {
        return {
          name: topic,
          y: topics[topic]
        };
      });

      const options = {
        chart: {
          type: 'bar',
          height: 600 // Increase the height of the chart
        },
        title: {
          text: 'Topic Count'
        },
        xAxis: {
          categories: Object.keys(topics),
          title: {
            text: 'Topics'
          }
        },
        yAxis: {
          title: {
            text: 'Count'
          }
        },
        plotOptions: {
          bar: {
            pointWidth: 6, // Increase the width of the bars
            pointPadding: 0.1, // Adjust spacing between bars
            groupPadding: 0.1, // Adjust spacing between groups of bars
            color: '#FF5733' // Change the color of the bars
          }
        },
        credits: {
          enabled: false // Remove the credits label
        },
        series: [{
          name: 'Count',
          data: seriesData
        }]
      };

      setChartOptions(options);
    }
  };

  return (
    <div>
      {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </div>
  );
};

export default TopicFilterChart;
