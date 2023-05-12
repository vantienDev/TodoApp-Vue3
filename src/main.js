import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import './assets/globalStyle.scss'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars, faMagnifyingGlass, faAngleRight } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBars, faMagnifyingGlass, faAngleRight)

createApp(App).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
