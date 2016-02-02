const admin = (state = {}, action) => {
    switch (action.type) {
        case 'logout':
            return {};
        default:
            return state;
    }
};

