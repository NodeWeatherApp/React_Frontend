import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: '',
            cookie:'',
        })
    }
}

export default new UserStore();