import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c78c1d17-24b6-4425-a1cf-94058ae66c7b'
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D,
    resultCode: RC
    messages: Array<string>
}