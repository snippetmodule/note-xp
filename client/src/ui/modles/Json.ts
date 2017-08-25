export type CheckCode = {
    id: string,
    phoneNumber: string,
    createTime: string,
    updateTime: string,
    verifyingId: string,
}
export type RegisterInfo = {
    id: string,
    userNo: string,
    hasCerted: boolean,
    life: number,
    nikeName: string,
    openid: string,
    sex: string,
    province: string,
    city: string,
    country: string,
    headimgurl: string,
    unionid: string,
    privilege: string[],
    language: string,
    description: string,
}