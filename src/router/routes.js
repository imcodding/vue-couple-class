import CoupleView from '../views/CoupleView.vue'
import HistoryView from '../views/HistoryView.vue'
import { defineComponent } from 'vue'

const NotFound = defineComponent({
  template: '<div>Not Found</div>',
})

const routes = [
  { path: '/', redirect: '/couple' },
  { path: '/couple', name: 'coupleView', component: CoupleView },
  { path: '/history', name: 'historyView', component: HistoryView },
  { path: '/:catchAll(.*)+', component: NotFound },
]

export default routes

