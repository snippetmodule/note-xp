import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import UrlCacheUtils = require('../utils/UrlCacheUtils');

@AutoSubscribeStore
class UserManager extends StoreBase {
    private mUser: User = new User();

    async init() {
        let cache = await UrlCacheUtils.get('file://userloginInfo', Number.MAX_VALUE);
        this.mUser.json(cache.response);
    }
    async save(response: string) {
        await UrlCacheUtils.save('file://userloginInfo', response);
        this.mUser.json(response);
    }

    async loginOut() {
        await UrlCacheUtils.del('file://userloginInfo');
        this.mUser = new User();
    }

    @autoSubscribe
    get user(): User {
        return this.mUser;
    }
}

export class User {
    private mInfo: UserInfo;

    get isLogined(): boolean {
        return this.mInfo && true;
    }

    json(response: string) {
        this.mInfo = JSON.parse(response);
    }
}
interface UserInfo {
    name: string;
    sex: number;
    icon: string;
}

export default new UserManager();
