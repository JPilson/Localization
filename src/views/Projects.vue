<template>
  <v-col >
    <v-flex class="d-flex justify-left">
      <v-flex>
        <TextView text="EncDaJob" size="24" bold/>
      </v-flex>
      <v-spacer/>
      <v-flex class="d-flex justify-right align-right">
        <v-spacer/>
        <v-btn depressed :color="colors.card" style="border-radius: 8px">
          <BIcon name="plus-medical" :color="colors.primaryText" />
          <TextView text="Export" class="mx-2" size="12" transform="capitalize" bold spacing="0.1"/>
        </v-btn>
      </v-flex>
    </v-flex>

    <v-flex class="d-flex mt-5" >
      <LinearLayout :background-tint="colors.card" rounded-corners="8"  >
        <div  class="py-5 px-12">
          <BIcon name="world" size="lg"/>
          <TextView text="3 Local"/>
        </div>
      </LinearLayout>

      <LinearLayout :background-tint="colors.card" rounded-corners="8" class="mx-2"  >
        <div  class="py-5 px-12">
          <BIcon  name="world" size="lg"/>
          <TextView text="3 Local"/>
        </div>
      </LinearLayout>


    </v-flex>
    <v-flex class="d-flex justify-space-between">
<!--      <v-flex class="my-5" style="">-->
<!--        <v-btn depressed :color="colors.background"-->
<!--               style="border-radius: 8px; border: dashed 0.3px  white; " >-->
<!--          <BIcon name="plus-medical"/>-->
<!--          <TextView text="Local/Language" class="mx-2" size="12" transform="capitalize" bold spacing="0.1"/>-->
<!--        </v-btn>-->
<!--    </v-flex>-->
      <v-spacer/>
      <v-flex d-flex >
        <v-spacer/>
        <v-btn depressed :color="colors.background"
               style="border-radius: 8px; border: dashed 0.3px  white; " >
          <BIcon name="plus-medical"/>
          <TextView text="Invite" class="mx-2" size="12" transform="capitalize" bold spacing="0.1"/>
        </v-btn>
      </v-flex>
    </v-flex>
    <LocalTable></LocalTable>

  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import BIcon from "@/utils/UI/BIcon/BIcon.vue";
import LinearLayout from "@/utils/UI/LinearLayout/LinearLayout.vue";
import LocalTable from "@/components/LocalTable.vue";

@Component({
  components: {LocalTable, LinearLayout, BIcon, TextView},
})
export default class Projects extends Vue {

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
<style lang="scss">
  .dash-border {
    border: dashed 0.3px  white;

  }
</style>