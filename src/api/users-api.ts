import {instance} from "./api";
import {UserType} from "../types/types";

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow (id: number) {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow (id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
}