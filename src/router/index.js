import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store/index'

Vue.use(VueRouter)
// 首页
const Home = () => import('views/home/Home');

// 出借
const LoanIndex = () => import('views/loan/LoanIndex');
const LoanList = () => import('views/loan/List');
const LoanDetail = () => import('views/loan/Detail');
const LoanDetail_1 = () => import('views/loan/Detail_1');
// 登录
const LoginIndex = () => import('views/login/LoginIndex');
const Login = () => import('views/login/Login');
const Register = () => import('views/login/Register');
// 新闻
const News = () => import('views/news/News');

// 用户中心
const User = () => import('views/user/User');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      islogin: false
    }
  },
  {
    path: '/loan',
    name: 'loan',
    component: LoanIndex,
    meta: {
      islogin: false
    },
    children:[
      {
        path:'list',
        name: 'list',
        component:LoanList,
        meta: {
          islogin: false
        },
      },
      {
        path:'detail/:id',
        name: 'detail',
        component:LoanDetail,
        meta: {
          islogin: false
        },
      },
      {
        path:'detail_1/:id',
        name: 'detail_1',
        component:LoanDetail_1,
        meta: {
          islogin: false
        },
      },
    ]
  },
  {
    path: '/login',
    component: LoginIndex,
    meta: {
      islogin: false
    },
    children:[
      {
        path:'register',
        name: 'register',
        component:Register,
        meta: {
          islogin: false
        },
      },
      {
        path:'login',
        name: 'login',
        component:Login,
        meta: {
          islogin: false
        },
      }
    ],
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: {
      islogin: false
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      islogin: true
    }
  },
];
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('Us')) {
  store.commit('login', window.localStorage.getItem('Us'))
}
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.islogin)) {
    if (store.state.Us) {
      next();
    }
    else {
      next({
        path: '/login/login',
        // query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router
