import React from 'react';
import './Clock.css';
import {connect} from 'react-redux'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 12,
            minutes: 11,
            speed: 2.4,
        };
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <div className="clock">
                <InputWithLabel label="Hours:" name="hours" initialValue={this.state.hours}
                                onChangeHandler={this.onChange}/>
                <InputWithLabel label="Minutes:" name="minutes" initialValue={this.state.minutes}
                                onChangeHandler={this.onChange}/>
                <InputWithLabel label="Speed:" name="speed" initialValue={this.state.speed}
                                onChangeHandler={this.onChange}/>

                <button onClick={() => this.props.updateTimer(this.state)}> Reset </button>
                <div className="now">
                    {this.props.text}
                </div>
            </div>
        )
    }
}

const InputWithLabel = ({label, name, initialValue, onChangeHandler}) =>
    <span>
        <label htmlFor={name}> {label} </label>
        <input type="number" name={name} defaultValue={initialValue} onChange={onChangeHandler}/>
    </span>

const mapStateToProps = state => {
    return {
        text : state.text
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateTimer : (state) => dispatch({type: 'SET_TIMER', ...state})
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clock)