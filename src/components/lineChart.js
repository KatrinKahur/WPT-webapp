import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-moment';

/**
 * This function initializes a LineChart
 * @param labels the labels of the x-axis
 * @param data the plotted data
 * @param color the border color
 * @param label the chart title
 * @returns {{datasets: [{borderColor, tension: number, data, label, fill: boolean}], labels}}
 */
const initializeChart = (labels, data, color, label) => {
    return {
        labels: labels,
        datasets: [{
            label: label,
            data: data,
            fill: false,
            borderColor: color,
            tension: 0.1
        }]
    }
}

/**
 * This function represents the LineChart component
 * @param chartData the plotted data points
 * @returns {JSX.Element} LineChart component
 */
function LineChart({ chartData }) {
    return (
        <div className="chart-container">
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: true
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                padding: 10,
                                display: false
                            }
                        },
                        y: {
                            ticks: {
                                padding: 10
                            }
                        }
                    }
                }}
            />
        </div>
    );
}
export { LineChart, initializeChart };