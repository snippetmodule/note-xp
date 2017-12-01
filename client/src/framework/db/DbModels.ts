export interface IBaseDBModel {
    id: string; // 主键
}
export interface INoteItem extends IBaseDBModel {
    createTime: number;
    text: string;
    index: string;
    _searchTerms: string; // 索引
}

export interface IUrlCache extends IBaseDBModel {
    // url 做为主键
    createTime: number;
    response: string;
}

export interface IKeyValueCache extends IBaseDBModel {
    //
    createTime: number;
    value: any;
}