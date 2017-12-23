import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from './model';
import { Searcher } from './Searcher';
import DocsList = require('./DocsList');
import fm = require('../../framework');
import _ = require('lodash');
import { CachesUtil } from '../../framework/utils/index';

const config = {
    default_docs: ['css', 'dom', 'dom_events', 'html', 'http', 'javascript'],
    docs_host: 'http://docs.devdocs.io',
    docs_host_link: 'http://docs.devdocs.io',
    env: 'development',
    history_cache_size: 10,
    index_path: '',
    max_results: 50,
    production_host: 'http://docs.devdocs.io',
    search_param: 'q',
    sentry_dsn: '',
    version: '1450281649',
};

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
}
async function downloadDoc(docInfo: IDocInfo) {
    return fm.utils.RestUtils.fetch<{
        entries: DocsModelEntriyType[],
        types: DocsModelTypeType[],
    }>({
        url: config.docs_host + '/' + docInfo.slug + '/index.json',
        expiredTime: Number.MAX_VALUE,
        headers: {
            'Accept': 'application/json',
            'Referer': 'https://devdocs.io/',
            'Origin': 'https://devdocs.io',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        },
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

class Docs {
    private isAutoUpdate: boolean;

    private localDocs: string[];
    private docsInfoArrays: IDocInfo[];
    private mSearcher: Searcher<ISearchItem>;

    public async init(searchFilter: string = '') {
        if (this.docsInfoArrays == null || this.docsInfoArrays.length === 0) {
            this.docsInfoArrays = DocsList as IDocInfo[];
        }
        this.localDocs = await fm.utils.CachesUtil.get<string[]>('Docs_default_docs', config.default_docs);
        this.docsInfoArrays.forEach((item) => item.pathname = '/docs/' + item.slug + '/');
        await initDocsArray(this.docsInfoArrays, this.localDocs);
        this.mSearcher = initSearcher(searchFilter ? this.docsInfoArrays.filter((item) => {
            if (item.slug === searchFilter) {
                return true;
            }
            return false;
        }) : this.docsInfoArrays);
        if (this.docsInfoArrays.length === 0) {
            throw new Error('docsArrays is empty');
        }
        this.save();
    }
    public get getDocsInfoArrays() {
        return this.docsInfoArrays;
    }

    public async addDoc(docInfo: IDocInfo): Promise<any> {
        if (!docInfo || _.includes(this.localDocs, docInfo.slug)) {
            return null;
        }
        await downloadDoc(docInfo);
        this.localDocs.push(docInfo.slug);
        this.save();
        await this.init();
    }

    public async removeDoc(docInfo: IDocInfo) {
        if (!docInfo) {
            return;
        }
        await fm.utils.UrlCacheUtils.del(config.docs_host + docInfo.slug + '/index.json');
        this.save();
        await this.init();
    }
    public async fetchDetail(pathname: string, docInfo: IDocInfo): Promise<string> {
        if (!docInfo) { return null; }
        const cache: string = await fm.utils.CachesUtil.get<string>(pathname, null, 'docsDbCache');
        if (cache) { return cache; }
        const dbJson: { [key: string]: string } = await fm.utils.RestUtils.fetch<{ [key: string]: string }>({
            url: `${config.docs_host}/${docInfo.slug}/db.json`,
            expiredTime: Number.MAX_VALUE,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'Referer': 'https://devdocs.io/',
                'Origin': 'https://devdocs.io',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
            },
        });
        for (let key in dbJson) {
            if (dbJson.hasOwnProperty(key)) {
                await fm.utils.CachesUtil.save<string>(key, dbJson[key], 'docsDbCache');
            }
        }
        return fm.utils.CachesUtil.get<string>(pathname, null, 'docsDbCache');
    }
    public setIsAutoUpdate(isUpdate: boolean = true) {
        this.isAutoUpdate = isUpdate;
        this.save();
    }
    private save() {
        fm.utils.CachesUtil.save('Docs_default_docs', this.localDocs);
    }
    public search(input: string): Promise<ISearchItem[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mSearcher.search(input));
        });
    }
}

export { Docs };
