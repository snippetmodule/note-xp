import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import UrlCacheUtils = require('../utils/UrlCacheUtils');

@AutoSubscribeStore
class UserManager extends StoreBase {
    private mUser: User = new User();

    init() {
        return UrlCacheUtils.get('file://userloginInfo', Number.MAX_VALUE)
            .then((cache => cache && this.mUser.json(cache.response)));
    }
    save(response: string) {
        return UrlCacheUtils.save('file://userloginInfo', response)
            .then(() => this.mUser.json(response))

    }

    loginOut() {
        return UrlCacheUtils.del('file://userloginInfo')
            .then(() => {
                this.mUser = new User();
            });
    }

    @autoSubscribe
    getUser(): User {
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

export let Instance =  new UserManager();
