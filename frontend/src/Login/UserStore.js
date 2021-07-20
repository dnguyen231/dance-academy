import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: false,
            isLoggedIn: false,
            email: '',
            name: '',
            dob: '',
            phone: '',
            address: ''
        })
    }
}

export default new UserStore();