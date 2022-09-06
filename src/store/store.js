import { createStore } from 'vuex'
import jurisdiction from './jurisdiction'
import user from './user'
import admin from './admin'

export default createStore({
  modules: {
    vx_power: jurisdiction,
    vx_user: user,
    vx_admin: admin,
  },
})
