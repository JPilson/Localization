import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import Colors, {AppTheme, ColorType} from "@/values/Colors";
import Strings, {LanguageType} from "@/values/Strings";
import {UserModelInterface} from "@/models/User";
import {ProjectModelInterface} from "@/models/Project";


const theme:AppTheme = AppTheme.dark

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    theme: theme as AppTheme,
    values:{
      colors:Colors[theme],
      strings:Strings.pt
    },
    isSessionActive:false as boolean,
    userInfo:null as UserModelInterface | null,
    isNewUser:false,
    projects:[] as Array<ProjectModelInterface>
  },
  mutations: {
    changeAppTheme (state,selectedTheme:AppTheme){
      state.theme = selectedTheme
      state.values.colors = Colors[selectedTheme]
    },
    updateSession(state,payload: { user:UserModelInterface | null }){
      // console.log(`state is ${payload}`)
      state.isSessionActive = !!payload.user;
      state.userInfo = payload.user;
    },
    updateNewUserState(state,payload){
      state.isNewUser = payload
    },
    updateProjectList(state,payload){
      state.projects.unshift(...payload);

    },


  },
  actions: {
    changeAppTheme(context:ActionContext<any, any>,payload:AppTheme){
      context.commit("changeAppTheme",payload)
    },
    updateSession(context: ActionContext<any, any>,payload) {
      context.commit("updateSession",payload)
    },updateNewUserState (context: ActionContext<any, any>,payload) {
      context.commit("updateNewUserState",payload)
    },
    updateProjectList( context: ActionContext<any, any>,payload) {
      context.commit("updateProjectList",payload)
    }

  },
  modules: {
  },
  getters :{
    colors(state):ColorType{
      return state.values.colors;
    },
    strings(state):LanguageType{
      return state.values.strings as LanguageType;
    },
    isDark(state):boolean {

      return state.theme == AppTheme.dark
    },
    theme(state):AppTheme {
      return state.theme
    },
    user(state):UserModelInterface | null {
      return state.userInfo
    },
    session(state):boolean {
      return  state.isSessionActive
    },
    isNewUser(state):boolean {
      return  state.isNewUser
    },
    projects(state):Array<ProjectModelInterface>{
      return  state.projects
    }

  }

})
