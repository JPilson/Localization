<template>
    <v-flex style="position: fixed;z-index:200; width:100%;">
        <v-alert class="mx-5 mt-2" :value="toastTrigger" transition="scroll-y-transition" elevation="10">
          <v-layout align-center>
              <v-flex xs2  v-if="info.icon" >
                  <v-btn fab depressed :color="info.iconColor?info.iconColor:'#fff'">
                      <v-icon v-text="info.icon" color="#fff" />
                  </v-btn>
              </v-flex>
              <v-flex class="mx-2">
                  <TextView :text="info.title" size="18" bold  />
                  <TextView :text="info.message" />
              </v-flex>
              <v-flex class="d-flex justify-end align-center" v-if="notificationType ===NType.ToastAcknowledgment">
                <v-btn v-text="`ok`" text/>
              </v-flex>
          </v-layout>
        </v-alert>
    </v-flex>
</template>

<script lang="ts" >
    import {Vue,Component, Watch} from "vue-property-decorator";
    import TextView from "@/utils/UI/TextView/TextView.vue";
    import {NotificationModel} from "@/utils/UI/Toast/NotificationModel";
    import Notify, {notificationTypes} from "@/utils/UI/Toast/Notify";

    @Component({
        components: {TextView}
    })

    export default class NotificationComponent extends Vue {
        private NType  =  notificationTypes;
        private toastTrigger:boolean = false;
        private bottomDialogTrigger:boolean = false;

        get trigger():boolean{
            return this.$store.getters.notificationState.trigger;
        }
        get notificationType(){
            return this.$store.getters.notificationState.type;
        }
        get info():NotificationModel{
            return this.$store.getters.notificationState;
        }

        mounted() {
            // setTimeout(() =>{this.toastTrigger = true;},10000);
        }



        @Watch('trigger')
        onPropertyChanged(flag:boolean,oldFlag:boolean){

            if(!flag){
                this.toastTrigger = false;
                this.bottomDialogTrigger = false;
            }else{
                if(this.notificationType === this.NType.ToastAcknowledgment || this.notificationType === this.NType.Toast )
                    this.toastTrigger = true;
                else if(this.notificationType === this.NType.confirmationDialog)
                    this.bottomDialogTrigger = true;

            }
            setTimeout(()=>Notify.dismiss(),this.info.duration);

        }


    }
</script>

<style scoped>

</style>