import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from './model';
import { Searcher } from './Searcher';
import DocsList = require('./DocsList');
import fm = require('../../framework');
import _ = require('lodash');
import { CachesUtil } from '../../framework/utils/index';
import { DocList } from '../ui/doclist/DocList';

export const config = {
    default_docs: ['css', 'dom', 'dom_events', 'html', 'http', 'javascript'],
    docs_host: 'http://docs.devdocs.io',
    docs_host_link: 'localhost:8080',
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
    docsInfoArrays.map<{ entries: ISearchItem[] }>(
        (docsItem: IDocInfo) => {
            if (docsItem.slug === 'kotlin') {
                console.log('kotlin');
            }
            if (!docsItem.storeValue) {
                return { entries: [], types: [] };
            }
            let _entries: ISearchItem[];
            let _types: ISearchItem[];
            _entries = docsItem.storeValue.entries.map((item: DocsModelEntriyType) => {
                return { name: item.name, pathname: item.pathname, slug: docsItem.slug, isEnable: true };
            });
            // _types = docsItem.storeValue.types.map((item: DocsModelTypeType) => {
            //     return { name: item.name, pathname: item.pathname, slug: docsItem.slug, isEnable: true };
            // });
            return { entries: _entries };
        }).map((item: { entries: ISearchItem[] }) => {
            return [...item.entries];
        }).forEach((item) => {
            searchItems = searchItems.concat(item);
        });

    searchItems.push(...docsInfoArrays.filter((item) => {
        if (item.storeValue) {
            return false;
        }
        return true;
    }).map((item) => {
        return { name: item.slug, pathname: item.pathname, slug: item.slug, isEnable: false };
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
        await downloadDoc(_downloadDocInfo.slug);
    }
}
async function downloadDoc(docslug: string) {
    console.time(`downloadDoc-${docslug}`);
    let docInfo: IDocInfo = DocsList.find((doc, index) => doc.slug === docslug);

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
        console.timeEnd(`downloadDoc-${docslug}`);
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
async function load<T>(url: string) {
    console.time(`load-${url}`);
    let result = await fm.utils.RestUtils.fetch<T>({
        url: url,
        expiredTime: Number.MAX_VALUE,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': 'https://devdocs.io/',
            'Origin': 'https://devdocs.io',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        },
    });
    console.timeEnd(`load-${url}`);
    return result;
}
class Docs {
    private isAutoUpdate: boolean;

    private localDocs: string[];
    private mSearcher: Searcher<ISearchItem>;

    public async init(searchFilter: string = '') {
        this.localDocs = await fm.utils.CachesUtil.get<string[]>('Docs_default_docs', config.default_docs);
        DocsList.forEach((item) => item.pathname = '/docs/' + item.slug + '/');
        await initDocsArray(DocsList, this.localDocs);
        this.mSearcher = initSearcher(searchFilter ? DocsList.filter((item) => {
            if (item.slug === searchFilter) {
                return true;
            }
            return false;
        }) : DocsList);
        this.save();
    }
    public get DocsList(): IDocInfo[] {
        return DocsList;
    }
    public async addDoc(docslug: string): Promise<any> {
        if (!docslug || _.includes(this.localDocs, docslug)) {
            return null;
        }
        await downloadDoc(docslug);
        this.localDocs.push(docslug);
        this.save();
        await this.init();
    }

    public async removeDoc(docslug: string) {
        if (!docslug) {
            return;
        }
        await fm.utils.UrlCacheUtils.del(config.docs_host + docslug + '/index.json');
        this.save();
        await this.init();
    }
    public async fetchDetail(pathname: string): Promise<string> {
        if (!pathname) { return null; }
        let slug = pathname.split('/')[2];
        if (pathname === `/docs/${slug}/`) {
            return load<string>(`${config.docs_host}/${slug}/index.html`);
        }
        if (pathname.includes('#')) {
            pathname = pathname.substr(0, pathname.indexOf('#'));
        }
        const cache: string = await fm.utils.CachesUtil.get<string>(pathname, null, 'docsDbCache');
        if (cache) { return cache; }
        const dbJson: { [key: string]: string } = await load<{ [key: string]: string }>(`${config.docs_host}/${slug}/db.json`);
        for (let key in dbJson) {
            if (dbJson.hasOwnProperty(key)) {
                await fm.utils.CachesUtil.save<string>(`/docs/${slug}/${key}`, dbJson[key], 'docsDbCache');
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
        console.time(`search key:${input} time:`);
        return new Promise<ISearchItem[]>((resolve, reject) => {
            resolve(this.mSearcher.search(input));

        }).then(r => {
            console.timeEnd(`search key:${input} time:`);
            return r;
        }).catch(e => {
            console.error(e);
            console.timeEnd(`search key:${input} time:`);
            return e;
        });
    }
}

export { Docs };
