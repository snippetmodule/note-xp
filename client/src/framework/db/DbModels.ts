export interface BaseDBModel {
    id: string; // 主键
}
export interface NoteItem extends BaseDBModel {
    createTime: number;
    text: string;
    index: string;
    _searchTerms: string; // 索引
}

export interface UrlCache extends BaseDBModel {
    // url 做为主键
    createTime: number;
    response: string;
}
