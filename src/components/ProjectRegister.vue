<template>
  <div>
    <vs-button :style="`background: ${colors.card}`"  shadow @click="projectRegisterDialogActivator = !projectRegisterDialogActivator" >
      <LinearLayout rounded-corners="15"  class="mx-2" >
        <v-flex class="px-5 py-10" style="display: grid; place-items: center">
          <LinearLayout class="pa-2 my-2" :background-tint="colors.background" rounded-corners="4">
            <SIcon icon="message_rounded_add" :color="colors.primaryText" class="pa-1"/>
          </LinearLayout>
          <TextView text="Create Project" bold size="18" :color="colors.primaryText"/>
          <TextView :text="`localized for\n3 Regions`" size="12" :color="colors.primaryText"/>
        </v-flex>
      </LinearLayout>
    </vs-button>
    <vs-dialog  v-model="projectRegisterDialogActivator" :dark="true" blur >
      <v-flex class="xs12 py-10" style="display: grid; place-items: center;">
        <v-flex>
          <vs-input style="color:black" label="Project name (eg: App name)" v-model="projectInfo.title" class="my-2" block/>
          <v-flex xs12 my-5>
            <TextView text="Colors" bold/>
            <v-flex d-flex class="my-2 xs12">
              <vs-button @click="onColorSelected(color)" size="" v-for="(color,index) in projectColors" :key="`project_color${index}`" circle icon
                         floating :color="color">
              </vs-button>
            </v-flex>
          </v-flex>
          <v-flex>
            <TextView text="Default Language" bold/>
            <vs-select color="black" placeholder="Select your new Local" v-model="selectedLocal">
              <vs-option v-for="(local,index) in locals" :key="`index_${index}`" :label="local.name" :value="index+1">
                <TextView :text="local.name" bold/>
              </vs-option>
            </vs-select>
          </v-flex>
          <vs-button block class="my-5" :style="`background:${selectedColor}99`" @click="registerProject">
            <TextView text="create project" bold />
          </vs-button>
        </v-flex>


      </v-flex>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import {languageList, LanguageModelInterface} from "@/models/Language";
import TextView from "@/utils/UI/TextView/TextView.vue";
import LinearLayout from "@/utils/UI/LinearLayout/LinearLayout.vue";
import SIcon from "@/utils/UI/Sicon/SIcon.vue";
import {ProjectModelInterface} from "@/models/Project";
import Utils, {dateFormats} from "@/utils/Utils";
import {UserModelInterface} from "@/models/User";
import APiHelper from "@/api/APiHelper";
import {errors} from "faunadb";

@Component({
  components: {SIcon, LinearLayout, TextView},
})
export default class ProjectRegister extends Vue {
  projectRegisterDialogActivator = false
  get User(): UserModelInterface {
    return this.$store.getters.user;
  }

  public projectColors = [
    "#FF7676","#D3FF76","#76F7FF","#7684FF","#FF76B8","#FF76F1","#AA76FF","#FFF176","#76FFA5"
  ]

  public projectInfo:ProjectModelInterface = {
    title:"",
    description:"",
    owner:"",
    contributors:[],
    localization:[
      {local:{name:"key",code:"key"},isKey:true,keys:[{label:"key",value:"app_name"}]}
    ],
    ref:null,
    createdOn:Utils.formatDate(new Date(),dateFormats.DDMMYYYYhhmmss),
    themeColor:this.projectColors[Utils.getRandomInt(this.projectColors.length)]
  };
  public locals: Array<LanguageModelInterface> = languageList;

  public  selectedLocal = 1

  public selectedColor = this.projectColors[Utils.getRandomInt(this.projectColors.length)]

  onColorSelected(color:string):void {
    this.projectInfo.themeColor = color
    this.selectedColor = color
  }
  
  @Watch("selectedLocal",{immediate:true})
  onDefaultLanguageSelected(languageSelected:number):void{
      this.projectInfo.localization[1] = {
        local:this.locals[languageSelected - 1],
        isDefault:true,
        isKey:false,
        keys:[{label:"key",value:"My App"}]

      }
  }
  
  async registerProject (): Promise<void> {
    this.projectInfo.owner = this.User.uid

      if(this.projectInfo.title.length <  2 ){
        alert("The Project Name is too short")
        return
      }
      
      const api  = new APiHelper()
     const result =  await api.registerProject(this.projectInfo);
      if(result.error){
        if(result.reason?.includes("not unique")){
          alert("You already have a project with this title")
        }
        return
      }
      this.projectInfo.ref = (result as unknown as ProjectModelInterface).ref;
      this.$store.dispatch("updateProjectList",[this.projectInfo]).then(()=>{
        this.projectRegisterDialogActivator = false
      })

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


