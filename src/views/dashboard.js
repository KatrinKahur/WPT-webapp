import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import { getDatabase, ref, onChildAdded, query, limitToLast } from 'firebase/database';
import {DashboardCard} from "../components/dashboardCard";
import convertEpochToHumanReadableTime from "../utils/timeConverter";
import LineChart from "../components/lineChart";
import 'chart.js/auto';
import convertToCelsius from "../utils/fahrToCelsiusConverter";

let humidityValues = [];
let lightValues = [];
let tempValues = [];
let labels = [];
let listenerAdded = false;
/**
 * This function represents dashboard view that shows the most recent sensor values.
 * @returns {JSX.Element} Dashboard view
 */
function Dashboard() {
    const [packetReceived, setPacketReceived] = React.useState(false);
    const [chartDataStatus, setChartDataStatus] = React.useState(false);
    const [humidityChartData, setHumidityChartData] = React.useState({
        labels: [],
        datasets: [{
            label: 'Humidity in %',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    });

    const [lightChartData, setLightChartData] = React.useState({
        labels: [],
        datasets: [{
            label: 'Light in lx',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    });

    const [tempChartData, setTempChartData] = React.useState({
        labels: [],
        datasets: [{
            label: 'Temp in F',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    });

    React.useEffect(() => {
        const packetsRef = query(ref(getDatabase(), "packages_of_greater_importance"), limitToLast(40));
        if(!listenerAdded){
            onChildAdded(packetsRef, (child) => {
                child.forEach((childData) => {
                    labels.push(convertEpochToHumanReadableTime(childData.val().Time));
                    humidityValues.push(childData.val().Humidity);
                    lightValues.push(childData.val().Light);
                    tempValues.push(convertToCelsius(childData.val().Temp));

                    while (humidityValues.length > 40)
                        humidityValues.shift();
                    while (lightValues.length > 40)
                        lightValues.shift();
                    while (tempValues.length > 40)
                        tempValues.shift();
                    while (labels.length > 40)
                        labels.shift();
                    setPacketReceived(true);
                })
            })
        }
        listenerAdded = true;
    },[]);

    React.useEffect(() => {
        setHumidityChartData({
            labels: labels,
            datasets: [{
                label: 'Humidity in %',
                data: humidityValues,
                fill: false,
                borderColor: 'rgb(141, 157, 182)',
                tension: 0.1
            }]
        });

        setLightChartData({
            labels: labels,
            datasets: [{
                label: 'Light in lx',
                data: lightValues,
                fill: false,
                borderColor: 'rgb(141, 157, 182)',
                tension: 0.1
            }]
        });

        setTempChartData({
            labels: labels,
            datasets: [{
                label: 'Temp in °C',
                data: tempValues,
                fill: false,
                borderColor: 'rgb(141, 157, 182)',
                tension: 0.1
            }]
        });

        if (packetReceived) {
            setPacketReceived(false);
        }
        setChartDataStatus(true);
    }, [packetReceived]);

    React.useEffect(() => {
        if (chartDataStatus) {
            setChartDataStatus(false);
        }
    }, [chartDataStatus]);
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <h1>Dashboard</h1>
                <Col md={12}>
                    <Row className="justify-content-center mt-3">
                        <Col md={2}>{DashboardCard("Temperature", tempValues[39], " °C")}</Col>
                        <Col md={2}>{DashboardCard("Humidity", humidityValues[39], " %")}</Col>
                        <Col md={2}>{DashboardCard("Light", lightValues[39], " lx")}</Col>
                        <Col md={6}>{DashboardCard("Time", labels[39], "")}</Col>
                    </Row>
                    <Row>
                        <Col md={6}><LineChart chartData={humidityChartData}/></Col>
                        <Col md={6}><LineChart chartData={lightChartData}/></Col>
                        <Col md={6} className="mb-5"><LineChart chartData={tempChartData}/></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default Dashboard;