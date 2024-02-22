import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PestleCountChart = () => {
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
      const pestleCounts = {};
      data.forEach(entry => {
        const pestle = entry.pestle;
        if (pestle) {
          pestleCounts[pestle] = (pestleCounts[pestle] || 0) + 1;
        }
      });

      const chartData = Object.entries(pestleCounts).map(([pestle, count]) => [pestle, count]);

      const options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Pestle Counts',
          align: 'center',
          verticalAlign: 'middle',
          y: 60
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
          }
        },
        credits: {
            enabled: false // Remove the credits label
          },
        series: [{
          type: 'pie',
          name: 'Pestle Count',
          innerSize: '50%',
          data: chartData
        }]
      };

      setChartOptions(options);
    }
  }, [data]);

  return (
    <div>
      {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </div>
  );
};

export default PestleCountChart;
