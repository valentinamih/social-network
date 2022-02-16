const ADD_MESSAGE = 'ADD_MESSAGE'

let initialStore = {
    dialogs: [
        {id: 1, name: 'Valya', link: 'https://c.pxhere.com/photos/c6/b6/portrait_people_man_hat_senior_face_scarf_outdoors-1163937.jpg!d'},
        {id: 2, name: 'Senya', link: 'https://i02.fotocdn.net/s121/c0dcd21333b70301/gallery_xl/2775263212.jpg'},
        {id: 3, name: 'Petya', link: 'https://4tololo.ru/sites/default/files/images/20161901175343_0.jpg'},
    ],
    messages: [
        {id: 1, message: 'Hello!'},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Hello World!"}
    ],
}

let dialogsReducer = (state = initialStore, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let body = action.newMessageText;
            return{
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        }
        default:
            return state
    }
}

export const addMessage = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer