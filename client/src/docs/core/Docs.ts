import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from './model';
import { Searcher } from './Searcher';
import DocsCacheUtils = require('./DocsCacheUtils');
import fm = require('../../framework');

// 根据docsInfoArrays 初始化 mSearcher
function initSearcher(docsInfoArrays: IDocInfo[]): Searcher<ISearchItem> {
    let searchItems: ISearchItem[] = [];
    docsInfoArrays.map<{ entries: ISearchItem[], types: ISearchItem[] }>(
        (docsItem: IDocInfo) => {
            if (!docsItem.storeValue) {
                return { entries: [], types: [] };
            }
            let _entries: ISearchItem[];
            let _types: ISearchItem[];
            _entries = docsItem.storeValue.entries.map((item: DocsModelEntriyType) => {
                return { name: item.name, pathname: item.pathname, slug: docsItem.slug, doc: docsItem };
            });
            _types = docsItem.storeValue.types.map((item: DocsModelTypeType) => {
                return { name: item.name, pathname: item.pathname, slug: docsItem.slug, doc: docsItem };
            });
            return { entries: _entries, types: _types };
        }).map((item: { entries: ISearchItem[], types: ISearchItem[] }) => {
            return [...item.entries, ...item.types];
        }).forEach((item) => {
            searchItems = searchItems.concat(item);
        });

    searchItems.push(...docsInfoArrays.filter((item) => {
        if (item.storeValue) {
            return false;
        }
        return true;
    }).map((item) => {
        return { name: item.slug, pathname: item.pathname, slug: item.slug, doc: item };
    }));
    return new Searcher(searchItems, ['name']);
}

async function initDocsArray(docsInfoArrays: IDocInfo[], downloadDocs: string[]) {
    const downloadInfos: IDocInfo[] = downloadDocs.map((item) => {
        for (const docInfo of docsInfoArrays) {
            if (docInfo.slug === item) {
                return docInfo;
            }
        }
        return null;
    });
    for (const _downloadDocInfo of downloadInfos) {
        await downloadDoc(_downloadDocInfo);
    }
    const keys: string[] = await localStorage.keys();
    for (const key of keys) {
        for (const info of docsInfoArrays) {
            if (info.slug === key) {
                const value: IDocInfo = await DocsCacheUtils.get(key) as IDocInfo;
                if (value) {
                    info.storeValue = value.storeValue;
                }
            }
        }
    }
}
async function downloadDoc(docInfo: IDocInfo) {
    return fm.utils.RestUtils.fetch<{
        entries: DocsModelEntriyType[],
        types: DocsModelTypeType[],
    }>({
        url: config.docs_host + '/docs/' + docInfo.slug + '/index.json',
        emptyUseCache: true,
    }).then(res => {
        // const responseString = await res.text();
        docInfo.storeValue = res;
        docInfo.storeValue.types = sortTyps(docInfo.storeValue.types);
        docInfo.storeValue.entries.forEach((item) => item.pathname = docInfo.pathname + item.path);
        docInfo.storeValue.types.forEach((item) => item.pathname = docInfo.pathname + item.slug + '/');
    });
}
const GUIDES_RGX = /(^|[\s\(])(guide|tutorial|reference|getting\ started)/i;
function _groupFor(type: DocsModelTypeType) {
    if (GUIDES_RGX.test(type.name)) {
        return 0;
    } else {
        return 1;
    }
}
function sortTyps(types: DocsModelTypeType[]): DocsModelTypeType[] {
    const result = [];
    let name;
    const len = types.length;
    for (let i = 0; i < len; i++) {
        const type = types[i];
        (result[name = _groupFor(type)] || (result[name] = [])).push(type);
    }
    if (!result[0]) {
        result[0] = [];
    }
    if (!result[1]) {
        result[1] = [];
    }
    return [...(result[0]), ...result[1]];
}
const config = {
    default_docs: ['css', 'dom', 'dom_events', 'html', 'http', 'javascript'],
    docs_host: 'http://127.0.0.1:8081',
    docs_host_link: 'localhost:8080',
    env: 'development',
    history_cache_size: 10,
    index_path: '/docs',
    max_results: 50,
    production_host: 'www.devdocs.me',
    search_param: 'q',
    sentry_dsn: '',
    version: '1450281649',
};

class Docs {
    private isAutoUpdate: boolean;
    private isDocChangedByUser: boolean;

    private mSearcher: Searcher<ISearchItem>;
    constructor(private docsInfoArrays: IDocInfo[] = []) {
        this.docsInfoArrays.forEach((item) => item.pathname = '/docs/' + item.slug + '/');
        DocsCacheUtils.get<boolean>('Docs_IsAutoUpdate', true)
            .then(value => this.isAutoUpdate = value); // 默认为true
        DocsCacheUtils.get('Docs_isDocChangedByUser', false)
            .then(value => this.isDocChangedByUser = value); // 默认为false
    }
    public async init(searchFilter: string = '') {
        await initDocsArray(this.docsInfoArrays, this.isDocChangedByUser ? [] : config.default_docs);
        this.mSearcher = initSearcher(searchFilter ? this.docsInfoArrays.filter((item) => {
            if (item.slug === searchFilter) {
                return true;
            }
            return false;
        }) : this.docsInfoArrays);
        if (this.docsInfoArrays.length === 0) {
            throw new Error('docsArrays is empty');
        }
        this.isDocChangedByUser = true;
        this.save();
    }
    public get getDocsInfoArrays() {
        return this.docsInfoArrays;
    }

    public async addDoc(docInfo: IDocInfo): Promise<any> {
        // if (!docInfo) {
        //     return null;
        // }
        this.isDocChangedByUser = true;
        this.save();
        // 无论localstorage 有无,均下载
        await downloadDoc(docInfo);
        await this.init();
    }

    public async removeDoc(docInfo: IDocInfo) {
        if (!docInfo) {
            return;
        }
        this.isDocChangedByUser = true;
        this.save();
        await localStorage.removeItem(docInfo.slug);
        for (const doc of this.docsInfoArrays) {
            if (doc.slug === docInfo.slug) {
                doc.storeValue = undefined;
                break;
            }
        }
        await this.init();
    }
    public setIsAutoUpdate(isUpdate: boolean = true) {
        this.isAutoUpdate = isUpdate;
        this.save();
    }
    public getConfig() {
        return config;
    }
    private save() {
        DocsCacheUtils.save('Docs_IsAutoUpdate', this.isAutoUpdate);
        DocsCacheUtils.save('Docs_isDocChangedByUser', this.isDocChangedByUser);
    }
    public search(input: string): Promise<ISearchItem[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mSearcher.search(input));
        });
    }
}

export { Docs };
