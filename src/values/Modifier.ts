import {HexAA} from "@/values/Colors";

export default class Modifier {

    public static blurEffect = (blur =30,border=10,background="0, 0, 0, 0.16",opacity=0.16)=>{
        return `border-radius: ${border}px  ${border}px 0 0;
     backdrop-filter: blur(${blur}px)!important;
     --webkit-backdrop-filter: blur(${blur}px)!important;
     background-color: rgba(${background},${opacity});"`
    }
    public static frame = (width:number,height:number)=>{
        return `width: ${width}px!important;height:${height}px!important;`
    }
    public static background = (color:{red:number;green:number;blue:number},opacity=1)=>{
        return `background-color:rgba(${color.red},${color.green},${color.red},${opacity});`;
    }
    public static shadow = (x:number,y:number,blur:number,color:string,opacity?:HexAA )=> {
        return ` box-shadow:${x}px ${y}px ${blur}px ${color}${opacity??HexAA.P100}`;
    }

    public static padding = ()=>{
        return ``
    }

    constructor() {

    }

    /**
     * width: 405px;
     height: 495px;
     border-radius: 10px 10px 0px 0px;
     background: transparent;

    backdrop-filter: blur(12.35770034790039px);
            webkit-backdrop-filter: blur(12.35770034790039px);
    background-color: rgba(255, 255, 255, 0.5);


*/


}