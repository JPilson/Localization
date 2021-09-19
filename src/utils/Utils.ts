import moment from "moment";
import store from "../store/index"
import {AppTheme} from "@/values/Colors";
import {saveAs} from 'file-saver';

import {Key, ProjectLocal} from "@/models/Project";
import JSZip from "jszip";
import NumberFormatOptions = Intl.NumberFormatOptions;


moment.locale('pt-br');

export enum dateFormats {
    MMDDYYYY,
    DDMMYYYYhhmmss,
    MMMYYYYDD,
    MMM
}
export enum FileType {
    "yaml"=".yaml",
    "xml"=".xml",
    "android"=".xml",
    "ios"=".strings",
    "json"=".json"
}

export enum month {
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    oug,
    sep,
    oct,
    nov,
    dez
}

export default class Utils {
 public static dateFormats = [
     "MM-DD-YYYY",
     "DD-MM-YYYY",
     "MMM YYYY,DD",
     "MMMM"
 ];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {

    }


    public static formatDate(date:Date|string|number,format:dateFormats):string{
        const dateX = new Date(date)
        return moment(dateX).format(Utils.dateFormats[format]);
    }

    static getRandomInt(max:number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static currency(valor:string|number,currency: string | null='AOA',showCurrency=true):string {
        const locale = "de-DE" //de-DE
        const  value: number = (typeof valor === "string")?parseFloat(valor):valor
        const options:NumberFormatOptions = showCurrency?{
            style: 'currency',
            currency: currency?.toString(),
        } : {}

        return new Intl.NumberFormat(locale, options).format(value)

    }

     static tel(number:string){
        try {
            let phone;
            if (number.includes("+244"))
                phone = number;
            else
                phone = "+244" + number.trim();

            window.open(`tel:${phone}`);
        } catch (e) {
            const erro =  new Error();
            erro.name = "Nao foi Possível ligar"
            erro.stack = e.stack;
            throw erro;
        }
    }


    static  onThemeChange = (ThemeMediaQuery:MediaQueryListEvent|MediaQueryList)=>{
       // const systemTheme =  window.matchMedia("(prefers-color-scheme: dark)");
        if(ThemeMediaQuery.matches)
            store.dispatch("changeAppTheme", AppTheme.dark).then()
        else
            store.dispatch("changeAppTheme",AppTheme.light).then()

    }

    static  async convertToYAMLProperties (keysList:ProjectLocal,local:ProjectLocal):Promise<{ name:string,data:string }>{
        let code = ""
        await local.keys.forEach((key:Key,index:number) =>{
            code += `${keysList.keys[index].value}: ${key.value} \n`
        })
        return {
            name:`${local.local.code}${FileType.yaml}`,
            data:code
        }
       // await this.convertIntoFile(code,"eng",FileType.yaml)
    }
    static  async convertToXMLProperties (keysList:ProjectLocal,local:ProjectLocal):Promise<{ name:string,data:string }>{
        let code = ""
        await local.keys.forEach((key:Key,index:number) =>{
            code += `${keysList.keys[index].value}: ${key.value} \n`
        })
        return {
            name:`${local.local.code}${FileType.yaml}`,
            data:code
        }
        // await this.convertIntoFile(code,"eng",FileType.yaml)
    }
    static async jsonFormat (keysList:ProjectLocal,local:ProjectLocal,isLast = false,isParent = false):Promise<string> {
            let code = "";
            const keysLength = local.keys.length-1
            local.keys.forEach((key:Key,index:number) =>{
                // Please let the space where it is
                code += '   "'+keysList.keys[index].value+'":'+ '"'+key.value+'"'
                code += (index === keysLength)? "\n":",\n" // adding colon for the next key case its not the last

            })
        return  "\n \"" + local.local.code + "\":{\n" + code + "}"

    }
    static  async convertToAndroidStrings (keysList:ProjectLocal,local:ProjectLocal):Promise<{ name:string,data:string }> {
        let code = "";
        local.keys.forEach((key:Key,index:number) =>{
            // Please let the space where it is
            code += `       <string name = "${keysList.keys[index].value}">`+'"'+key.value + '"'+`</string>`+"\n"
        })
        const data =  "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
            "    <resources>\n"+code+"\n</resources>"

        return {
            name:`${local.local.code}${FileType.android}`,
            data:data
        }
    }
    static async convertToZip(files:Array<{ name:string,data:string }>, zipName:string):Promise<void>{
        try {
            if (files) {
                const zip = new JSZip()
                files.forEach((file) => zip.file(file.name, file.data))
                // const img:JSZip | null = zip.folder("images");
                // img?.file("smile.gif", "imgData", {base64: true});
                const content = await zip.generateAsync({type: "blob"})
                await saveAs(content, `${zipName}.zip`)
                return
            }
        } catch (e) {
            throw new Error(e)
        }

    }

    static async convertIntoFile (data:string,filename:string,format:FileType):Promise<void>{
        try {
            const blob = new Blob([data], {type: 'text/yaml;charset=utf-8;'})
            const link = document.createElement("a");
            if(link.download !== undefined){
                const url = URL.createObjectURL(blob)
                link.setAttribute("href",url)
                link.setAttribute("download",`${filename}${format}`)
                link.style.visibility = 'hidden'
                document.body.append(link)
                link.click()
                document.body.removeChild(link)
            }
            // if (navigator.)
            //     console.log("Oba")
            // else {
            //     console.log("no")
            // }
        } catch (e) {
            console.log(e)


        }
    }





}