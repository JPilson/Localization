<template>
  <v-flex class="align-grid">
    <v-flex d-flex>
      <v-flex class=" xs6 ">
        <TextView class="mt-15 mx-10" :text="`Get your App ready\nFor any Language`" :color="colors.primaryText"
                  size="48" bold line-spacing="50"/>
        <v-img :src="illustration" aspect-ratio="1" :height="illustrationMaxSize" :width="illustrationMaxSize"/>
      </v-flex>

      <v-flex class="align-grid ">
        <v-stepper class="elevation-0" :value="screenSteps"
                   :style="`-webkit-box-shadow: none; box-shadow: none; background-color: transparent`">
          <v-stepper-items elevation-0>
            <v-stepper-content step="1">
              <LinearLayout :background-tint="colors.card" rounded-corners="15">
                <div class="align-grid mt-8">
                  <TextView text="Login options" bold size="30" :color="colors.primaryText"/>
                </div>
                <LinearLayout style="" horizontal-orientation class="mt-2 pa-5">
                  <vs-button :loading="option.isLoading" :active-disabled="option.disabled" :color="colors.background" v-for="(option,index) in loginOptions" :key="`btn_${index}`" block @click="option.callBack"
                             style="height: 150px; width: 180px; border-radius: 15px; box-shadow: 0 0 30px rgba(0,0,0,0.05) ">
                    <SIcon :icon="option.icon" :color="colors.primaryText" size="40"/>
                  </vs-button>

                </LinearLayout>
              </LinearLayout>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-flex class="ma-2 align-grid">
                <TextView text="Ola"/>
                <vs-avatar :loading="isRegisteringUser" size="70" badge badge-color="success" class="my-2">
                  <img :src="user.photoURL" alt="">
                </vs-avatar>
                <v-flex style="display: grid; place-items: center" class="mt-1 mb-3">
                  <TextView :text="user.displayName" bold size="18" :color="colors.primaryText"/>
                  <TextView :text="user.email" size="12" :color="colors.secondaryText"/>
                </v-flex>
                <vs-input :loading="isRegisteringUser" :state="theme" style="color:black" v-model="user.displayName" label="Your Name" placeholder="Name" class="my-2 mt-5"/>
                <vs-select :loading="isRegisteringUser" :filter="true" collapse-chips  :state="theme" placeholder="Select your new Local" v-model="userType" class="my-2">
                  <vs-option   :state="theme" v-for="(type,index) in userTypeList" :key="`index_${index}`" :label="type.label" :value="index+1">
<!--                    <TextView :text="type.label" bold/>-->
                    {{type.label}}
                  </vs-option>

                </vs-select>
                <vs-input :loading="isRegisteringUser" :state="theme" style="color:black" v-model="user.organizationName" placeholder="Company Name (Optional)"/>

                <vs-button block class="my-2" :loading="isRegisteringUser" @click="registerUserToFauna()">
                  <TextView text="done"/>
                </vs-button>
              </v-flex>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-flex>


  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from "vue-property-decorator";
import {AppTheme, ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import BIcon from "@/utils/UI/BIcon/BIcon.vue";
import firebase from "firebase/compat";
import {assets} from "@/assets/Assets";
import LinearLayout from "@/utils/UI/LinearLayout/LinearLayout.vue";
import SIcon from "@/utils/UI/Sicon/SIcon.vue";
import {UserModelInterface, UserTypeInfo} from "@/models/User";
import APiHelper from "@/api/APiHelper";

@Component({
  components: {SIcon, LinearLayout, BIcon, TextView},
})
export default class Login extends Vue {
  screenSteps = 1
  isRegisteringUser = false
  userTypeList:Array<UserTypeInfo> = [{type:"dev",label:"I'm a developer"},{type:"fr_dev",label:"I'm a Freelancer Dev"},{type:"no_dev",label:"I'm not Dev"}]
  userType  = 1
  user: UserModelInterface = {
    displayName: "",
    organizationName:"",
    email:"",
    phoneNumber:"",
    photoURL:"",
    providerId:"",
    uid:"",
    type:{type:"dev",label:"I'm a developer"},
    userTypeCode:"dev"

  }

  loginOptions =  [
    {icon:"github",disabled:false,isLoading:false,callBack:()=>this.loginWithGithub()},
    {icon:"googleColored",disabled:false,isLoading:false,callBack:()=>this.loginWithGoogle()}

  ]

  loginWithGoogle():void {
    try {
      this.loginOptions[1].isLoading = true
      this.loginOptions[0].disabled = true
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            // console.log("Login ",result)
            /** @type {firebase.auth.OAuthCredential} */
            // const credential = result.credential;
            if(result.additionalUserInfo?.isNewUser) {

              //  TODO: register user

            }else{
              //  TODO: Get users info
            }

            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            // var token = credential.accessToken;

            // The signed-in user info.


            // ...
          }).catch((error) => {
        //    TODO Notify user that something happend
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
        console.log(error)
      });

    }catch (e) {
      this.loginOptions[1].isLoading = false
      this.loginOptions[0].disabled = false
    //
    }finally {
      setTimeout(()=>{
        this.loginOptions[1].isLoading = false
        this.loginOptions[0].disabled = false
      },5000)
    }
  }
  loginWithGithub(): void {
    this.loginOptions[0].isLoading = true
    this.loginOptions[1].disabled = true
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // console.log("Login ",result)
          /** @type {firebase.auth.OAuthCredential} */
          // const credential = result.credential;
          if(result.additionalUserInfo?.isNewUser) {
          //  TODO: register user
          }else{
          //  TODO: Get users info
          }
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          // var token = credential.accessToken;
          // The signed-in user info.

          // ...
        }).catch((error) => {
      //    TODO Notify user that something happend
      this.loginOptions[0].isLoading = false
      this.loginOptions[1].disabled = false
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
      console.log(error)
    });

  }

  registerUserToFauna():void{
    try {
      if(this.user.displayName){
        if (this.user.displayName.length < 2) {
          alert("Your name is too short")
          return
        }

        this.isRegisteringUser = true

        const api = new APiHelper();
        api.registerUser(this.user).then((value) => {
          console.log(`User registration`, value)
        })
        return;
      }
      alert("Your name is too short")
    } catch (e) {
    //  TODO: catch
      console.log(e)
    } finally {
     setTimeout(()=> this.isRegisteringUser = false,2000)

    }
  }


  @Watch('userType',{immediate:true,deep:true})
  onUserTypeSelected(userTypeIndex:number):void {
    this.user.type = this.userTypeList[userTypeIndex-1];
    this.user.userTypeCode = this.userTypeList[userTypeIndex-1].type
    // console.log(userTypeIndex)
  }
  @Watch('isNewUser',{ immediate: true, deep: true })
  onNewUserChecked(isNew: boolean):void {
    if(isNew){
      const  fbUser = firebase.auth().currentUser;
     if(fbUser){
       this.user = {
         displayName:fbUser.displayName,
         organizationName:"",
         email:fbUser.email,
         phoneNumber:fbUser.phoneNumber,
         photoURL:fbUser.photoURL,
         providerId:fbUser.providerId,
         uid:fbUser.uid,
         type : this.userTypeList[this.userType - 1],
          userTypeCode : this.userTypeList[this.userType-1].type

       }
       this.screenSteps = 2
     }
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


  get illustration(): string {
    return assets.image.illustration
  }

  get illustrationMaxSize(): number {
    return 600
  }
  get isNewUser():boolean {
    return  this.$store.getters.isNewUser
  }




  get theme():AppTheme {
    return  this.$store.getters.theme
  }

}
</script>


}
<style lang="scss">
.align-flex {
  display: flex;
  align-items: center;
  justify-content: center;

}

.align-grid {
  display: grid;
  place-items: center;

}
</style>