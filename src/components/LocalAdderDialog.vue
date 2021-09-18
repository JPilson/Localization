<template>
    <div class="center">
      <button @click="active=!active">
        active
      </button>
      <vs-dialog  v-model="active" dark color="red">
        <template #header>
          <h4 class="not-margin">
           Add a new Local fro your project
          </h4>
        </template>
        <v-flex d-flex justify-center>
          <vs-select
              placeholder="Select your new Local"
              v-model="selectedLocal"
          >
            <vs-option label="Vuesax" value="1">
              one
            </vs-option>
          </vs-select>
        </v-flex>


      </vs-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";

@Component({
  components: {},
})
export default class LocalAdderDialog extends Vue {
  active = true
  selectedLocal = ""

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