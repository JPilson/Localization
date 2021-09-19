<template>
  <v-col >
    <v-flex class="d-flex justify-left">
      <v-flex>
        <TextView :color="colors.primaryText" :text="project.title" size="38" bold/>
      </v-flex>
      <v-spacer/>
      <v-flex class="d-flex justify-right align-right">
        <v-spacer/>
        <v-btn depressed :color="colors.card" style="border-radius: 8px">
          <SIcon icon="plus_medical" :color="colors.primaryText" size="16" />
          <TextView :color="colors.primaryText" text="Export" class="mx-2" size="12" transform="capitalize" bold spacing="0.1"/>
        </v-btn>
      </v-flex>
    </v-flex>

    <v-flex class="d-flex mt-5" >
      <LinearLayout :background-tint="colors.card" rounded-corners="8"  >
        <div  class="py-5 px-12">
          <SIcon icon="world" size="48"/>
          <TextView :color="colors.primaryText" :text="`${project.localization.length - 1} Local`" bold class="my-2"/>
        </div>
      </LinearLayout>

      <LinearLayout :background-tint="colors.card" rounded-corners="8" class="mx-2"  >
        <div  class="py-5 px-12" style="display: grid; place-items: center; height: 100%">

          <TextView :color="colors.primaryText" :text="`Keys`" bold size="24"/>
          <TextView :color="colors.primaryText" :text="`${project.localization[0].keys.length } `" bold size="24"/>
        </div>
      </LinearLayout>


    </v-flex>
    <v-flex class="d-flex justify-space-between">
<!--      <v-flex class="my-5" style="">-->
<!--        <v-btn depressed :color="colors.background"-->
<!--               style="border-radius: 8px; border: dashed 0.3px  white; " >-->
<!--          <BIcon name="plus-medical"/>-->
<!--          <TextView :color="colors.primaryText" text="Local/Language" class="mx-2" size="12" transform="capitalize" bold spacing="0.1"/>-->
<!--        </v-btn>-->
<!--    </v-flex>-->
      <v-spacer/>
      <v-flex d-flex >
        <v-spacer/>
        <v-btn depressed :color="colors.background"
               style="border-radius: 8px; border: dashed 0.3px  white; " >
          <BIcon name="plus-medical"/>
          <TextView :color="colors.primaryText" text="Invite" class="mx-2" size="12" transform="capitalize" bold spacing="0.1"/>
        </v-btn>
      </v-flex>
    </v-flex>
    <LocalTable :languages="project.localization" :project="project"/>

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
import {ProjectLocal, ProjectModelInterface} from "@/models/Project";
import Utils, {dateFormats} from "@/utils/Utils";
import SIcon from "@/utils/UI/Sicon/SIcon.vue";

@Component({
  components: {SIcon, LocalTable, LinearLayout, BIcon, TextView},
})
export default class Projects extends Vue {

  mounted(): void {
    // console.log(this.$route.params['ref'])
  }
  get project():ProjectModelInterface  {
    const p =  (this.$store.getters.projects as Array<ProjectModelInterface>).find( element=> element.ref === this.$route.params['ref']);
    return p ?? {title:"",
      description:"",
      owner:"",
      contributors:[],
      localization:[
        {local:{name:"key",code:"key"},isKey:true,keys:[{label:"key",value:"app_name"}]}
      ],
      ref:null,
      createdOn:"",
      themeColor:""
    }
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
<style lang="scss">
  .dash-border-light {
    border: dashed 0.3px  white;
  }
  .dash-border-dark {
    border: dashed 0.3px  black;
  }
</style>