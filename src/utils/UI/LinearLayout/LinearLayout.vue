<template>
  <div :style="`background-color:${backgroundTint};border-radius: ${radiusTopLeft|roundedCorners}px ${radiusTopRight|roundedCorners}px ${radiusBottomLeft|roundedCorners}px ${radiusBottomRight|roundedCorners}px ;cursor:pointer;${ripple?'':''} `"
       @click="$emit('onClick')"

       :class="`d-flex blur-bg-light
            pa-${pa}
            ${horizontalOrientation?'':'flex-column '}
          ${spaceAround?'justify-space-around':''}
          ${spaceBetween?'justify-space-between':''}
          ${alignCenter?'align-center':''}
          blur-bg-${blurBackground}
          `">

    <slot  ></slot>
  </div>
</template>

<script>
export default {
  name: "LinearLayout",
  props:{
    horizontalOrientation:{
      type:Boolean,
      default:false
    },
    contentAlignment:{
      type:{
        default:"start"
      }
    },
    pa:{

      default:0
    },

    spaceBetween:{
      type:Boolean,
      default:false
    },
    ripple:{
      type:Boolean,
      default:false
    },
    spaceAround:{
      type:Boolean,
      default:false
    },
    alignCenter:{
      type:Boolean,
      default:false
    },
    backgroundTint:{
      default:"transparent",
    },
    roundedCorners:{
      default:0,
    },
    radiusTopRight:{
      default:0,
    },
    radiusTopLeft:{
      default:0,
    },
    radiusBottomRight:{
      default:0,
    },
    radiusBottomLeft:{
      default:0,
    },
    blurBackground:{
      default:"none"
    }

  }
}
</script>

<style scoped>
.dir{
  cursor: auto;
  width: 428px;
  height: 103px;
  /* (plus shape's fill blended on top as a separate layer with 74.38% opacity) */
}
.blur-bg-light {
  /*background: transparent;*/
  backdrop-filter: blur(90px);
  --webkit-backdrop-filter: blur(26px);
  background-color: rgba(255, 255, 255, 1);
  /* (plus shape's fill blended on top as a separate layer with 74.38% opacity) */

}
</style>