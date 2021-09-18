import moment from "moment";
import store from "../store/index"
import {AppTheme} from "@/values/Colors";
import NumberFormatOptions = Intl.NumberFormatOptions;
import {TableItemModel} from "@/components/LocalTable.vue";

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

    static  async convertToYAMLProperties (keysList:TableItemModel,local:TableItemModel):Promise<void>{
        let code = ""
        await local.keys.forEach((key,index) =>{
            code += `${keysList.keys[index].value}: ${key.value} \n`
        })
       await this.convertIntoFile(code,"eng",FileType.yaml)
    }
    static  jsonFormat (keysList:TableItemModel,local:TableItemModel):void {
        let code = "";
        local.keys.forEach((key,index) =>{
            // Please let the space where it is
            code += '    "'+keysList.keys[index].value+'":'+ '"'+key.value+'"\n'

        })
        const data = "{\n eng:{\n"+code+"}\n}"
        console.log(data)
    }
    static  async convertToAndroidStrings (keysList:TableItemModel,local:TableItemModel):Promise<string> {
        let code = "";
         local.keys.forEach((key,index) =>{
            // Please let the space where it is
            code += `       <string name = "${keysList.keys[index].value}">`+'"'+key.value + '"'+`</string>`+"\n"
        })
        const data =  "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
            "    <resources>\n"+code+"\n</resources>"

        return  data
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