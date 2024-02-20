import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { useEffect, useState } from 'react';

// Initialize accessibility module
highchartsAccessibility(Highcharts);

const Sideb = () => {
    const [chartOptions1, setChartOptions1] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for chart 1
                const response = await fetch('/data.json');
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

                // Fetch data for chart 2
                const seriesData = jsonData.reduce((accumulator, item) => {
                  const existingSeries = accumulator.find(series => series.name === item.topic);
                  if (existingSeries) {
                    existingSeries.data.push(item.intensity);
                  } else {
                    accumulator.push({
                      name: item.topic,
                      data: [item.intensity]
                    });
                  }
                  return accumulator;
                }, []);
                const options = {
                  title: {
                    text: 'Intensity by Year and Topic',
                    align: 'left'
                  },
                  yAxis: {
                    title: {
                      text: 'Intensity'
                    }
                  },
                  xAxis: {
                    title: {
                      text: 'Year'
                    },
                    accessibility: {
                      rangeDescription: 'Range: 2010 to 2020'
                    },
                    categories: jsonData.map(item => item.start_year)
                  },
                  legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                  },
                  series: seriesData,
                  responsive: {
                    rules: [{
                      condition: {
                        maxWidth: 500
                      },
                      chartOptions: {
                        legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                        }
                      }
                    }]
                  }
                };

                setChartOptions2(options);

                  // Process data to get counts for countries and cities
                  const countryCounts = {};
                  const cityCounts = {};
                  jsonData.forEach(item => {
                      countryCounts[item.country] = (countryCounts[item.country] || 0) + 1;
                      cityCounts[item.city] = (cityCounts[item.city] || 0) + 1;
                  });
  
                  // Convert counts to pie chart data format
                  const countryData = Object.entries(countryCounts).map(([name, count]) => ({ name, y: count }));
                  const cityData = Object.entries(cityCounts).map(([name, count]) => ({ name, y: count }));
  
                  // Combine country and city data
                  const combinedData = [...countryData, ...cityData];
  
                  // Update state with combined data
                  setPieChartData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        };

        fetchData();
    }, []);

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions1}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions2}
            />
            
        </>
    );
};

export default Sideb;