type InitialStateType = typeof initialState

type FriendType = {
    id: number
    link: string
    name: string
}
let initialState = {
    friendsItems: [
        {id: 1, link: 'https://p0.pxfuel.com/preview/103/842/392/human-portrait-nature-focus.jpg', name:'Valya'},
        {id: 2, link: 'https://c.pxhere.com/photos/46/3a/people_man_famous_portrait_todd_carey-1386940.jpg!d' , name: 'Viktor'},
        {id: 3, link: 'https://www.kinogallery.com/pimages/461/kinogallery.com-461-156494.jpg' , name: 'Oleg'}
    ] as Array<FriendType>
}

let sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state
}

export default sidebarReducer