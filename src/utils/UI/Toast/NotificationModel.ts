import {notificationTypes} from "@/utils/UI/Toast/Notify";

export class NotificationModel {
    public id: number | undefined;
    public title: string | undefined;
    public message: string | undefined;
    public action: any | undefined;
    public type: notificationTypes | undefined;
    public icon: string | undefined | null;
    public iconColor: string = "#0000";
    public duration: number = 5000;
    public trigger = false;


    constructor() {
        this.id =0;
        this.title ="";
        this.message = "";
        this.action = null;
        this.type = 0;
        this.icon = "";
        this.iconColor = "";
        this.duration = 5000;
        this.trigger = false;
    }

    updateAll(data: NotificationModel){
        this.id = data.id;
        this.title = data.title;
        this.message = data.message;
        this.action = data.action;
        this.type = data.type;
        this.icon = data.icon;
        this.iconColor = data.iconColor;
        this.duration = data.duration;
        this.trigger = data.trigger;
    }


    constructorAll(id: number , title: string , message: string , action: any, type: notificationTypes , icon: string| null , iconColor: string | null, duration: number, trigger: boolean) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.action = action;
        this.type = type;
        this.icon = icon;
        this.iconColor = iconColor??"#000";
        this.duration = duration;
        this.trigger = trigger;
    }
}