<template>

    <v-navigation-drawer app class="mx-auto"  :color="colors.card">
      <v-list-item class="mt-10">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <TextView text="Localize" :color="colors.primaryText" size="18" bold />
          </v-list-item-title>
          <v-list-item-subtitle>
            <TextView text=" Get you app global" :color="colors.primaryText" />

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


      <v-divider></v-divider>

      <v-list  rounded>
        <v-list-item v-for="item in menuItem" :key="item.label" link
        >
          <v-list-item-icon>
            <SIcon :icon="item.icon" :color="colors.primaryText" />
          </v-list-item-icon>

          <v-list-item-content>
            <TextView :text="item.label" :color="colors.primaryText" bold />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer/>

      <template v-slot:append>
        <v-col  class="d-flex flex-column align-center">
          <vs-switch success :dark="true" v-model="themeSelector" :style="`background: ${colors.background};height:40px; width:210px`" >
            <template #circle>
              <SIcon icon="contrast" />
            </template>
            <template #off>
              <TextView text="Dark Theme" :color="colors.primaryText" />
            </template>
            <template #on>
              <TextView text="Light Theme" :color="colors.primaryText" />
            </template>
          </vs-switch>

          <vs-button block style="background: #ff2f79; height: 50px" class="mt-4" shadow @click="sinOut" >
            <TextView text="Sign Out" bold size="14" color="white"/>
          </vs-button>
        </v-col>

      </template>
    </v-navigation-drawer>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from "vue-property-decorator";
import {AppTheme, ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import SIcon, {iconNames} from "@/utils/UI/Sicon/SIcon.vue";
import BIcon from "@/utils/UI/BIcon/BIcon.vue";
import store from "@/store";
import firebase from "firebase/compat";

@Component({
  components: {BIcon, SIcon, TextView},
})
export default class SideBar extends Vue {
  themeSelector = true

  menuItem = [
    {icon:"dashboard" as iconNames,label:"Project"},
    {icon:"settings" as iconNames,label:"History"},

  ]

  @Watch('themeSelector',{immediate:true,deep:true})
  onThemeSelected(active:boolean):void{
      this.$store.dispatch("changeAppTheme",active?AppTheme.dark:AppTheme.light ).then()
  }
  sinOut():void {
    firebase.auth().signOut()
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