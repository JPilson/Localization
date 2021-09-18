<template>
    <div class="d-flex">
        <text-view :text="title+':'" caps :size="textSize" :color="titleColor" bold/>
        <text-view :text="value" :size="textSize" :bold="bold" :caps="caps" :color="colors.primaryText"
                   class="ml-2"/>
    </div>
</template>
<script>
    export default {
        name: 'TextBlock',
        props: {
            title: {},
            value:{},
            textSize:{
                default:15
            },
            titleColor:{
                default:"#8c9dff"
            },
            caps:{
                type:Boolean,
                default:false
            },
            bold:{
                type:Boolean,
                default:false
            }


        }
    }
</script>
