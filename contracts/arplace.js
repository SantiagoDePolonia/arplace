const addAnnouncement = async (
    state,
    { caller: _caller, input: { address } }
) => {
    state.announcements.push(address)

    return { state };
};

const removeAnnouncement = async (
    state,
    { caller: _caller, input: { address } }
) => {
    const filteredState = state.announcements.filter(an => (an !== address));

    return {
        state: filteredState
    };
};

export function handle(state, action){
    switch (action.input.function) {
        case 'addAnnouncement':
            return addAnnouncement(state, action);
        case 'removeAnnouncement':
            return removeAnnouncement(state, action);
        default:
            return state.announcements; 
    }
}
