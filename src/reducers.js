export default function timer(state = {}, action) {
    switch (action.type) {
        case 'DECREMENT':
            let newTime = Math.max(state.time - state.speed);
            let days = Math.floor(newTime / (60 * 60 * 24));
            let hours = Math.floor((newTime % (60 * 60 * 24)) / (60 * 60));
            let minutes = Math.floor((newTime % (60 * 60)) / 60);
            let seconds = Math.floor(newTime % 60);

            return {
                ...state,
                time: newTime,
                text: days + "d " + hours + "h " + minutes + "m " + seconds + "s "
            };
        case 'UPDATE_TIMER' :
            let time = Number(action.hours) * 3600 + Number(action.minutes) * 60;
            return {
                speed: Number(action.speed),
                time: time
            };
        default:
            return state
    }
}
