import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import { getDatabase, ref, onChildAdded, query, limitToLast } from 'firebase/database';
import {DashboardCard} from "../components/dashboardCard";
import convertEpochToHumanReadableTime from "../utils/timeConverter";
import {LineChart, initializeChart} from "../components/lineChart";
import 'chart.js/auto';
import convertToCelsius from "../utils/fahrToCelsiusConverter";

let humidityValues = [];
let lightValues = [];
let tempValues = [];
let labels = [];
let RSSI = 0;
let prevPackage = 0;
let dT = 0;
let listenerAdded = false;

/**
 * This function represents dashboard view that shows the most recent sensor values.
 * @returns {JSX.Element} Dashboard view
 */
function Dashboard() {
    const [packetReceived, setPacketReceived] = React.useState(false);
    const [humidityChartData, setHumidityChartData] = React.useState(
        initializeChart([], [], 'rgb(75, 192, 192)',  'Humidity in %'))
    const [lightChartData, setLightChartData] = React.useState(
        initializeChart([], [], 'rgb(75, 192, 192)',  'Light in lx'));
    const [tempChartData, setTempChartData] = React.useState(
        initializeChart([], [], 'rgb(75, 192, 192)',   'Temp in F'));
    const [showDeveloperView, setShowDeveloperView] = React.useState(false);

    /**
     * Handles "Show developer view" button
     */
    const handleClick = () => {
        if(showDeveloperView === false) {
            setShowDeveloperView(true);
        } else {
            setShowDeveloperView(false);
        }
    }

    React.useEffect(() => {
        const packetsRef = query(ref(getDatabase(), "packages_of_greater_importance"), limitToLast(40));
        if(!listenerAdded){
            onChildAdded(packetsRef, (child) => {
                child.forEach((childData) => {
                    dT = parseInt(childData.val().Time) - prevPackage;
                    prevPackage = parseInt(childData.val().Time);
                    labels.push(convertEpochToHumanReadableTime(childData.val().Time));
                    humidityValues.push(childData.val().Humidity);
                    lightValues.push(childData.val().Light);
                    tempValues.push(convertToCelsius(childData.val().Temp));
                    RSSI = childData.val().RSSI;

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
        if(packetReceived){
            setHumidityChartData(initializeChart(labels, humidityValues,  'rgb(141, 157, 182)',  'Humidity in %'));
            setLightChartData(initializeChart(labels, lightValues,  'rgb(141, 157, 182)',  'Light in lx'));
            setTempChartData(initializeChart(labels, tempValues,  'rgb(141, 157, 182)',  'Temp in °C'));
            setPacketReceived(false);
        }
    }, [packetReceived]);
    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <h1>Dashboard</h1>
                <Col md={12}>
                    <Row className="justify-content-left mt-2">
                        <Col md={4}>
                            <Button variant="outline-secondary" onClick={()=> handleClick()}>Show developer view</Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Col md={2}>{DashboardCard("Temperature", tempValues[39], " °C")}</Col>
                        <Col md={2}>{DashboardCard("Humidity", humidityValues[39], " %")}</Col>
                        <Col md={2}>{DashboardCard("Light", lightValues[39], " lx")}</Col>
                        <Col md={6}>{DashboardCard("Time", labels[39], "")}</Col>
                    </Row>
                    {showDeveloperView && <Row className="justify-content-left mt-3">
                        <Col md={2}>{DashboardCard("dT", dT/1000, " s")}</Col>
                        <Col md={2}>{DashboardCard("RSSI", RSSI, " dB")}</Col>
                    </Row>}
                    {!showDeveloperView && <Row>
                        <Col md={6}><LineChart chartData={humidityChartData}/></Col>
                        <Col md={6}><LineChart chartData={lightChartData}/></Col>
                        <Col md={6} className="mb-5"><LineChart chartData={tempChartData}/></Col>
                    </Row>}
                </Col>
            </Row>
        </Container>
    );
}
export default Dashboard;