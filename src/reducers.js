export default function timer(state = {}, action) {
    switch (action.type) {
        case 'DECREMENT':
            let newTime = state.time - 1;
            let days = Math.floor(newTime / (60 * 60 * 24));
            let hours = Math.floor((newTime % (60 * 60 * 24)) / (60 * 60));
            let minutes = Math.floor((newTime % (60 * 60)) / (60));
            let seconds = newTime % 60;

            console.log(newTime)
            console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ")
            return {
                ...state,
                time: newTime,
                text: days + "d " + hours + "h " + minutes + "m " + seconds + "s "
            };
        case 'UPDATE_TIMER' :
            let time = Number(action.hours) * 3600 + Number(action.minutes) * 60;
            console.log(action)
            return {
                speed: action.speed,
                time: time
            };
        default:
            return state
    }
}
