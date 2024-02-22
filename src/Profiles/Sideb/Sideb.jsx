import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { useEffect, useState } from 'react';

import MyBarChart from './MyBarChart';
import MyPie from './MyPie';
import WordMap from './WordMap';
import wordcloud from 'highcharts/modules/wordcloud'; 
import Pie from './Pie';
import BarChart from './BarChart';


wordcloud(Highcharts);


highchartsAccessibility(Highcharts);

const Sideb = () => {
  const [chartOptions1, setChartOptions1] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await fetch('http://localhost:5000/data');
        const jsonData = await response.json();
        const formattedData = jsonData.map(item => ({
          name: item.country,
          y: item.intensity
        }));
        setChartOptions1({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Intensity by Country'
          },
          xAxis: {
            type: 'category',
            title: {
              text: 'Country'
            }
          },
          yAxis: {
            title: {
              text: 'Intensity'
            }
          },
          series: [{
            name: 'Intensity',
            data: formattedData
          }]
        });

      



      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <>
    
      
      <MyBarChart></MyBarChart>
      <MyPie></MyPie>
      <WordMap></WordMap>
      <Pie></Pie>
      <BarChart></BarChart>
     
    </>
  );
};

export default Sideb;