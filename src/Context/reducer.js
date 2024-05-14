export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT: 'LOGOUT',
}

export const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                user: state?.user,
                token: state?.token,
                loading: true,
                error: null
            }
        case actionTypes.LOGIN_SUCCESS:
            const { user, token } = action.payload
            return {
                user: user,
                token: token,
                loading: false,
                error: null
            }
        case actionTypes.LOGIN_ERROR:
            return {
                user: null,
                token: null,
                loading: false,
                error: action?.payload?.error
            }
        case actionTypes.LOGOUT:
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            return {
                user: null,
                token: null,
                loading: false,
                error: null
            }
        default:
            throw Error(`action type not supported: ${action}`)
    }
}


// export const chatType = {
//     PROFILE: 'profile',
//     CONTACT: 'contact',
//     GROUP: 'group',
//     CHANNEL: 'channel',
//     CALL: 'call',
//     EXPLORE: 'explore'
// }
// export const initialChatTypeState = {
//     id: null,
//     roomType: null
// }

// export function chatTypeReducer(state, action) {
//     switch (action.type) {
//         case chatType.PROFILE:
//             return {
//                 id: null,
//                 roomType: null
//             }
//         case chatType.CONTACT:
//             return {
//                 id: action.payload.id,
//                 roomType: chatType.CONTACT,
//             }
//         case chatType.GROUP:
//             return {
//                 id: action.payload.id,
//                 roomType: chatType.GROUP,
//             }
//         case chatType.CHANNEL:
//             return {
//                 id: action.payload.id,
//                 roomType: chatType.CHANNEL,
//             }
//         case chatType.CALL:
//             return {
//                 id: action.payload.id,
//                 roomType: chatType.CALL,
//             }
//         case chatType.EXPLORE:
//             return {
//                 id: action.payload.id,
//                 roomType: chatType.EXPLORE,
//             }
//         default:
//             throw Error(`action type not supported: ${action}`)
//     }
// }
