import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Image } from '@rneui/themed';
import style from './style';
import Configs from '../../Configs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function ListView({ model, Funcoes, navigation }) {
    const { index, item } = model;
    const { Avancar } = Funcoes({ navigation });

    function RightActions({ progress, dragX, onPress }) {

        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })

        return (
            <TouchableOpacity style={{ width: 120, height: 120, alignItems:'center', justifyContent:'center', marginRight: 10, borderRadius: 5, elevation: 5, backgroundColor: Configs.ColorRedDard }}>
                <Animated.View style={[{ padding: 20, alignItems:'center' }, { transform: [{ scale: scale }] }]}>
                    <Icon name='cloud-upload' size={50} color={Configs.ColorWhite} />
                    <Text style={{fontSize:15, fontWeight:'bold', color:Configs.ColorWhite}}>Transmitir</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }

    return (
        <Swipeable
            renderRightActions={(progress, dragX) =>
                <RightActions progress={progress} dragX={dragX} />}
        >

            <View key={index} style={style.CardContainer}>
                <View style={style.Card}>
                    <View style={style.CardImage}>
                        <Image style={style.CardImg} resizeMode="stretch" source={{ uri: item.Image }} />
                    </View>
                    <View style={style.CardText}>
                        <View style={style.CardTextContainer}>
                            <Text style={style.CardTextTitle} >{item.Tipo}</Text>
                            <Text style={style.CardTextEndereco}>{item.Rua}, {item.Numero}</Text>
                            <Text style={style.CardTextEndereco}>{item.Bairro}</Text>
                            <Text style={style.CardTextEndereco}>{item.Cidade}/{item.Estado}</Text>
                        </View>
                        <View style={style.CardTextButton}>
                            <TouchableOpacity onPress={() => Avancar(item)} style={[style.CardButton, { backgroundColor: item.Status === null ? Configs.ColorGreen : item.Status === 0 ? Configs.ColorPrimary : Configs.ColorRedDard }]}>
                                <Text style={style.CardButtonText}>{item.Status === null ? 'INICIAR' : item.Status === 0 ? 'EM ANDAMENTO' : 'CONCLUIDO'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        </Swipeable>
    );
};


export default ListView;