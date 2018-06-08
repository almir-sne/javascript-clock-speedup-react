import React from 'react';
import './App.css';


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 12,
            minutes: 11,
            speed: 2.4,
            text: "bla",
        }

        this.props.store.subscribe(() => {
            this.setState({
                text: this.props.store.getState().text
        });
        });
    }

    updateTimer = () => {
        this.props.store.dispatch({type: 'UPDATE_TIMER', ...this.state});
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }



    render() {
        return (
            <div className="clock">
                <InputWithLabel label="Hours:" name="hours" initialValue={this.state.hours}
                                onChangeHandler={this.onChange}/>
                <InputWithLabel label="Minutes:" name="minutes" initialValue={this.state.minutes}
                                onChangeHandler={this.onChange}/>
                <InputWithLabel label="Speed:" name="speed" initialValue={this.state.speed}
                                onChangeHandler={this.onChange}/>

                <button onClick={this.updateTimer}> Reset</button>
                <div className="now">
                    {this.state.text}
                </div>
            </div>
        )
    }
}

const InputWithLabel = ({label, name, initialValue, onChangeHandler}) =>
    <span>
        <label htmlFor={name}> Hours: </label>
        <input type="number" name={name} defaultValue={initialValue} onChange={onChangeHandler}/>
    </span>

export default Clock;
