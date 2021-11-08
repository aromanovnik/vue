import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Payment from '../views/Payment.vue';
import Auth from '../views/Auth.vue';
import Notfound from '../views/Notfound.vue';
import AddPayment from '../views/AddPayment.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Payment',
    component: Payment,
  },
  {
    path: '/add/payment/:category',
    name: 'AddPayment',
    component: AddPayment,
    props: (route) => ({ value: route.query.value }),
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '*',
    redirect: '/notfound',
    component: Notfound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const userIsAuth = true;

router.beforeEach((to, from, next) => {
  if (to.name !== 'Auth' && !userIsAuth) {
    next({
      name: 'Auth',
    });
  } else {
    next();
  }
});

const getTitleByRouteName = (routeName: string): string => {
  const titles: { [key: string]: string } = {
    Dashboard: 'Take a look on your payments and add more!',
    About: 'Anything about our awesome application!',
    NotFound: 'Oops! Seems like we lost this page :(',
  };
  return titles[routeName] ?? '' as string;
};

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name as string);
});

export default router;
