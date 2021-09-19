<template>

    <div style="background: black"
         :ref="`box_loader`"
       />

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";

@Component({
  components: {},
})
export default class LoadingBox extends Vue {

  vs = Vue.prototype.$vs;
  hasOpenLoading = false
  types = [
    'default',
    'waves',
    'corners',
    'border',
    'points',
    'square',
    'gradient',
    'rectangle',
    'circles',
    'square-rotate',
    'scale'
  ]

  handleClickLoading(type: any): void {

    const loading = this.vs.loading({
      type
    })
    this.hasOpenLoading = true
    setTimeout(() => {
      loading.close()
      this.hasOpenLoading = false
    }, 3000)
  }

  openLoading(): void {

    this.vs.loading({
      target: this.$refs["box_loader"],
      text: "Wait",
      type:"points"
    })
  }
  openNotification():void {
    this.vs.notification({
      position:"top-right",
      title: 'Welcome to Localization',
      text: `This App still under development so if you find something weird just let me know `
    })
  }
  openLoadingView():void {
    const loading = this.vs.loading()
    setTimeout(() => {
      loading.close()
    }, 3000)
  }

  mounted(): void {
    this.openNotification()
    this.openLoading()
    // this.types.forEach((type, i) => {
    //   this.openLoading(type, `box${i}`)
    // })
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