import store from "@/store/index";
import { NotificationModel } from './NotificationModel';
export enum notificationTypes {
    Toast,
    ToastAcknowledgment,
    confirmationDialog

}

export default class Notify {
    private static LOG: string = "Log Notification: ";

    constructor(){}


    static makeToast(title: string,message: string,toastType: notificationTypes = notificationTypes.Toast,icon: string  = '',iconColor: string  = "", duration: number = 5000,action: ()=>void=()=>{} ){
        const state = new NotificationModel();
        state.constructorAll(0,
            title,
            message,action,toastType,icon,iconColor,duration,true);

        this.dispatch(state);
    }

    static dismiss(){
        const state: NotificationModel = store.getters.notificationState;
        state.trigger = false;
        this.dispatch(state);

    }
    private static dispatch(state: NotificationModel):void{
        store.dispatch('updateNotificationState', state).then(() =>{
        //    notification Properties updated

        }).catch(err =>{
            console.log(this.LOG," ",err);
        });
    }



}