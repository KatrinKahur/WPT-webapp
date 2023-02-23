import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import { getDatabase, ref, onChildAdded } from 'firebase/database';
import {DashboardCard} from "../components/dashboardCard";
import convertEpochToHumanReadableTime from "../utils";

/**
 * This function represents dashboard view that shows the most recent sensor values.
 * @returns {JSX.Element} Dashboard view
 */
function Dashboard() {
    const [recentPacket, setRecentPacket] = React.useState([]);
    const [packetReceived, setPacketReceived] = React.useState(false);

    React.useEffect(() => {
        const packetsRef = ref(getDatabase(), "packages_of_greater_importance");
        onChildAdded(packetsRef, (child) => {
            child.forEach((childData) => {
                setRecentPacket(childData.val());
            })
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
                <h1>Dashboard</h1>
                <Col md={12}>
                    <Row className="justify-content-center mt-3">
                        <Col md={2}>{DashboardCard("Temperature", recentPacket.Temp, " °F")}</Col>
                        <Col md={2}>{DashboardCard("Humidity", recentPacket.Humidity, " %")}</Col>
                        <Col md={2}>{DashboardCard("Light", recentPacket.Light, " lx")}</Col>
                        <Col md={6}>{DashboardCard("Time", convertEpochToHumanReadableTime(recentPacket.Time), "")}</Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;