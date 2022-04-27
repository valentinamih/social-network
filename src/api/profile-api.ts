import {ProfileType} from "../types/types";
import {APIResponseType, instance, ResultCodeEnum} from "./api";

type UpdatePhotoResponseDataType = {
    photos: {
        small: string
        large: string
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)

    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', {status: status})
            .then(response => response.data)
    },
    updatePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<APIResponseType<UpdatePhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>('profile', profile)
            .then(response => response.data)
    }
}