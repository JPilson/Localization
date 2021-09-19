import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import vuesaxOption from "@/plugins/vuesax";
import firebase from "firebase/compat";



const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
Vue.use(require("boxicons"))
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.use(Vuesax, vuesaxOption)
new Vue({
  router,
  store,
  vuetify,


  render: h => h(App)
}).$mount('#app')
