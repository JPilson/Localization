<template>
  <div :class="`pt-${pt}`" >
    <div v-if="pullToRefresh" class="free-trigger-page">
      <!--    <ToolBar :name="toolBarTitle" />-->
      <EasyRefresh
          ref="easyRefresh"
          :userSelect="true"
          :onRefresh="onRefresh"
          :loadMore="loadMore"
          :load-finished="loadFlag"
          style="position: absolute"
      >
        <slot  ></slot>

      </EasyRefresh>
    </div>
    <div v-else class="free-trigger-page">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Constants from "@/values/Constants";

import EasyRefresh from "@/utils/UI/EasyRefresh/EasyRefresh/EasyRefresh.vue"
import ClassicsHeader from "@/utils/UI/EasyRefresh/header/ClassicsHeader/ClassicsHeader.vue"
import {Component, Prop, Vue} from "vue-property-decorator";
import ToolBar from "@/components/ToolBar/ToolBar.vue";

@Component({
  components: {
    ToolBar,
    EasyRefresh,
    ClassicsHeader
  },
})


export default class LayoutContainer extends Vue {

  private easyRefresh!: EasyRefresh
  private itemCount: number = 20
  private loadFlag:boolean = false

  @Prop({default: false})
  private horizontalOrientation!: boolean

  @Prop({default: true})
  private autoLoad!: boolean

  @Prop({default: 8})
  private pt!: number
  @Prop({default: ""})
  toolBarTitle!:string
  @Prop()
  private onRefresh!: (done: () => void) => void

  @Prop({default:true})
  pullToRefresh!:boolean

  onReload() {
    this.$emit("reload")

  }



  private loadMore(done: (noMore: boolean) => void) {
    // setTimeout(() => {
    //   if (this.itemCount >= 40) {
    //     done(true)
    //   } else {
    //     this.itemCount += 10
    //     done(false)
    //   }
    // }, 1000)
  }

  // 刷新
  private callRefresh() {
    this.easyRefresh.callRefresh()
  }

  // 加载
  private callLoadMore() {
    this.easyRefresh.callLoadMore()
  }

  mounted() {
    this.easyRefresh = this.$refs.easyRefresh as EasyRefresh

  }
}
</script>

<style lang="scss">
.free-trigger-page {

  
  .free-trigger-list {
    width: 100%;
    height: calc(100% - 108px);
  }

  .free-trigger-btn-car {
    height: 48px;
    width: 100%;

    .free-trigger-btn {
      height: 48px;
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>