import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordcloud from 'highcharts/modules/wordcloud';

wordcloud(Highcharts);

const WordCloudChart = () => {
    const [chartOptions, setChartOptions] = useState(null);
    const chartContainer = useRef(null);

    useEffect(() => {
        fetchData();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        if (chartOptions) {
            const chart = chartContainer.current.chart;
            chart.reflow(); // Trigger chart reflow to adjust its size
        }
    };

    const fetchData = () => {
        fetch('http://localhost:5000/data')
            .then(response => response.json())
            .then(data => {
                const topicAverages = {};
                const topicCounts = {};

                data.forEach(item => {
                    const { topic, likelihood } = item;
                    if (topic && !isNaN(likelihood)) {
                        if (!topicAverages[topic]) {
                            topicAverages[topic] = 0;
                            topicCounts[topic] = 0;
                        }
                        topicAverages[topic] += likelihood;
                        topicCounts[topic]++;
                    }
                });

                Object.keys(topicAverages).forEach(topic => {
                    topicAverages[topic] /= topicCounts[topic];
                });

                const wordCloudData = Object.keys(topicAverages).map(topic => ({
                    name: topic,
                    weight: topicAverages[topic]
                }));

                setChartOptions({
                    series: [{
                        type: 'wordcloud',
                        data: wordCloudData
                    }],
                    credits: {
                        enabled: false // Remove the credits label
                      },
                    title: {
                        text: 'Word Cloud based on Average Likelihood for Topics'
                    },
                    tooltip: {
                        formatter: function () {
                            return `<b>${this.point.name}</b>: Likelihood ${this.point.weight.toFixed(2)}`;
                        }
                    },
                    chart: {
                        width: null, // Set the chart width to null for automatic resizing
                        height: null // Set the chart height to null for automatic resizing
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        handleResize(); // Initial resize on mount
    }, []); 

    return (
        <div style={{ width: '100%', height: '100%' }} ref={chartContainer}>
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

export default WordCloudChart;
