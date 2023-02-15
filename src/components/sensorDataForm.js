import {Button, Form} from "react-bootstrap";
import React from "react";
import addPacketToDatabase from "../firebase/dbHandler";

/**
 * A form where the user can fill in packet data to test the dashboard
 * @returns {JSX.Element}The SensorDataForm component
 */
export const SensorDataForm = () => {

    const [packetNr, setPacketNr] = React.useState("");
    const [nodeNr, setNodeNr] = React.useState("");
    const [time, setTime] = React.useState("");
    const [dt, setDt] = React.useState("");
    const [temp, setTemp] = React.useState("");
    const [humidity, setHumidity] = React.useState("");
    const [light, setLight] = React.useState("");
    const [rssi, setRssi] = React.useState("");


    const handleSubmit = () => {
        addPacketToDatabase(packetNr, nodeNr, time, dt, temp, humidity, light, rssi);
    }

    return(
        <Form >
            <Form.Group>
                <Form.Label>Enter sensor values to test the dashboard. </Form.Label>
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter packet nr..."
                              onChange={(event)=>{setPacketNr(event.target.value)}}
                />
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter node nr..."
                              onChange={(event)=>{setNodeNr(event.target.value)}}
                />
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter time..."
                              onChange={(event)=>{setTime(event.target.value)}}
                />
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter dT..."
                              onChange={(event)=>{setDt(event.target.value)}}
                />
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter temperature..."
                              onChange={(event)=>{setTemp(event.target.value)}}
                />
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter humidity..."
                              onChange={(event)=>{setHumidity(event.target.value)}}
                />
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter light..."
                              onChange={(event)=>{setLight(event.target.value)}}
                />
                <Form.Control className="mb-2"
                              type="text"
                              placeholder="Enter RSSI..."
                              onChange={(event)=>{setRssi(event.target.value)}}
                />
            </Form.Group>
            <Button variant="outline-dark"
                    type="submit"
                    onClick={() => handleSubmit()}>
                Submit
            </Button>
        </Form>
    )
}

