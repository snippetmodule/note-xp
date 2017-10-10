import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import UrlCacheUtils = require('../utils/UrlCacheUtils');

@AutoSubscribeStore
class UserManager extends StoreBase {
    private mUser: User = new User();

    init() {
        return UrlCacheUtils.get('file://userloginInfo', Number.MAX_VALUE)
            .then((cache) => {
                cache && this.mUser.json(cache.response);
            });
    }
    save(response: string) {
        return UrlCacheUtils.save('file://userloginInfo', response)
            .then(() => {
                this.mUser.json(response);
                this.trigger();
            });

    }

    logOut() {
        return UrlCacheUtils.del('file://userloginInfo')
            .then(() => {
                this.mUser = new User();
                this.trigger();
            });
    }

    @autoSubscribe
    getUser(): User {
        return this.mUser;
    }
}

class User {
    private mInfo: IUserInfo;

    get isLogined(): boolean {
        return this.mInfo && true;
    }
    get token(): string {
        return this.mInfo ? this.mInfo.token : '';
    }
    get info(): IUserInfo {
        return this.mInfo;
    }
    json(response: string) {
        this.mInfo = JSON.parse(response);
    }
}
interface IUserInfo {
    id: string;
    userNo: string;
    nickName: string;
    hasCerted: boolean;
    description: string;
    token: string;
    life: number;
}

export = new UserManager();