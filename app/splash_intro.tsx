import { View, Image, Text} from "react-native";
import splashStyles from "@/src/styles/SplashStyle";
import LogoText from "@/assets/images/inforsion-logo-text.png";
import Step from "@/assets/images/Ingr/SplashStep.png"

export default function SplashScreen() {
    return (
        <View style={splashStyles.container}>
            <View style={splashStyles.center}>
                <Text style={splashStyles.title}>두가지</Text>
                <Text style={splashStyles.title}>등록으로</Text>
                <Text style={splashStyles.title}>간편한 가게관리</Text>
                <Image source={Step} style={splashStyles.step} />
                <Image source={LogoText} style={splashStyles.logo} />

            </View>
        </View>
    );
}
