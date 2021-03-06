import IBaseJson from '../../framework/models/IBaseJson';

export type CheckCode = {
    id: string,
    phoneNumber: string,
    createTime: string,
    updateTime: string,
    verifyingId: string,
};

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
};
export type Article = {
    id: string,
    createTime: string,
    title: string,
    ownerId: string,
    articleType: number,
    resource: string[],
    categories: string[],
    paymentStatus: string,
    bucketName: string,
    published: boolean,
    likeNum: number,
    readNum: number,
    hasCollection: boolean,
    income: number,
    profitIncome: number,
    avatorUrl: string,
    nikeName: string,
    userNo: string,
    cost: number,
    isLike: boolean,
    collectionTime: string,
    paymentTime: string,
    groupId: string,
    modular: string,
    ligicalDel: number,
    updateTime: string,
    simpleUrl: string,
    videoUrl: string,
    certified: string,
};
export type ArticleResource = {
    id: string,
    logicalDel: number,
    createTime: Date,
    updateTime: Date,
    version: number,
    articleId: string,
    indexNo: number,
    cost: number,
    asPreview: boolean,
    size: string[],
    paymentStatus: number,
    name: string,
    path: string,
    resizePath: string,

};
export type ArticleDetail = {
    id: string,
    createTime: Date, // : "2017-09-09T04:59:03.705+0000",
    updateTime: Date; // "2017-09-09T04:59:03.705+0000",
    version: number,
    bucketName: string,
    title: string,
    content: string,
    ownerId: string,
    articleType: number,
    resources: string[],
    categories: string[],
    cost: number,
    modular: string,
    readNum: number,
    likeNum: number,
    hasCollection: boolean,
    income: number,
    avatorUrl: string,
    nikeName: string,
    userNo: string,
    isLike: boolean,
    profitIncome: number,
    collectionNum: number,
    url: string,
    certified: string,
    resourceDetailsList: ArticleResource[],
};
export type ArticleListJson = IBaseJson<Article[]>;
export type CheckCodeJson = IBaseJson<CheckCode[]>;
export type RegisterInfoJson = IBaseJson<RegisterInfo[]>;
export type ArticleDetailJson = IBaseJson<ArticleDetail[]>;