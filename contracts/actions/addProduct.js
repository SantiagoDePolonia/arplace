export const addProduct = async (
    state,
    { caller: _caller, input: { address } }
) => {
    state.announcements.push(address)

    return { state };
};

