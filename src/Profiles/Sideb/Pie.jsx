import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Pie = () => {
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Fetch data from data.json file
        fetch('http://localhost:5000/data')
            .then(response => response.json())
            .then(data => {
                // Calculate count and total intensity for each topic
                const topicStats = {};
                data.forEach(item => {
                    const { topic, intensity } = item;
                    if (topic && !isNaN(intensity)) {
                        if (!topicStats[topic]) {
                            topicStats[topic] = { count: 0, totalIntensity: 0 };
                        }
                        topicStats[topic].count++;
                        topicStats[topic].totalIntensity += intensity;
                    }
                });

                // Calculate average intensity for each topic
                Object.keys(topicStats).forEach(topic => {
                    const { count, totalIntensity } = topicStats[topic];
                    topicStats[topic].averageIntensity = totalIntensity / count;
                });

                // Prepare data for the pie chart
                const seriesData = Object.keys(topicStats).map(topic => ({
                    name: topic,
                    y: topicStats[topic].count
                }));

                // Set chart options
                setChartOptions({
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: 'Intensity Count by Topic'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    credits: {
                        enabled: false // Remove the credits label
                      },
                    series: [{
                        name: 'Topics',
                        colorByPoint: true,
                        data: seriesData
                    }]
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div>
            {chartOptions ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Pie;
