import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Search from  '@/components/pages/Search'
import Login from  '@/components/pages/Login'
import Result_4 from '@/components/pages/Result_4'
import Result_3 from '@/components/pages/LoginResult/Result_3'
import Result_2 from '@/components/pages/LoginResult/Result_2'
import StarPro from '@/components/pages/LoginResult/showResult/StarPortion'
import Home from'@/components/pages/Home'
import User from '@/components/pages/UserManager/UserManager'
import Register from '@/components/pages/Register'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'StarPro',
      component: StarPro
    },
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/result2/:id',
      name: 'Result_2',
      component: Result_2
    },
    {
      path: '/result3/:id',
      name: 'Result_3',
      component: Result_3
    },
    {
      path: '/result4/:shop',
      name: 'Result_4',
      component: Result_4
    },
    {
      path:'/register',
      name:Register,
      component:Register,
    }
  ]
})
