import store from "@/store/index";
import {DataInterface} from "@/store/DataBase";



const version = "Versão 1.6"

export default class Constants {
    public static version = version
    public static hasNotch = false;
    public static monthList = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ]



    public static updateDataList = <T>(dataInterface: DataInterface<T>) => {
        store.commit("updateData", dataInterface)
    }



    public static rules = {
        email: [(v: string) => /.+@.+/.test(v) || 'Invalid Email address'],
        password:(tip = "Requer Senha")=> [(v: string) => v.length > 2 || tip],
        rePassword: (input:string)=>[(v: string) => v  === input  || 'The Passwords dont match'],
        numberGreaterThan: (limit: number, tip = "Invalido") => {
            return [(v: number) => v > limit || tip]
        },
        yearRule: (tip = "Invalido") => {
            return [(v: number) => (v===null?false:(v.toString()).length > 3) || tip]
        },
        inputLength: (length:number,tip = "")=>[(v: any) => v.length > length || tip],
        nullArray:(tip="invalido")=> [(v:Array<any>)=> v!==null || tip],

        notEmpty: (fieldName = "campo") => {
            return [(v: string) => v.length >= 2 || `${fieldName} é requerido.`]
        },
        amount: (amount: number) => {
            return [(v: number) => v <= 0 || `O montante deve ser igual ou superior ${amount} `]
        },

    }
}