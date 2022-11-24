import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [{
            name: 'feko',
            id: 0,
            status: 'dwdw',
            followed: false,
            photos: {large: 'fe', small: 'fe'}
        },
            {
                name: 'feko',
                id: 1,
                status: 'dwdw',
                followed: false,
                photos: {large: 'fe', small: 'fe'}
            },
            {
                name: 'feko',
                id: 2,
                status: 'dwdw',
                followed: true,
                photos: {large: 'fe', small: 'fe'}
            },
            {
                name: 'feko',
                id: 3,
                status: 'dwdw',
                followed: true,
                photos: {large: 'fe', small: 'fe'}
            }],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('followSuccess', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBe(false)
    expect(newState.users[1].followed).toBe(true)
})
test('unfollowSuccess', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBe(true)
    expect(newState.users[3].followed).toBe(false)
})

export {}