<template>
  <v-app :style="{background: colors.background} "  :dark="isDark" >

    <div v-if="isSessionActive">
      <ToolBar/>
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
import {Component, Watch} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import TextView from "@/utils/UI/TextView/TextView.vue";
import SideBar from "@/components/SideBar.vue";
import firebase from "firebase/compat";

import {UserModelInterface} from "@/models/User";
import APiHelper from "@/api/APiHelper";
import {errors} from "faunadb";
import SIcon from "@/utils/UI/Sicon/SIcon.vue";
import ToolBar from "@/components/ToolBar.vue";

@Component({
  components: {
    ToolBar,
    SIcon,
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

  @Watch('isDark',{immediate:true,deep:true})
  onThemeChanged(isDark: boolean):void {
    // console.log("Dark is ", isDark)
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


  created():void {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Vue.prototype.$vs = this.$vs;
  }

  beforeMount():void{
    // firebase.auth().signOut();




    firebase.auth().onAuthStateChanged((user)=>{

      if(!user){
        this.$store.dispatch("updateSession",{user:null})
        this.$store.dispatch("updateNewUserState",false)
        // console.log("User out")
      //  TODO: don't let user be in some other page beside Login
        this.$router.replace("/")
        this.$store.dispatch("updateProjectList",[])

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

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    Utils.onThemeChange(systemTheme)
    systemTheme.addEventListener("change",(theme)=>Utils.onThemeChange(theme))
  }


}



</script>
<style>
  html, body{
  height: 100%;
  background-color:#1C2831 !important;
  }
</style>
