import Vue from 'vue';
import Router from 'vue-router';
import Gitissues from '@/components/Gitissues';
import Gitissue from '@/components/Gitissue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gitissues',
      component: Gitissues,
    },
    {
      path: '/:name/:repo/:issue',
      name: 'GitHubIssue',
      component: Gitissue,
    },
  ],
});
