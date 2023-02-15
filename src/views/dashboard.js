import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import { getDatabase, ref, onChildAdded } from 'firebase/database';
import {DashboardCard} from "../components/dashboardCard";
import {SensorDataForm} from "../components/sensorDataForm";

/**
 * This function represents dashboard view that shows the most recent sensor values.
 * @returns {JSX.Element} Dashboard view
 */
function Dashboard() {
    const [recentPacket, setRecentPacket] = React.useState([]);
    const [packetReceived, setPacketReceived] = React.useState(false);

    React.useEffect(() => {
        const packetsRef = ref(getDatabase(), "packets");
        onChildAdded(packetsRef, (data) => {
            setRecentPacket(data.val());
            setPacketReceived(true);
        });

    }, []);

    React.useEffect(() => {
        if(packetReceived) {
            setPacketReceived(false);
        }
    }, [packetReceived]);

    return (
        <Container >
            <Row className="justify-content-center mt-5">
                <Col md={3}>
                    <SensorDataForm />
                </Col>
                <Col md={9}>
                    <Row className="justify-content-center mt-3">
                        <Col md={3}>{DashboardCard("Packet nr", recentPacket.packet_nr, "#")}</Col>
                        <Col md={3}>{DashboardCard("Node nr", recentPacket.node_nr, "#")}</Col>
                        <Col md={3}>{DashboardCard("Time", recentPacket.time, "")}</Col>
                        <Col md={3}>{DashboardCard("dT", recentPacket.time, "")}</Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Col md={3}>{DashboardCard("Temperature", recentPacket.temperature, "°F")}</Col>
                        <Col md={3}>{DashboardCard("Humidity", recentPacket.humidity, " %")}</Col>
                        <Col md={3}>{DashboardCard("Light", recentPacket.light, " lx")}</Col>
                        <Col md={3}>{DashboardCard("RSSI", recentPacket.rssi, " mW")}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
