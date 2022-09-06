const routes = [
  {
    name: '初始页',
    path: '/',
    component: () => import('@/view/login.vue'),
  },
  {
    name: '登录',
    path: '/login',
    component: () => import('@/view/login.vue'),
  },
  {
    name: '学生端主页面',
    path: '/student/home',
    component: () => import('@/view/student/home.vue'),
    redirect: '/student/home/pay-electric',
    children: [
      {
        path: 'pay-electric',
        component: () => import('@/view/student/payElectric.vue'),
      },
      {
        path: 'pay-water',
        component: () => import('@/view/student/payWater.vue'),
      },
      {
        path: 'repair',
        component: () => import('@/view/student/repair.vue'),
      },
    ],
  },
  {
    name: '管理员端主页面',
    path: '/admin/home',
    component: () => import('@/view/admin/home.vue'),
    redirect: '/admin/home/electric',
    children: [
      {
        path: 'electric',
        component: () => import('@/view/admin/electric.vue'),
      },
      {
        path: 'water',
        component: () => import('@/view/admin/water.vue'),
      },
      {
        path: 'personnel',
        component: () => import('@/view/admin/personnel.vue'),
      },
      {
        path: 'security',
        component: () => import('@/view/admin/security.vue'),
      },
      {
        path: 'checkin',
        component: () => import('@/view/admin/checkin.vue'),
      },
      {
        path: 'repair',
        component: () => import('@/view/admin/repair.vue'),
      },
    ],
  },
]

export default routes
