import {getDatabase, push, ref} from "firebase/database";

/**
 * This function adds a new packet element to the database
 * @param packet_nr Packet counter
 * @param node_nr Node nr
 * @param time Relative time counter
 * @param dt Time differential between received packets
 * @param temp Temperature in Fahrenheit
 * @param hum Relative humidity
 * @param light Ambient luminance (Lux)
 * @param rssi Received Signal Strength Indicator
 */
function addPacketToDatabase(packet_nr, node_nr, time, dt, temp, hum, light, rssi){
    const packetsRef = ref(getDatabase(), "packets");
    push(packetsRef, {
        packet_nr: packet_nr,
        node_nr: node_nr,
        time: time,
        dt: dt,
        temperature: temp,
        humidity: hum,
        light: light,
        rssi: rssi
    });
}

export default addPacketToDatabase;