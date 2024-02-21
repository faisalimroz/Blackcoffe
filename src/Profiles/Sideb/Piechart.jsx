// import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// const MyDonutChart = () => {
//   const [chartOptions, setChartOptions] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/data');
//         const data = await response.json();
//         const processedData = processData(data);
//         setChartOptions(processedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const processData = (data) => {
//     const countries = {};
//     const colors = Highcharts.getOptions().colors;

//     // Process the data
//     data.forEach(entry => {
//       const region = entry.region;
//       const country = entry.country;
//       if (region && country) {
//         if (!countries[country]) {
//           countries[country] = {};
//         }
//         if (!countries[country][region]) {
//           countries[country][region] = 0;
//         }
//         countries[country][region]++;
//       }
//     });

//     // Create the series data for outer and inner rings
//     const seriesData = [];
//     let i = 0;
//     for (const country in countries) {
//       if (countries.hasOwnProperty(country)) {
//         const regions = countries[country];
//         const innerData = [];
//         for (const region in regions) {
//           if (regions.hasOwnProperty(region)) {
//             innerData.push({
//               name: region,
//               y: regions[region],
//               color: Highcharts.color(colors[i]).brighten(-0.2).get()
//             });
//             i++;
//           }
//         }
//         seriesData.push({
//           name: country,
//           id: country,
//           data: innerData
//         });
//       }
//     }

//     // Create the chart options
//     const options = {
//       chart: {
//         type: 'pie',
//         height: 600, // Adjust the height as needed
//         width: 800   // Adjust the width as needed
//       },
//       title: {
//         text: 'Country and Region Distribution'
//       },
//       plotOptions: {
//         pie: {
//           innerSize: '50%', // Adjust the size of the inner ring
//           dataLabels: {
//             enabled: true,
//             format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//           }
//         }
//       },
//       series: [{
//         name: 'Countries',
//         data: seriesData,
//         center: ['50%', '50%'],
//         size: '50%' // Adjust the size of the outer ring
//       }]
//     };

//     return options;
//   };

//   return (
//     <div>
//       <h2>Donut Chart</h2>
//       {chartOptions ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default MyDonutChart;
