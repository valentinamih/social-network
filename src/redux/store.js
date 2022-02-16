import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

const ADD_POST = 'ADD-POST';
const  UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const ADD_MESSAGE = 'ADD_MESSAGE'

let store = {
    _callSubscriber () {
        console.log('state changed')
    },
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hello, here i am =)', likesCount: 1},
                {id: 2, message: "this is my first post!", likesCount: 3}
            ],
            newPostText: ''
        },

        dialogsPage: {
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
            newMessageText: ''
        },

        sidebar: {
            friendsItems: [
                {id: 1, link: 'https://p0.pxfuel.com/preview/103/842/392/human-portrait-nature-focus.jpg', name:'Valya'},
                {id: 2, link: 'https://c.pxhere.com/photos/46/3a/people_man_famous_portrait_todd_carey-1386940.jpg!d' , name: 'Viktor'},
                {id: 3, link: 'https://www.kinogallery.com/pimages/461/kinogallery.com-461-156494.jpg' , name: 'Oleg'}
            ]
        }
    },
    getState () {
        return this._state
    },
    subscribe (observer) {
        this._callSubscriber = observer
    },
    dispatch (action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)


        this._callSubscriber(this._state)
    }
}

export default store