const addProduct = async (
    state,
    { caller: _caller, input: { address } }
) => {
    state.announcements.push(address)

    return { state };
};

const removeProduct = async (
    state,
    { caller: _caller, input: { address } }
) => {
    const filteredState = state.announcements.filter(an => (an !== address));

    return {
        state: filteredState
    };
};

export function handle(state, action){
    switch (input.function) {
        case 'addProduct':
            return addProduct(state, action);
        case 'removeProduct':
            return removeProduct(state, action);
        default:
            return state.announcements; 
    }
}
