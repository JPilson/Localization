<template>
  <div  style="display: grid; justify-content: center; align-content: center">
    <box-icon
        :type="synced_type"
        :name="synced_name"
        :color="synced_color"
        :size="synced_size"
        :rotate="synced_rotate"
        :flip="synced_flip"
        :animation="synced_animation"
        :pull="synced_pull"
    />
  </div>

</template>

<script lang="ts">

import {Vue, Component,PropSync } from 'vue-property-decorator';

enum  typeEnum {
  regular, solid , logo
}


@Component({
  components: {},
})
export default class BIcon extends Vue {

  get initialColor(){
    return this.$store.getters.colors.primaryText
  }

  @PropSync('type',{type:String,required:false, default:"regular"}) synced_type;
  @PropSync('name',{required:true}) synced_name!:string;

  @PropSync("color",{default:"white"}) synced_color;
  @PropSync("size",{default:"sm"}) synced_size!:"xs"|"sm"|"md"|"lg"|"cssSize"
  @PropSync("rotate") synced_rotate!:"90"|"180"|"270";
  @PropSync("flip") synced_flip!:"horizontal|vertical"
  @PropSync("border") borderSynced!:"square"|"circle" ;
  @PropSync("animation") synced_animation!:"spin"|"tada" ;
  @PropSync("pull") synced_pull: "left"|"right"
}
</script>


}