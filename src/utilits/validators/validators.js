export const required = (value) => {
    if (value) return undefined;
    return 'required field'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value === undefined) {
        return
    }
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined

}