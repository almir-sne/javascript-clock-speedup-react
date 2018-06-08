import React from 'react';
import './App.css';
import CustomDate from './CustomDate'


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 12,
            minutes: 11,
            speed: 2.4,
            text: "bla",
            nowDivInterval: null,
            now: null,
            countDownDate: null
        }
    }

    render() {
        return (
            <div className="clock">
                <label htmlFor="hours"> Hours: </label>
                <input type="number" name="hours" defaultValue={this.state.hours}/>

                <label htmlFor="minutes"> Minutes: </label>
                <input type="number" name="minutes" defaultValue={this.state.minutes}/>

                <label htmlFor="speed"> Speed: </label>
                <input type="number" name="speed" defaultValue={this.state.speed}/>

                <button onClick={() => this.updateClock()}> Reset</button>
                <div className="now">
                    {this.state.text}
                </div>
            </div>
        )
    }


    updateClock() {
        if (this.state.nowDivInterval) {
            clearInterval(this.state.nowDivInterval);
            this.setState({nowDivInterval: null});
        }
        let now = new CustomDate();
        let countDownDate = new CustomDate(now);
        countDownDate.setMinutes(countDownDate.getMinutes() + Number(this.state.hours) * 60 + Number(this.state.minutes));

        this.setState({
            now: now,
            countDownDate: countDownDate
        });

        // speedupFactor = Number(speed);
        let interval = setInterval(() => this.updateTime(), 200);
        this.setState({
            nowDivInterval: interval
        });
    }

    updateTime() {
        let distance = this.state.countDownDate - this.state.now;

        console.log(distance);
        if (distance < 0) {
            distance = 0;
            document.getElementById("myAudio").play();
            clearInterval(this.state.nowDivInterval);
        }

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.setState({text: days + "d " + hours + "h " + minutes + "m " + seconds + "s "});
    }
}

export default Clock;
