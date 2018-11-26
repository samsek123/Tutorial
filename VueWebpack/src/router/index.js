import Vue from 'vue';
import Router from 'vue-router';
import VotePage from '@/components/VotePage';
import SuccessPage from '@/components/SuccessPage';
import RankPage from '@/components/RankPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/ust_valentine/',
  routes: [
    {
      path: '/',
      name: 'VotePage',
      component: VotePage,
    },
    {
      path: '/vote',
      name: 'VotePage',
      component: VotePage,
    },
    {
      path: '/success',
      name: 'SuccessPage',
      component: SuccessPage,
    },
    {
      path: '/rank',
      name: 'RankPage',
      component: RankPage,
    },
  ],
});
