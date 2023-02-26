import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
    return (
        <div className="chart-container">
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true
                            //text: "Sensor values"
                        },
                        legend: {
                            display: true
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: false
                            }
                        }
                    }
                }}
            />
        </div>
    );
}
export default LineChart;