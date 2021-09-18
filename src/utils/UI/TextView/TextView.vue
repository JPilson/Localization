<template>
  <div :class="`custom-text-view ${textDecoration}`" :style="`margin-top: -1px;`" >
    <span   :style="textViewStyle "  :class="textViewCss+' text-center'">{{text}}</span>
  </div>
</template>

<script>
  export default {
    props:{
      text:{
        default:'Text'
      },
      size:{
        default:15,
      },
      textStyle:{},
      align:String,
      transform:{},
      color:{},
      spacing:{},
      lineSpacing:{},
      paddingTop:{},
      paddingRight:{},
      paddingBottom:{},
      paddingLeft:{},
      marginTop:{},
      marginRight:{},
      marginBottom:{},
      marginLeft:{},
      wrapText:{},
      fontWeight:{},
      bold:{
        type: Boolean,
        default:false
      },
      black:{
        type: Boolean,
        default:false
      },
      caps:{
        type: Boolean,
        default:false
      },
      underline:{
        type: Boolean,
        default:false
      },
      overline:{
        type: Boolean,
        default:false
      },
      lineThrough:{
        type: Boolean,
        default:false
      }

    },

    computed: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      textViewStyle() {
        return `font-size:${this.$props.size}px; color:${this.$props.color};  letter-spacing:${this.$props.spacing}px;line-height:${
                this.$props.lineSpacing}px !important; padding:${this.$props.paddingTop || 0}px ${this.$props.paddingRight ||
        0}px ${this.$props.paddingBottom || 0}px ${this.$props.paddingLeft ||
        0}px   ;margin: ${this.$props.marginTop || 0}px ${this.$props
                .marginRight || 0}px ${this.$props.marginBottom || 0}px ${this.$props
                .marginLeft || 0}px;${this.$props.wrapText?'word-wrap: break-word':''};text-align:${this.$props.align || "center"};`;
      },
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      textDecoration(){
        if(this.$props.underline && !this.$props.overline && !this.$props.lineThrough)
            return "text-decoration-underline";
        else if(this.$props.lineThrough && !this.$props.overline && !this.$props.underline)
          return "text-decoration-line-through";
        else if(this.$props.overline && !this.$props.lineThrough && !this.$props.underline)
          return "text-decoration-overline";
        else return "text-decoration-none";
      },
      textViewCss() {
        return `text-${this.$props.caps?'uppercase':this.$props.transform} text-view-${this.$props.textStyle ||
        "regular"} ${this.$props.bold?'bold':this.$props.fontWeight} `;
      },
      wrap() {
        return {
          textWrap: true
        };
      }
    }
  };
</script>

<style>
  .custom-text-view {
    padding: 0;
    margin: 0;

  }
  .custom-text-view .thin {
    font-weight: 100 !important;
  }
  .custom-text-view .light {
    font-weight: 300 !important;
  }
  .custom-text-view .regular {
    font-weight: 400 !important;
  }
  .custom-text-view .medium {
    font-weight: 500 !important;
  }
  .custom-text-view .bold {
    font-weight: 700 !important;
  }
  .custom-text-view .t-black {
    font-weight: 900 !important;
  }
  .custom-text-view .text-capitalize {
    text-transform: capitalize;
  }
  .custom-text-view .text-uppercase {
    text-transform: uppercase;
  }
  .custom-text-view .text-lowercase {
    text-transform: lowercase;
  }
  .custom-text-view .text-lowercase {
    text-transform: lowercase;
  }
  .custom-text-view .textWrap {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;


  }
</style>