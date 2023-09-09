import { createRouter, createWebHashHistory } from 'vue-router';

import { useSessionStore } from '../stores/session-store';
import TableAcars from '../components/TableAcars.vue';
import IvaoView from '../views/IvaoView.vue';
import HomeView from '../views/HomeView.vue';
import CabalView from '../views/CabalView.vue';
import AdminView from '../views/AdminView.vue';
import PasswordChangeView from '../views/PasswordChangeView.vue';
import MapView from '../views/MapView/MapView.vue';

const checkRolesFn = (roles) => {
  return () => {
    const store = useSessionStore();
    return store.isAuthenticated && store.hasRoles(roles);
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView,
    }, {
      path: '/ivao',
      name: 'ivao',
      component: IvaoView,
    },
    {
      path: '/acars',
      name: 'acars',
      component: TableAcars,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: checkRolesFn(['admin']),
    },
    {
      path: '/cabal',
      name: 'cabal',
      component: CabalView,
      beforeEnter: checkRolesFn(['admin', 'cabal']),
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/password-change',
      name: 'password-change',
      component: PasswordChangeView,
      beforeEnter: checkRolesFn(['admin']),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;