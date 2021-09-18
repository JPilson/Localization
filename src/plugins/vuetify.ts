import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from "vuetify/lib/util/colors";
import store from "@/store"
import {ColorType} from "@/values/Colors";

const appColor:ColorType = store.getters.colors

Vue.use(Vuetify);

export default new Vuetify({
    theme: { dark: true, themes:{
            light: {
                primary: colors.purple,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                background: colors.indigo.lighten5, // Not automatically applied

            },
            dark: {
                primary: colors.blue.lighten3,
                background: appColor.background, // If not using lighten/darken, use base to return hex

            },
        } },
});
