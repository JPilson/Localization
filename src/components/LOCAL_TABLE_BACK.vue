<template>
  <div>
    <!--    <v-data-iterator :items="items" item-key="columnName">-->
    <!--      <template v-slot:default="{items,isExpanded}">-->
    <!--        <v-row>-->
    <!--          <v-col v-for="(item, index) in items" :key="item.local.name" cols="6" sm="6" md="4" lg="3">-->
    <!--            <v-card flat :color="colors.card" rounded>-->
    <!--              <v-flex d-flex flex-column>-->
    <!--                <v-flex d-flex justify-space-between>-->
    <!--                  <v-btn x-small rounded depressed color="transparent" v-if="!item.isKey">-->
    <!--                    <BIcon name="expand-alt"/>-->
    <!--                  </v-btn>-->

    <!--                  <v-spacer/>-->
    <!--                  <v-flex d-flex justify-center>-->
    <!--                    <TextView align="center" :text="item.local.code"/>-->
    <!--                    <TextView align="center" text="(default)" v-if="item.isDefault"/>-->
    <!--                  </v-flex>-->
    <!--                  <v-spacer/>-->
    <!--                  <v-btn v-if="!item.isDefault && !item.isKey" x-small rounded depressed color="transparent" @click="removeLocal(index)">-->
    <!--                    <BIcon name="x"/>-->
    <!--                  </v-btn>-->

    <!--                </v-flex>-->
    <!--                <v-flex d-flex justify-center py-2>-->
    <!--                  <TextView :text="item.local.name" bold size="12"/>-->
    <!--                </v-flex>-->
    <!--              </v-flex>-->
    <!--              <v-list v-if="!isExpanded(item)" dense :style="{background:colors.background}"-->
    <!--                      style="border-right: 1px solid rgba(255,255,255,0.05)">-->
    <!--                <v-list-item>-->
    <!--                  <v-list-item-content>-->
    <!--                    <vs-input-->
    <!--                        dark-->
    <!--                        block-->
    <!--                        class="mt-5"-->
    <!--                        state="dark"-->
    <!--                        :key="`key_${index}`"-->
    <!--                        v-model="key.value"-->
    <!--                        v-for="(key,index) in item.keys"-->
    <!--                        :label-placeholder="key.label"/>-->
    <!--                    &lt;!&ndash;                  <v-text-field v-for="(key,index) in item.keys" :label="key.label"  :key="`key_${index}`" v-model="key.value" outlined :dark="isDark"  height="15" :color="colors.primaryText" autocomplete="off"/>&ndash;&gt;-->
    <!--                    <v-flex v-if="item.isKey" class="mt-2">-->
    <!--                      <v-btn :loading="addingKeyLoader" @click="addKey" block :color="colors.background" depressed-->
    <!--                             style="border: dashed 0.8px  rgba(255,255,255,0.17)">-->
    <!--                        <BIcon name="plus-medical" pull="left"/>-->
    <!--                        <TextView text="key" class="mx-2" size="12"/>-->
    <!--                      </v-btn>-->
    <!--                    </v-flex>-->
    <!--                  </v-list-item-content>-->

    <!--                </v-list-item>-->
    <!--              </v-list>-->
    <!--            </v-card>-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--      </template>-->

    <!--    </v-data-iterator>-->
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
export default class LOCAL_TABLE_BACK extends Vue {

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