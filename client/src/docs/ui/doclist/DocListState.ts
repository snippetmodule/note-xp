
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo } from '../../core/model';
import { Docs } from '../../core/Docs';

import uuid = require('uuid');
import { fail } from 'assert';

export interface ICanExpendedItem {
    isExpended: boolean; // 是否已经展开
    child: ICanExpendedItem[];
    deep: number; // 此节点在整个树中的的深度
    parent: ICanExpendedItem; // 父节点
    isEnable: boolean; // 是否已经开启此文档搜索
    data: { docInfo: IDocInfo, docType: DocsModelTypeType, docEntry: DocsModelEntriyType, pathname: string, name: string };
}

export interface ICanExpendedState {
    setSelectedIndexByUrlPath: (locationUrl: string) => boolean;
    listItems: ICanExpendedItem[];
    selectedIndex: number;
}

let enableDocs: ICanExpendedItem[];
let disableDocs: ICanExpendedItem;

export function getDocInfoByUrlPath(pathname: string): ICanExpendedItem {
    const temp = [...enableDocs, disableDocs];
    while (temp.length > 0) {
        const item = temp.shift();
        if (item.data.pathname === pathname) {
            return item;
        }
        temp.push(...item.child);
    }
    const slug = pathname.split('/')[2];
    for (const item of disableDocs.child) {
        if (item.child.length > 0) {
            for (const child of item.child) {
                if (child.data.docInfo.slug === slug) {
                    return child;
                }
            }
            continue;
        }
        if (item.data && item.data.docInfo.slug === slug) {
            return item;
        }
    }
    return null;
}

export class DocListState implements ICanExpendedState {
    public listItems: ICanExpendedItem[];

    constructor(private docs: Docs, force: boolean = false, public selectedIndex: number = -1) {
        if (force || !enableDocs) {
            this.init(this.docs);
        }
        this.listItems = this.generalList();
        // this.selectedIndex = _selectedIndex;
        // console.log('ExpandedDocList new ' + force + _selectedIndex);
    }
    public setSelectedIndexByUrlPath: (locationUrl: string) => boolean = this._setSelectedIndexByUrlPath.bind(this);

    private init(docs: Docs) {
        enableDocs = [];
        disableDocs = {
            isExpended: true,
            deep: 0,
            child: [],
            isEnable: false,
            data: { name: 'Disable', pathname: 'disable', docInfo: null, docType: null, docEntry: null },
            parent: null,
        };
        for (const docItem of docs.DocsList) {
            if (docItem.storeValue) {
                const parentItem: ICanExpendedItem = {
                    isExpended: false, deep: 0, child: [], parent: null,
                    isEnable: true,
                    data: { name: docItem.name, docInfo: docItem, docType: null, docEntry: null, pathname: docItem.pathname },
                };
                parentItem.child = docItem.storeValue.types.map((item: DocsModelTypeType) => {
                    const parentTypes: ICanExpendedItem = {
                        isExpended: false, deep: 0, child: [], parent: parentItem,
                        isEnable: true,
                        data: { name: item.name, docInfo: docItem, docType: item, docEntry: null, pathname: item.pathname },
                    };
                    item.childs = docItem.storeValue.entries.filter((entry) => {
                        if (entry.type === item.name) {
                            return true;
                        }
                        return false;
                    });
                    parentTypes.child = item.childs.map((entry: DocsModelEntriyType) => {
                        return {
                            isExpended: false, deep: 0, child: [], parent: parentTypes,
                            isEnable: true,
                            data: { name: entry.name, docInfo: docItem, docType: item, docEntry: entry, pathname: entry.pathname },
                        };
                    });
                    return parentTypes;
                });
                enableDocs.push(parentItem);
            } else {
                if (docItem.slug.indexOf('~') === -1) {
                    disableDocs.child.push({
                        isExpended: false, deep: 1, child: [], parent: disableDocs,
                        isEnable: false,
                        data: { name: docItem.name, docInfo: docItem, docType: null, docEntry: null, pathname: docItem.pathname },
                    });
                } else {
                    const disableChilds = disableDocs.child;
                    let _parent;
                    for (const item of disableChilds) {
                        if (item.data.name === docItem.name) { // 以name 归类，不再以 docItem.slug 中 ～ 的前缀归类
                            _parent = item;
                        }
                    }
                    if (!_parent) {
                        _parent = {
                            isExpended: false, deep: 1, child: [], parent: disableDocs,
                            isEnable: false,
                            data: { name: docItem.name, docInfo: null, docType: null, docEntry: null, pathname: null },
                        };
                        disableDocs.child.push(_parent);
                    }
                    _parent.child.push({
                        isExpended: false, deep: 1, child: [], parent: _parent,
                        isEnable: false,
                        data: { name: docItem.name + ' ' + docItem.version, docInfo: docItem, docType: null, docEntry: null, pathname: docItem.pathname },
                    });
                }
            }
        }
    }
    // 标记节点在树中的深度
    private markNodeDeep(enableDocs: ICanExpendedItem[]): number {
        const firstList: ICanExpendedItem[] = [...enableDocs];
        const secondList: ICanExpendedItem[] = [];
        let deep = 0;
        do {
            if (firstList.length !== 0) {
                for (const item of firstList) {
                    item.deep = deep;
                    secondList.push(...item.child);
                }
                firstList.splice(0, firstList.length);
                deep++;
            }
            if (secondList.length !== 0) {
                for (const item of secondList) {
                    item.deep = deep;
                    firstList.push(...item.child);
                }
                secondList.splice(0, secondList.length);
                deep++;
            }
        } while (firstList.length !== 0 || secondList.length !== 0);
        return deep - 1;
    }

    private _setSelectedIndexByUrlPath(locationUrl: string): boolean {
        // if (this.selectedIndex < this.listItems.length && this.selectedIndex > 0) {
        //     if (this.listItems[this.selectedIndex].data.pathname === locationUrl) {
        //         return false;  // 不用更新，selectedIndex 未变
        //     }
        // }
        this.listItems.some((value, index) => {
            if (value.data.pathname === locationUrl) {
                this.selectedIndex = index;
                return true;
            }
            return false;
        });
        // 先找到对应的item　先根，再左右遍历
        let findedItem: ICanExpendedItem = null;
        let temp: ICanExpendedItem[] = [...enableDocs];
        while (temp.length !== 0) {
            const item = temp.shift();
            if (item.data.pathname === locationUrl) {
                findedItem = item;
                break;
            }
            temp.unshift(...item.child);
        }
        if (findedItem === null) {
            locationUrl = locationUrl.split('/').slice(0, 3).join('/') + '/';
            for (const disalbe of disableDocs.child) {
                if (disalbe.child.length > 0) {
                    for (const child of disalbe.child) {
                        if (child.data.pathname === locationUrl) {
                            findedItem = child;
                            break;
                        }
                    }
                } else {
                    if (disalbe.data.docInfo && disalbe.data.pathname === locationUrl) {
                        findedItem = disalbe;
                        break;
                    }
                }
            }
            if (findedItem === null) {
                return false;
            }
        }
        // 展开findedItem　的父节点
        while (findedItem.parent) {
            findedItem = findedItem.parent;
            findedItem.isExpended = true;
        }
        // 寻找选中项，并重新生成listItems
        const lists: ICanExpendedItem[] = [];
        let newIndex = 0;
        let isFind = false;
        temp = [...enableDocs, disableDocs];
        while (temp.length !== 0) {
            const item = temp.shift();
            lists.push(item);
            if (item.data.pathname === locationUrl) {
                isFind = true;
            }
            if (item.isExpended) {
                temp.unshift(...item.child);
            }
            if (!isFind) { newIndex++; }
        }
        this.selectedIndex = newIndex;
        this.listItems = lists;
        return true;
    }
    private generalList(): ICanExpendedItem[] {
        const lists: ICanExpendedItem[] = [];
        let temp: ICanExpendedItem[] = [...enableDocs, disableDocs];
        this.markNodeDeep(enableDocs);
        this.markNodeDeep([disableDocs]);
        while (temp.length !== 0) {
            const item = temp.shift();
            lists.push(item);
            if (item.isExpended) {
                temp.unshift(...item.child);
            }
        }
        return lists;
    }
}