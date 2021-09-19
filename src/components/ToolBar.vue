<template>
  <div>
    <v-app-bar app :color="colors.background"  flat>
      <v-btn v-if="ShowBackBtn" depressed rounded color="transparent" @click="onBackPressed">
        <SIcon icon="arrow_left" :color="colors.primaryText" size="16" />
        <TextView text="Back" :color="colors.primaryText" />
      </v-btn>
      <v-flex d-flex>
        <!--          <TextView text="Projects  " bold/>-->
        <!--          <box-icon type="regular" class="mx-2" name="chevron-right" :color="colors.primaryText"/>-->
        <!--          <TextView text="EncDaJob" size="12"/>-->
      </v-flex>
      <v-spacer />
      <vs-avatar  size="30" badge badge-color="success" >
        <img :src="user.photoURL" alt="">
      </vs-avatar>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import SIcon from "@/utils/UI/Sicon/SIcon.vue";
import TextView from "@/utils/UI/TextView/TextView.vue";
import {UserModelInterface} from "@/models/User";

@Component({
  components: {TextView, SIcon},
})
export default class ToolBar extends Vue {

  onBackPressed():void{

    window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/home");
  }
  get ShowBackBtn():boolean {
    return this.$route.name !== "Home"
  }
  get user():UserModelInterface {
    return  this.$store.getters.user
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