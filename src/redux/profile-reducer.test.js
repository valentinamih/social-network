import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";
let state = {posts: [
        {id: 1, message: 'hello, here i am =)', likesCount: 1},
        {id: 2, message: "this is my first post!", likesCount: 3}
    ],};
test('length of posts should be incremented', () => {
    let action = addPostActionCreator('new post text test')
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3)
})

test('new post text should be correct', () => {
    let action = addPostActionCreator('new post text')
    let newState = profileReducer(state, action);
    expect(newState.posts[2].message).toBe('new post text')
})


test('length of posts should be decremented', () => {
    let action = deletePostActionCreator(1);
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
})