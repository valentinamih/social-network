import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '3920679f-6ec7-4dd9-b70c-c95888f66823'
    }
})

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
       return instance.get(`users?page=${currentPage}&count=${pageSize}`)
           .then(response => response.data)
    },
    follow (id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow (id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile (userId) {
        console.warn('Obsoleted method. Use object profileAPI')
       return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus (userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus (status) {
        return instance.put('profile/status' , {status: status})
            .then(response => response.data)
    }
}
export const authAPI = {
    me () { return instance.get(`auth/me`)
    },
    login (email, password, rememberMe = false) {

        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout () { return instance.delete('auth/login')
    }

}