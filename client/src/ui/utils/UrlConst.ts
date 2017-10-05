
const UPDATE_BASE_URL = 'http://139.196.137.46:8080'; // MainLand
const BASE_URL = 'http://139.196.137.46:8080'; // MainLand
const SHARE_BASE_URL = 'http://139.196.138.9:8181/test/tpl?id='; // 139

function getUrl(endfix: string) {
    return BASE_URL + endfix;
}
export const RegisterUrl = getUrl('/verification/phone');
export const HomeArticleUrl = getUrl('/recommend/article/latest');