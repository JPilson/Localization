<template>
  <v-col class="mx-5" >

    <TextView text="Your Projects" :color="colors.primaryText" bold size="28" />

    <v-layout row-wrap class="my-10" jus>
      <vs-button style="background: transparent; padding: 0!important;" :shadow="false"  >
        <LinearLayout rounded-corners="15" background-tint="rgba(224,255,205,0.46)">
          <v-flex class="px-5 py-10" style="display: grid; place-items: center">
            <LinearLayout class="pa-2 my-2" :background-tint="`rgba(0,0,0,0.13)`" rounded-corners="4">
              <SIcon icon="translation" :color="`rgba(224,255,205,0.80)`"/>
            </LinearLayout>
            <TextView text="Project Title" bold size="18" :color="colors.primaryText"/>
            <TextView :text="`localized for\n3 Regions`" size="12" :color="colors.primaryText"/>
          </v-flex>
          <LinearLayout style="display: grid; place-items: center" :background-tint="`rgba(0,0,0,0.13)`"
                        radius-bottom-left="15" class="py-3" radius-bottom-right="15">
            <TextView text="Invite contributors" :color="colors.primaryText" size="12"/>
          </LinearLayout>
        </LinearLayout>
      </vs-button>
      <ProjectRegister/>

    </v-layout>
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

@Component({
  components: {ProjectRegister, SIcon, LocalTable, LinearLayout, BIcon, TextView},
})
export default class Home extends Vue {



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