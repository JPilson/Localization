<template>
  <div>
    <!--    <LocalAdderDialog />-->
    <vs-dialog v-model="addLocalDialogActivator" dark color="red">

      <template #header>
        <h4 class="not-margin">
          Add a new Local fro your project
          {{ selectedLocal }}
        </h4>
      </template>
      <v-flex d-flex flex-column align-center>
        <vs-select
            placeholder="Select your new Local"
            v-model="selectedLocal"

        >
          <vs-option v-for="(local,index) in locals" :key="`index_${index}`" :label="local.name" :value="index+1">
            <TextView :text="local.name" bold/>

          </vs-option>

        </vs-select>

        <v-flex class="mt-3">
          <vs-button :color="colors.background" relief class="" block size="30" @click="addLocal(selectedLocal-1)">
            <SIcon icon="plus_medical" :color="colors.primaryText" size="16"/>
            <TextView text="Local" class="mx-2"/>
          </vs-button>
        </v-flex>
      </v-flex>


    </vs-dialog>
    <!--    Exporter Dialog-->
    <vs-dialog v-model="exporterDialogActivator" dark color="red">
      <template #header>
        <TextView style="max-width: 300px; text-align: center"
                  :text="`Export your\nLocalized files and start Using them into your Project`" bold size="18"
                  class="pt-5">
        </TextView>
      </template>
      <v-layout row wrap align-center justify-center class="ma-5">
        <vs-button :loading="option.isExporting" :disabled="disableBtn && !option.isExporting" @click="exportToFile(option,index)" shadow v-for="(option,index) in exportOptions" :key="`ex_op${index}`"
                   :color="option.iconColor?option.iconColor:'#000'"
                   style="height: 150px;width:200px; background: #f3f3f3">
          <v-flex style="display: grid; place-items: center">
            <SIcon :icon="option.icon" :color="option.iconColor?option.iconColor:'black'" size="50" class="py-3"/>
            <TextView :text="option.label" bold size="14" style="max-width: 110px; text-align: center" color="black"/>
          </v-flex>
        </vs-button>
      </v-layout>
    </vs-dialog>

    <v-flex d-flex class="my-5" style="">
      <v-btn :loading="addingKeyLoader" :disabled="disableBtn && !addingKeyLoader" @click="addKey"
             :color="colors.background" depressed
             :style="`border: dashed 0.8px ${colors.primaryText}`"
      >
        <SIcon icon="plus_medical" :color="colors.primaryText" size="16" pull="left"/>
        <TextView :color="colors.primaryText" text="key" class="mx-2" size="12"/>
      </v-btn>
      <div class="mx-5">
        <v-btn depressed :color="colors.background" :loading="isAddingLocal" :disabled="disableBtn && !isAddingLocal "
               @click="addLocalDialogActivator = !addLocalDialogActivator"
               :style="`border: dashed 0.8px ${colors.primaryText}`">
          <SIcon icon="plus_medical" :color="colors.primaryText" size="16"/>
          <TextView :color="colors.primaryText" text="Local/Language" class="mx-2" size="12" transform="capitalize" bold
                    spacing="0.1"/>
        </v-btn>
      </div>

      <div class="mx-5">
        <v-btn depressed :color="colors.background" :loading="isSynchronizing"
               :disabled="disableBtn && !isSynchronizing " @click="syncToDB"
               :style="`border: dashed 0.8px ${colors.primaryText}`">
          <SIcon icon="sync" :color="`#00cd76`" size="20"/>
          <TextView :color="colors.primaryText" text="sync" class="mx-2" size="12" transform="capitalize" bold
                    spacing="0.1"/>
        </v-btn>
      </div>

      <div class="mx-5">
        <v-btn depressed :color="colors.background" :loading="isAddingLocal" :disabled="disableBtn && !isAddingLocal "
               @click="exporterDialogActivator = !exporterDialogActivator"
               :style="`border: dashed 0.8px ${colors.primaryText}`">
          <SIcon icon="dashboard" :color="colors.primaryText" size="16"/>
          <TextView :color="colors.primaryText" text="export" class="mx-2" size="12" transform="capitalize" bold
                    spacing="0.1"/>
        </v-btn>
      </div>
    </v-flex>
    <v-simple-table dense style="background: transparent; margin: 0;padding: 0" class="localTable">
      <template v-slot:default>
        <thead>
        <tr>
          <th v-for="(item, index) in items" :key="`st_${index}`">
            <LinearLayout :background-tint="item.isKey? colors.keyColumn : colors.card" rounded-corners="5"
                          class="mx-2">
              <v-flex d-flex flex-column class="my-2">
                <v-flex d-flex justify-space-between>
                  <v-btn x-small rounded depressed color="transparent" v-if="!item.isKey">
                    <BIcon name="expand-alt"/>
                  </v-btn>

                  <v-spacer/>

                  <TextView :color="colors.primaryText" style="text-align: center!important;"
                            :text="`${item.local.code} ${item.isDefault?'(default)':''}`"/>


                  <v-spacer/>
                  <v-btn v-if="!item.isDefault && !item.isKey" x-small rounded depressed color="transparent"
                         @click="removeLocal(index)">
                    <BIcon name="x"/>
                  </v-btn>

                </v-flex>
                <v-flex d-flex justify-center>
                  <TextView :color="colors.primaryText" :text="item.local.name" bold size="12"/>
                </v-flex>
              </v-flex>

            </LinearLayout>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td v-for="(item, indexP) in items" :key="`st_data_${indexP}`">
            <v-list dense :style="{background:colors.background}"
                    style="border-right: 1px solid rgba(255,255,255,0.05)">

              <v-list-item>
                <v-list-item-content>
                  <div class="d-flex" :key="`key_${keyIndex}`" v-for="(key,keyIndex) in item.keys">
                    <vs-input
                        dark
                        block
                        class="mt-5"
                        :state="isDark?'dark':'light'"

                        v-model="key.value"

                        :label-placeholder="key.label"/>
                    <v-flex xs1>
                      <v-btn icon color="red" v-if="item.isKey " :loading="isRemovingKey"
                             :disabled="disableBtn && !isRemovingKey" class="mt-4 ml-2" @click="removeKey(keyIndex)">
                        <SIcon icon="trash"/>
                      </v-btn>
                    </v-flex>
                  </div>
                  <!--                  <v-text-field v-for="(key,index) in item.keys" :label="key.label"  :key="`key_${index}`" v-model="key.value" outlined :dark="isDark"  height="15" :color="colors.primaryText" autocomplete="off"/>-->

                </v-list-item-content>

              </v-list-item>
            </v-list>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, PropSync} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import BIcon from "@/utils/UI/BIcon/BIcon.vue";
import LocalAdderDialog from "@/components/LocalAdderDialog.vue";
import LinearLayout from "@/utils/UI/LinearLayout/LinearLayout.vue";
import Utils, {FileType} from "@/utils/Utils";
import {languageList, LanguageModelInterface} from "@/models/Language";
import {Key, ProjectLocal, ProjectModelInterface} from "@/models/Project";
import SIcon, {iconNames} from "@/utils/UI/Sicon/SIcon.vue";
import APiHelper from '@/api/APiHelper';

// export interface LocalKey {
//   value:string,
//   label?:string
// }
// export interface TableItemModel {
//   local: LanguageModelInterface
//   isDefault?: boolean
//   isKey?: boolean,
//   isExpanded?: boolean,
//   keys: Array<LocalKey>
// }

interface ExportOption {
  label: string
  icon: iconNames
  iconColor: string | null
  code: FileType,
  isExporting:boolean
}

/**
 * button:
 about: About
 back: Back
 go: GO
 home: Home
 toggle_dark: Toggle dark mode
 toggle_langs: Change languages
 intro:
 desc: Opinionated Vite Starter Template
 dynamic-route: Demo of dynamic route
 hi: Hi, {name}!
 aka: Also known as
 whats-your-name: What's your name?
 not-found: Not found

 [
 {value: "about", label: "key"},
 {value: "back", label: "key"},
 {value: "go", label: "key"},
 {value: "home", label: "key"},
 {value: "toggle_dark", label: "key"},
 {value: "toggle_langs", label: "key"},
 {value: "desc", label: "key"}

 ]
 [
 {value: "About", label: "Trans"},
 {value: "Back", label: "Trans"},
 {value: "GO", label: "Trans"},
 {value: "Home", label: "Trans"},
 {value: "Toggle dark mode", label: "Trans"},
 {value: "Change languages", label: "Trans"},
 {value: "Opinionated Vite Starter Template", label: "Trans"}


 ]
 */

@Component({
  components: {SIcon, LinearLayout, LocalAdderDialog, BIcon, TextView},
})
export default class LocalTable extends Vue {
  exporterDialogActivator = false
  addLocalDialogActivator = false
  selectedLocal = 0;

  exportOptions: Array<ExportOption> = [
    {label: "Export for Android Studio", icon: "android", iconColor: "#0dde80", code: FileType.android, isExporting:false},
    {label: "Export as YML for WebApp (i18)", icon: "yml", iconColor: null, code: FileType.yaml,isExporting:false},
    // {label: "Export as XML", icon: "xml", iconColor: null, code: FileType.xml},
    {label: "Export as JSON", icon: "json", iconColor: null, code: FileType.json,isExporting:false},
  ]
  @PropSync("languages", {required: true}) items!: Array<ProjectLocal>
  @PropSync("project", {required: true}) projectInfo!: ProjectModelInterface
  // public items: Array<ProjectLocal> = [
  //   {local: {name: "Key", code: "-"}, isKey: true, keys: [{value: "about", label: "key"},
  //       {value: "back", label: "key"},
  //       {value: "go", label: "key"},
  //       {value: "home", label: "key"},
  //       {value: "toggle_dark", label: "key"},
  //       {value: "toggle_langs", label: "key"},
  //       {value: "desc", label: "key"}]},
  //   {local: {name: "English", code: "en"}, isDefault: true, keys: [
  //       {value: "About", label: "Trans"},
  //       {value: "Back", label: "Trans"},
  //       {value: "GO", label: "Trans"},
  //       {value: "Home", label: "Trans"},
  //       {value: "Toggle dark mode", label: "Trans"},
  //       {value: "Change languages", label: "Trans"},
  //       {value: "Opinionated Vite Starter Template", label: "Trans"}
  //
  //
  //     ]}
  // ]
  public locals: Array<LanguageModelInterface> = languageList
  public addingKeyLoader = false
  public disableBtn = false
  public isAddingLocal = false
  public isRemovingKey = false
  public isRemovingLocal = false
  public isSynchronizing = false

  async addKey(): Promise<void> {
    try {
      this.addingKeyLoader = true
      this.disableBtn = true
      await this.items.forEach((item) => item.keys.unshift({value: "", label: item.isKey ? "key" : "Trans"}))
      setTimeout(() => this.addingKeyLoader = false, 1000)
    } catch (e) {
      //  TODO: handle error on removing key
    } finally {
      this.disableBtn = false
      this.addingKeyLoader = false
    }
  }

  async addLocal(localIndex: number): Promise<void> {
    try {
      if (localIndex < 1) // The localIndex will always start with value 0 even when there is nothing selected: So the paramenter is increased by 1 to avoid adding local without actually selecting the local
        return

      const local = this.locals[localIndex]
      this.disableBtn = true
      this.isAddingLocal = true
      const keys: Array<Key> = []
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const key in this.items[0].keys)
        keys.push({value: "", label: "Trans"})

      this.items.push({
        local: local, keys: keys
      })
    } catch (e) {
      //  TODO: Something went wrong
      console.log(e)
    } finally {
      setTimeout(() => {
        this.disableBtn = false
        this.isAddingLocal = false
      }, 1000)
    }
  }

  async exportToFile(option: ExportOption,index:number): Promise<void> {
    try { // Utils.convertToYAMLProperties(this.items[0],this.items[1])
      // Utils.convertToAndroidStrings(this.items[0],this.items[1])
      // Utils.jsonFormat(this.items[0],this.items[1])
      this.exportOptions[index].isExporting = true
      this.disableBtn = true

      if (option.code === FileType.android) {
        const fileData = await this.prepareForAndroid()
        await Utils.convertToZip(fileData, `${this.projectInfo.title}_android_localized`);
        return
      }

      if (option.code === FileType.yaml) {
        const fileData = await this.prepareForYML()
        await Utils.convertToZip(fileData, `${this.projectInfo.title}_yaml_localized`);
        return
      }

      if (option.code === FileType.json) {
        const fileData = await this.prepareForJSON()
        await Utils.convertToZip(fileData, `${this.projectInfo.title}_json_localized`);
        return
      }
    } catch (e) {
      console.log(e)
    }finally {
      setTimeout(()=>{
        this.exportOptions[index].isExporting = false
        this.disableBtn = false
      },2000)
    }


  }

  async prepareForAndroid(): Promise<Array<{ name: string, data: string }>> {
    const total = this.items.length
    let index = 1
    const files: Array<{ name: string, data: string }> = []
    while (index < total) {
      const file = await Utils.convertToAndroidStrings(this.items[0], this.items[index]);
      files.push(file)
      index++;
    }
    return files
  }
  async prepareForYML(): Promise<Array<{ name: string, data: string }>> {
    const total = this.items.length
    let index = 1
    const files: Array<{ name: string, data: string }> = []
    while (index < total) {
      const file = await Utils.convertToYAMLProperties(this.items[0], this.items[index]);
      files.push(file)
      index++;
    }
    return files
  }
  async prepareForJSON(): Promise<Array<{ name: string, data: string }>> {
    const total = this.items.length
    let index = 1
    let files = ""
    while (index < total) {
      const file = await Utils.jsonFormat(this.items[0], this.items[index],index==total);
      files += file;
      files +=(index == (total-1))?"":","
      index++;
    }

    return [{name:`${this.projectInfo.title}_local${FileType.json}`,data:"{\n "+files+"}"}]
  }


  removeLocal(localTransIndex: number): void {
    try {
      this.disableBtn = true
      this.isRemovingLocal = true
      this.items.splice(localTransIndex, 1);
    } catch (e) {
      //  Todo: handle error on removing Local
    } finally {
      setTimeout(() => {
        this.disableBtn = false
        this.isRemovingLocal = false
      }, 1000)
    }
  }

  removeKey(keyIndex: number): void {
    try {
      this.isRemovingKey = true
      this.disableBtn = true
      let itemIndex = 0

      while (itemIndex <= this.items.length - 1) {
        // console.log(`Item ${itemIndex}`, this.items[itemIndex].keys)
        this.items[itemIndex].keys.splice(keyIndex, 1)
        itemIndex++
      }
    } catch (e) {
      //  TODO: Handle error while removing key
      console.log()
      console.log(e)
    } finally {
      setTimeout(() => {
        this.isRemovingKey = false
        this.disableBtn = false
      }, 100)
    }
  }

  async syncToDB(): Promise<void> {
    try {
      this.isSynchronizing = true
      this.disableBtn = true
      const api = new APiHelper()
      await api.updateProject(this.projectInfo).then((result) => {
        console.log(result)
      })
    } catch (e) {
      //  Sometghing went wrong
      console.log(e)
    } finally {
      this.isSynchronizing = false
      this.disableBtn = false
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
.localTable {
  td {
    padding: 0!important;
    min-width: 200px !important;


  }

  th {
    padding: 0!important
  }

  td {
    min-width: 200px !important;
    background-color: #309696;
  }

  .classKey {
    background: red;
  }
}

</style>