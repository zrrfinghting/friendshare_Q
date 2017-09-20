import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import shopping from './Shopping';
import order from './Orders';
import shopCart from './ShopCart';
import books from './Books';
import bookTypes from './BookTypes';
import user from './User';
import reclaim from './Reclaim';

export default new Vuex.Store({
    modules: {
        shopping,
        order,
        shopCart,
        books,
        bookTypes,
        user,
        reclaim,
    }
});