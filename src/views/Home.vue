<template>
  <v-col class="mx-5" >

    <TextView text="Your Projects" :color="colors.primaryText" bold size="28" />

    <v-layout row-wrap class="my-10" jus>
      <ProjectCard v-for="(project,index) in projects " :key ="`project_${index}`" :project="project" />
      <ProjectRegister/>

    </v-layout>
    <div v-if="isGettingProjects" style="max-width: 30px; max-height: 30px">
      <LoadingBox/>
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {AppTheme, ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import BIcon from "@/utils/UI/BIcon/BIcon.vue";
import LinearLayout from "@/utils/UI/LinearLayout/LinearLayout.vue";
import LocalTable from "@/components/LocalTable.vue";
import SIcon from "@/utils/UI/Sicon/SIcon.vue";
import {languageList, LanguageModelInterface} from "@/models/Language";
import ProjectRegister from "@/components/ProjectRegister.vue";
import APiHelper from "@/api/APiHelper";
import {UserModelInterface} from "@/models/User";
import ProjectCard from "@/components/ProjectCard.vue";
import {ProjectModelInterface} from "@/models/Project";
import firebase from "firebase/compat";
import LoadingBox from "@/components/LoadingBox.vue";

@Component({
  components: {LoadingBox, ProjectCard, ProjectRegister, SIcon, LocalTable, LinearLayout, BIcon, TextView},
})
export default class Home extends Vue {

  isGettingProjects =  false
  async getUsersProjects(): Promise<void>{
    try {

      const uid = this.user.uid ?? firebase.auth().currentUser?.uid
      const api = new APiHelper()

      const result = await api.getProjects(uid);
      // console.log(result)
      if (result.error) {
        return
      }

      await this.$store.dispatch("updateProjectList", result.data)
    }  finally {
      this.isGettingProjects = false
    }

  }

  mounted():void {

    this.isGettingProjects = this.projects.length === 0
   setTimeout(()=>{
     if(this.projects.length === 0)
       this.getUsersProjects()
   },2000)
  }
  
  get projects(): Array<ProjectModelInterface> {
    return  this.$store.getters.projects
  }
  get user(): UserModelInterface {
    return this.$store.getters.user
  }

  get colors(): ColorType {
    return this.$store.getters.colors;
  }

  get strings(): LanguageType {
    return this.$store.getters.strings;
  }

  get isDark(): boolean {
    return this.$store.getters.isDark;
  }
  get theme():AppTheme {
    return  this.$store.getters.theme
  }
}
</script>

}
<style lang="scss">
  .dash-border {
    border: dashed 0.3px  white;

  }
</style>