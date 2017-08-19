export interface BaseDBModel {
    id: string; // 主键
    index: string; // 索引
}
export interface NoteItem extends BaseDBModel {
    createTime: number;
    text: string;
}

