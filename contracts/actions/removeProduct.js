
export const removeProduct = async (
    state,
    { caller: _caller, input: { address } }
) => {
    const filteredState = state.announcements.filter(an => (an !== address));

    return {
        state: filteredState
    };
};

