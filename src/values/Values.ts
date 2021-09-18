import { Vue, Component } from 'vue-property-decorator'
import Colors from "@/values/Colors"
import Strings from "@/values/Strings";

@Component
export default class Values extends Vue {
    public test = 'Hello, hello, hello';
    // public colors: {} = Colors.light;
    // public strings: {} = Strings.pt
    // public assets: {} = Assets
}