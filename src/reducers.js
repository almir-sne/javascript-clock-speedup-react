export default function timer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_TIMER':
            return {
                ...state,
                text: action.text
            };
        default:
            return state
    }
}
