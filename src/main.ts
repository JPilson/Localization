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
  apiKey: "AIzaSyA3oWcxnVSk6Yv-zpeR5PiKrxsSn3mEnYs",
  authDomain: "localization-2dd83.firebaseapp.com",
  projectId: "localization-2dd83",
  storageBucket: "localization-2dd83.appspot.com",
  messagingSenderId: "1079500212038",
  appId: "1:1079500212038:web:72134bb5e0fb77fba8c747",
  measurementId: "G-VPQRCH94HX"
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
