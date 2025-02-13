/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/
const data = require("./cansat")
let count = 0
function Spacecraft() {
    this.state = {
        "prop.accel_x": data[count].AccelX,
        "prop.accel_y": data[count].AccelY,
<<<<<<< HEAD
        "prop.accel_z": data[count].AccelZ,  
        "prop.temp": data[count].temp,
        "prop.lux": data[count].lux,
=======
        "prop.accel_z": data[count].AccelZ,
        "prop.temp": data[count].temp,
        "press": data[count].press,
        "lux": data[count].lux,
>>>>>>> 0c4aecac6832f6c8f4f94007da08121cc6cd538d
        "prop.thrusters": "OFF",
        "comms.recd": 0,
        "comms.sent": 0,
        "pwr.temp": 245,
        "pwr.c": 8.15,
        "pwr.v": 30
    };
    this.history = {};
    this.listeners = [];
    Object.keys(this.state).forEach(function (k) {
        this.history[k] = [];
    }, this);

    const setTimer = (wait = 1000) =>     setTimeout( () => {
        console.log(count)
        this.updateState();
        this.generateTelemetry();
        setTimer(8000 * (data[count].time_s - data[count - 1].time_s))
    }, wait);

    setTimer()

    console.log("Example spacecraft launched!");
    console.log("Press Enter to toggle thruster state.");

    process.stdin.on('data', function () {
        this.state['prop.thrusters'] =
            (this.state['prop.thrusters'] === "OFF") ? "ON" : "OFF";
        this.state['comms.recd'] += 32;
        console.log("Thrusters " + this.state["prop.thrusters"]);
        this.generateTelemetry();
    }.bind(this));
};

Spacecraft.prototype.updateState = function () {
    count ++
    this.state["prop.accel_x"] = data[count].AccelX
    this.state["prop.accel_y"] = data[count].AccelY
    this.state["prop.accel_z"] = data[count].AccelZ
<<<<<<< HEAD
    this.state["prop.temp"] = data[count].temp
    this.state["prop.lux"] = data[count].lux
=======
    this.state["press"] = data[count].press
    this.state["prop.temp"] = data[count].temp
    this.state["lux"] = data[count].lux
>>>>>>> 0c4aecac6832f6c8f4f94007da08121cc6cd538d
    this.state["pwr.temp"] = this.state["pwr.temp"] * 0.985
        + Math.random() * 0.25 + Math.sin(Date.now());
    if (this.state["prop.thrusters"] === "ON") {
        this.state["pwr.c"] = 8.15;
    } else {
        this.state["pwr.c"] = this.state["pwr.c"] * 0.985;
    }
    this.state["pwr.v"] = 30 + Math.pow(Math.random(), 3);
};

/**
 * Takes a measurement of spacecraft state, stores in history, and notifies 
 * listeners.
 */
Spacecraft.prototype.generateTelemetry = function () {
    var timestamp = Date.now(), sent = 0;
    Object.keys(this.state).forEach(function (id) {
        var state = { timestamp: timestamp, value: this.state[id], id: id};
        this.notify(state);
        this.history[id].push(state);
        this.state["comms.sent"] += JSON.stringify(state).length;
    }, this);
};

Spacecraft.prototype.notify = function (point) {
    this.listeners.forEach(function (l) {
        l(point);
    });
};

Spacecraft.prototype.listen = function (listener) {
    this.listeners.push(listener);
    return function () {
        this.listeners = this.listeners.filter(function (l) {
            return l !== listener;
        });
    }.bind(this);
};

module.exports = function () {
    return new Spacecraft()
};