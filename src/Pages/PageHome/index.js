import { Image, SafeAreaView, StatusBar, View } from 'react-native';
import Configs from '../../Configs';
import style from './style';

function Home({ navigation }) {

    return (
        <SafeAreaView style={style.SafeAreaView}>
            <StatusBar backgroundColor={Configs.ColorPrimary} barStyle="default" />

            <View style={{width:'100%', height:'100%'}}>
                <Image style={{width:'100%', height:'100%'}} resizeMode="contain" source={require('./../../../assets/logo.png')}/>
            </View>

        </SafeAreaView>
    );
};


export default Home;