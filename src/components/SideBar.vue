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
    </v-navigation-drawer>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import SIcon, {iconNames} from "@/utils/UI/Sicon/SIcon.vue";

@Component({
  components: {SIcon, TextView},
})
export default class SideBar extends Vue {

  menuItem = [
    {icon:"dashboard" as iconNames,label:"Project"},
    {icon:"settings" as iconNames,label:"History"},

  ]

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