import {Card} from "react-bootstrap";
import React from "react";

const style = {
    cardHeader: {
        backgroundColor: "#8d9db6",
        color: "#ffffff"
    },
    cardBody: {
        backgroundColor: "#f1e3dd"
    }
}

/**
 * This function represents a single dashboard element meant to present a sensor value
 * @param label The type of value presented by the element, e.g temperature
 * @param data The sensor value
 * @param unit The sensor value unit, e.g Fahrenheit for temperature
 * @returns {JSX.Element} The DashboardCard component
 * @constructor
 */
export const DashboardCard = (label, data, unit) => {
    return (
        <Card>
            <Card.Header style={style.cardHeader}>{label}</Card.Header>
            <Card.Body style={style.cardBody}>{
                (label.includes("Packet nr") || label.includes("Node nr"))?
                    (<h1>{unit}{data}</h1>): (<h1>{data}{unit}</h1>)
                }
            </Card.Body>
        </Card>
    )
}