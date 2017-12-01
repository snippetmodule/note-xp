export type DocsModelEntriyType = {
    name: string,
    path: string,
    pathname: string,
    type: string,
    doc?: IDocInfo,
};
export type DocsModelTypeType = {
    name: string,
    pathname: string,
    slug: string,
    count: number,
    doc?: IDocInfo,
    childs?: DocsModelEntriyType[],
};

export interface IDocInfo {
    name: string;
    pathname: string;
    slug: string;
    type: string;
    version: string;
    release: string;
    links?: { home?: string; code?: string };
    mtime: number;
    db_size: number;
    storeValue?: {
        entries: DocsModelEntriyType[],
        types: DocsModelTypeType[],
    };
}

export interface ISearchItem {
    name: string;
    doc: IDocInfo;
    pathname: string;
    slug: string;
}