<template>
  <vs-button :style="`background: ${projectInfo.themeColor}99; padding: 0!important;`" shadow color="none" @click="navigateToProjectView">
    <v-flex >
      <v-flex class="px-5 py-10" style="display: grid; place-items: center">
        <LinearLayout class="pa-2 my-2" :background-tint="`rgba(0,0,0,0.13)`" rounded-corners="4">
          <SIcon icon="translation" :color="projectInfo.themeColor"/>
        </LinearLayout>
        <TextView :text="projectInfo.title" bold size="18" :color="colors.primaryText"/>
        <TextView :text="`localized for\n${projectInfo.localization.length - 1} Regions`" size="12" :color="colors.primaryText"/>
      </v-flex>
<!--      <LinearLayout style="display: grid; place-items: center" :background-tint="`rgba(0,0,0,0.13)`"-->
<!--                    radius-bottom-left="15" class="py-3" radius-bottom-right="15">-->
<!--        <TextView text="Invite contributors" :color="colors.primaryText" size="12"/>-->
<!--      </LinearLayout>-->
    </v-flex>
  </vs-button>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, PropSync} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import LinearLayout from "@/utils/UI/LinearLayout/LinearLayout.vue";
import SIcon from "@/utils/UI/Sicon/SIcon.vue";
import TextView from "@/utils/UI/TextView/TextView.vue";
import {ProjectModelInterface} from "@/models/Project";

@Component({
  components: {TextView, SIcon, LinearLayout},
})
export default class ProjectCard extends Vue {

  @PropSync("project",{required:true}) projectInfo!: ProjectModelInterface

  navigateToProjectView():void {
    this.$router.push(`/project/view/${this.projectInfo.ref}`);
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
}
</script>


}