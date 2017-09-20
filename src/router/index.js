//路由懒加载
//404
const NotFound = resolve => require(['../container/404.vue'], resolve);
//前台
const PlatForm = resolve => require(['../container/platform/Index.vue'], resolve);
const PlatFormMain = resolve => require(['../container/platform/Main.vue'], resolve);
const PlatFormHotBook = resolve => require(['../container/platform/hotBook/Main.vue'], resolve);
const PlatFormCheapBook = resolve => require(['../container/platform/cheapBook/Main.vue'], resolve);
const PlatFormOnlineRetrieve = resolve => require(['../container/platform/onlineRetrieve/Main.vue'], resolve);
const PlatFormSearch = resolve => require(['../container/platform/search/Main.vue'], resolve);
const PlatFormShopping = resolve => require(['../container/platform/shopping/Main.vue'], resolve);
const PlatFormShoppingCart = resolve => require(['../container/platform/shopping/ShoppingCart.vue'], resolve);
const PlatFormShoppingOrder = resolve => require(['../container/platform/shopping/ShoppingOrder.vue'], resolve);
const PlatFormShoppingSuccess = resolve => require(['../container/platform/shopping/ShoppingSuccess.vue'], resolve);

//个人中心
const Person = resolve => require.ensure([], () => resolve(require('../container/platform/person/Index.vue')), 'person');
const MyInfo = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyInfo.vue')), 'person');
const MyPsw = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyPsw.vue')), 'person');
const MyOrder = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyOrder.vue')), 'person');
const OrderDetail = resolve => require.ensure([], () => resolve(require('../container/platform/person/OrderDetail.vue')), 'person');
const ReclaimDetail = resolve => require.ensure([], () => resolve(require('../container/platform/person/ReclaimDetail.vue')), 'person');
const MyRetrieve = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyRetrieve.vue')), 'person');
const MyAdvice = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyAdvice.vue')), 'person');

//登入注册
const PlatFormLogin = resolve => require.ensure([], () => resolve(require('../container/platform/user/Login.vue')), 'platform-user');
const PlatFormRegist = resolve => require.ensure([], () => resolve(require('../container/platform/user/Regist.vue')), 'platform-user');
const PlatFormForget = resolve => require.ensure([], () => resolve(require('../container/platform/user/Forget.vue')), 'platform-user');

//网页尾部链接
const Know = resolve => require.ensure([], () => resolve(require('../container/platform/know/Index.vue')), 'platform-know');
const AboutUs = resolve => require.ensure([], () => resolve(require('../container/platform/know/AboutUs.vue')), 'platform-know');
const ContactUs = resolve => require.ensure([], () => resolve(require('../container/platform/know/ContactUs.vue')), 'platform-know');
const Agreement = resolve => require.ensure([], () => resolve(require('../container/platform/know/Agreement.vue')), 'platform-know');
const Feedback = resolve => require.ensure([], () => resolve(require('../container/platform/know/Feedback.vue')), 'platform-know');

let routes = [
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/',
        component: PlatForm,
        hidden: true,
        redirect: '/main',
        children: [
        	{ path: 'main', component: PlatFormMain,hidden:true},
        	{ path: 'hotBook', component: PlatFormHotBook,hidden:true},
        	{ path: 'cheapBook', component: PlatFormCheapBook,hidden:true},
        	{ path: 'onlineRetrieve', component: PlatFormOnlineRetrieve,hidden:true},
        	{ path: 'search', component: PlatFormSearch,hidden:true},
        	{ path: 'shopping', component: PlatFormShopping,hidden:true},
        	{ path: 'shoppingCart', name:'购物车' , component: PlatFormShoppingCart,hidden:true,meta: {requireAuth: true}},
        	{ path: 'shoppingSuccess', name:'交易成功' , component: PlatFormShoppingSuccess,hidden:true,meta: {requireAuth: true}},
        	{ path: 'shoppingOrder', name:'订单' , component: PlatFormShoppingOrder,hidden:true,meta: {requireAuth: true}},
        	{ path: 'feedback', component: Feedback, name: '咨询反馈' ,hidden:true},
        	{ path: 'person', component: Person,hidden:true,redirect: '/person/myInfo',meta: {requireAuth: true},
            	children:[
            		{ path: 'myInfo', component: MyInfo, name: '我的资料',meta: {requireAuth: true} },
            		{ path: 'myPsw', component: MyPsw, name: '修改密码',meta: {requireAuth: true} },
            		{ path: 'myOrder', component: MyOrder, name: '我的订单',meta: {requireAuth: true} },
            		{ path: 'orderDetail', component: OrderDetail, name: '订单详情',meta: {requireAuth: true} },
            		{ path: 'reclaimDetail', component: ReclaimDetail, name: '回收单详情',meta: {requireAuth: true} },
            		{ path: 'myRetrieve', component: MyRetrieve, name: '我的回收单',meta: {requireAuth: true} },
            		{ path: 'myAdvice', component: MyAdvice, name: '我的消息',meta: {requireAuth: true} },
            	]
          },
          { path: 'know', component: Know,hidden:true,redirect: '/know/aboutUs',
            	children:[
            		{ path: 'aboutUs', component: AboutUs, name: '关于我们' },
            		{ path: 'contactUs', component: ContactUs, name: '联系我们' },
            		{ path: 'agreement', component: Agreement, name: '网站协议' },
            	]
           }
        ]
    },
    {
        path: '/platFormLogin',
        component: PlatFormLogin,
        name: '用户登录',
        hidden: true,
        meta: {
            requireAuth: false,  // 添加该字段，false表示进入这个路由是不需要登录的
        },
    },
    {
        path: '/regist',
        component: PlatFormRegist,
        name: '用户注册',
        hidden: true,
        meta: {
            requireAuth: false,  // 添加该字段，false表示进入这个路由是不需要登录的
        },
    },
    {
        path: '/forget',
        component: PlatFormForget,
        name: '忘记密码',
        hidden: true,
        meta: {
            requireAuth: false,  // 添加该字段，false表示进入这个路由是不需要登录的
        },
    },
];

export default routes;