// import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// const MyBarChart = () => {
//   const [chartOptions, setChartOptions] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/data.json');
//         const data = await response.json();
//         // Process data and create chart options
//         const processedData = processData(data);
//         setChartOptions(processedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const processData = (data) => {
//     const topicData = {};

//     // Aggregate data by topic and calculate averages
//     data.forEach(entry => {
//       const topic = entry.topic;
//       if (!topicData[topic]) {
//         topicData[topic] = {
//           intensity: [],
//           relevance: [],
//           likelihood: []
//         };
//       }
//       // Push intensity, relevance, and likelihood values to arrays
//       topicData[topic].intensity.push(entry.intensity);
//       topicData[topic].relevance.push(entry.relevance);
//       topicData[topic].likelihood.push(entry.likelihood);
//     });

//     // Calculate averages for each topic
//     const categories = [];
//     const intensityAverages = [];
//     const relevanceAverages = [];
//     const likelihoodAverages = [];

//     for (const topic in topicData) {
//       if (topicData.hasOwnProperty(topic)) {
//         categories.push(topic);
//         intensityAverages.push(
//           topicData[topic].intensity.reduce((a, b) => a + b, 0) / topicData[topic].intensity.length
//         );
//         relevanceAverages.push(
//           topicData[topic].relevance.reduce((a, b) => a + b, 0) / topicData[topic].relevance.length
//         );
//         likelihoodAverages.push(
//           topicData[topic].likelihood.reduce((a, b) => a + b, 0) / topicData[topic].likelihood.length
//         );
//       }
//     }

//     const options = {
//       chart: {
//         type: 'bar',
//         height: 1000, // Adjust the height as needed
//         width: 800   // Adjust the width as needed
//       },
//       title: {
//         text: 'Topic Data'
//       },
//       xAxis: {
//         categories: categories,
//         title: {
//           text: null
//         }
//       },
//       yAxis: {
//         min: 0,
//         max: 30, // Set maximum value
//         title: {
//           text: 'Average Value',
//           align: 'high'
//         },
//         labels: {
//           overflow: 'justify'
//         }
//       },
//       tooltip: {
//         valueSuffix: ''
//       },
//       plotOptions: {
//         bar: {
//           pointWidth: 10, // Increase the size of bars
//           dataLabels: {
//             enabled: true
//           }
//         }
//       },
//       legend: {
//         layout: 'vertical',
//         align: 'right',
//         verticalAlign: 'top',
//         x: -40,
//         y: 80,
//         floating: true,
//         borderWidth: 1,
//         backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
//         shadow: true
//       },
//       credits: {
//         enabled: false
//       },
//       series: [{
//         name: 'Intensity',
//         data: intensityAverages,
//         color: '#FF5733' // Set intensity color
//       }, {
//         name: 'Relevance',
//         data: relevanceAverages,
//         color: '#33FF57' // Set relevance color
//       }, {
//         name: 'Likelihood',
//         data: likelihoodAverages,
//         color: '#5733FF' // Set likelihood color
//       }]
//     };

//     return options;
//   };

//   return (
//     <div>
//       <h2>Bar Chart</h2>
//       {chartOptions ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default MyBarChart;
