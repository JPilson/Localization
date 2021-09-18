<template>
  <v-app :style="{background: colors.background} "  :dark="isDark" >

    <div v-if="isSessionActive">
      <v-app-bar app :color="colors.background"  flat>
        <v-flex d-flex>
          <TextView text="Projects  " bold/>
          <box-icon type="regular" class="mx-2" name="chevron-right" :color="colors.primaryText"/>
          <TextView text="EncDaJob" size="12"/>
        </v-flex>
        <v-spacer />
        <vs-avatar  size="30" badge badge-color="success" >
          <img :src="user.photoURL" alt="">
        </vs-avatar>
      </v-app-bar>

      <SideBar/>
    </div>


    <v-main>

      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Utils from "@/utils/Utils";
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import TextView from "@/utils/UI/TextView/TextView.vue";
import SideBar from "@/components/SideBar.vue";
import firebase from "firebase/compat";

import {UserModelInterface} from "@/models/User";
import APiHelper from "@/api/APiHelper";
import {errors} from "faunadb";

@Component({
  components: {
    SideBar,
    TextView

  },
})
export default class App extends Vue {
  get colors ():ColorType {
    return this.$store.getters.colors
  }
  get isDark(): boolean {
    return this.$store.getters.isDark;
  }
  
  get isSessionActive(): boolean {
    return this.$store.getters.session
  }
  get user():UserModelInterface {
    return  this.$store.getters.user
  }
  async getUserInfoFromDB(uid:string,onSuccess:(user:UserModelInterface | null)=>void, onError:(error: any)=> void){
    
    const api = new APiHelper();
    const result = await api.getUserByUId(uid);
    if(result.error){
        if(result['reason']?.includes("not found")){
          onSuccess(null)
        }else{
          onError(result)
        }
        return
    }
    onSuccess(result.data as unknown as UserModelInterface)

    // onSuccess(result);

  }

  beforeMount():void{
    // firebase.auth().signOut();




    firebase.auth().onAuthStateChanged((user)=>{

      if(!user){
        // console.log("User out")
      //  TODO: don't let user be in some other page beside Login
        this.$router.replace("/")
        this.$store.dispatch("updateNewUserState",false)
        return
      }
      this.getUserInfoFromDB(user.uid,(user)=>{
       if(!user){
         this.$store.dispatch("updateSession",{user:null})
         this.$store.dispatch("updateNewUserState",false)
         if(this.$route.name !== "Login"){
           this.$router.replace("/")

         }

         return
       }
       console.log("user is valid")
        this.$store.dispatch("updateNewUserState",false)

        if(this.$route.name == "Login")
            this.$router.replace("/home").then(()=>{this.$store.dispatch("updateSession",{user:user})})
        else
          this.$store.dispatch("updateSession",{user:user});


      }, (error)=>{
        console.log(`Something went wrong try again `, error)
        firebase.auth().signOut()
        alert("Something went wrong try again later")
      })
      // console.log("User in")
      // if(user.)

      //

    })

    // const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    // Utils.onThemeChange(systemTheme)
    // systemTheme.addEventListener("change",(theme)=>Utils.onThemeChange(theme))
  }


}



</script>
<style>
  html, body{
  height: 100%;
  background-color:#1C2831 !important;
  }
</style>
