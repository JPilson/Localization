export interface ColorType {
    primaryText:string;
    secondaryText:string;
    dashCardColor:string;
    red:string;
    confirm:string;
    addVocabButton:string;
    card:string;
    rankColor:Array<string>;
    background:string
    playViewThemes:Array<Record<string,string>>
    homePlayBtn:string
    homePlayBtnText:string
    keyColumn:string
}

export enum AppTheme{
    light="light",
    dark = "dark",
}



const rankColor = ["#189F3D","#969f18","#182e9f","#779f18","#9F1847","#9F1847"]
const confirmColor = '#8EFF9B',
    addVocabButtonColor = "#FFE886",
    dashCardColor =  "#A7BEFF";



export default  {
    light:{
        primaryText:'#000000',
        secondaryText:'#515151',
        card:"rgba(237,237,237,0.26)",
        dashCardColor:dashCardColor,
        confirm:confirmColor,
        addVocabButton:addVocabButtonColor,
        rankColor:rankColor,
        background:"#ffffff",

        homePlayBtn:"#bee4ff",
        homePlayBtnText:"#0095ff",
        keyColumn:""

    } as ColorType,
    dark:{
        primaryText:'#ffffff',
        secondaryText:'#c4c4c4',
        card:"#131D2C",
        background:"#0D141E",
        dashCardColor:dashCardColor,
        confirm:confirmColor,
        addVocabButton:addVocabButtonColor,
        rankColor:rankColor,
        homePlayBtn:"#202e38",
        homePlayBtnText:"#61aeef",
        keyColumn:"#2c4265"

    } as ColorType
}

export enum HexAA {
    "P100"  = "FF",
"P99"  = "FC",
"P98"  = "FA",
"P97"  = "F7",
"P96"  = "F5",
"P95"  = "F2",
"P94"  = "F0",
"P93"  = "ED",
"P92"  = "EB",
"P91"  = "E8",
"P90"  = "E6",
"P89"  = "E3",
"P88"  = "E0",
"P87"  = "DE",
"P86"  = "DB",
"P85"  = "D9",
"P84"  = "D6",
"P83"  = "D4",
"P82"  = "D1",
"P81"  = "CF",
"P80"  = "CC",
"P79"  = "C9",
"P78"  = "C7",
"P77"  = "C4",
"P76"  = "C2",
"P75"  = "BF",
"P74"  = "BD",
"P73"  = "BA",
"P72"  = "B8",
"P71"  = "B5",
"P70"  = "B3",
"P69"  = "B0",
"P68"  = "AD",
"P67"  = "AB",
"P66"  = "A8",
"P65"  = "A6",
"P64"  = "A3",
"P63"  = "A1",
"P62"  = "9E",
"P61"  = "9C",
"P60"  = "99",
"P59"  = "96",
"P58"  = "94",
"P57"  = "91",
"P56"  = "8F",
"P55"  = "8C",
"P54"  = "8A",
"P53"  = "87",
"P52"  = "85",
"P51"  = "82",
"P50"  = "80",
"P49"  = "7D",
"P48"  = "7A",
"P47"  = "78",
"P46"  = "75",
"P45"  = "73",
"P44"  = "70",
"P43"  = "6E",
"P42"  = "6B",
"P41"  = "69",
"P40"  = "66",
"P39"  = "63",
"P38"  = "61",
"P37"  = "5E",
"P36"  = "5C",
"P35"  = "59",
"P34"  = "57",
"P33"  = "54",
"P32"  = "52",
"P31"  = "4F",
"P30"  = "4D",
"P29"  = "4A",
"P28"  = "47",
"P27"  = "45",
"P26"  = "42",
"P25"  = "40",
"P24"  = "3D",
"P23"  = "3B",
"P22"  = "38",
"P21"  = "36",
"P20"  = "33",
"P19"  = "30",
"P18"  = "2E",
"P17"  = "2B",
"P16"  = "29",
"P15"  = "26",
"P14"  = "24",
"P13"  = "21",
"P12"  = "1F",
"P11"  = "1C",
"P10"  = "1A",
"P9"  = "17",
"P8"  = "14",
"P7"  = "12",
"P6"  = "0F",
"P5"  = "0D",
"P4"  = "0A",
"P3"  = "08",
"P2"  = "05",
"P1"  = "03",
"P0"  = "00",
}