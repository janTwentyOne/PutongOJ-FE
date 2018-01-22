import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'
import iView from 'iview'

Vue.use(Router)
Vue.use(iView)

const router = new Router({
  // mode: 'history',
  routes
})

// 全局身份确认
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (to.meta.requiresLogin) {
    const isLogined = store.getters['session/isLogined']
    if (isLogined) {
      next()
    } else {
      store.commit('session/TRIGGER_LOGIN')
      next({
        name: 'contestList'
      })
    }
  } else if (to.meta.requiresAdmin) {
    const isAdmin = store.getters['session/isAdmin']
    if (isAdmin) {
      next()
    } else {
      next({
        name: 'home'
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  iView.LoadingBar.finish()
})

export default router
