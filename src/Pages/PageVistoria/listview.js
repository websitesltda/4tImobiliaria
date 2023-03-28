import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from '@rneui/themed';
import style from './style';

function ListView({ model, Funcoes, navigation }) {
    const { index, item } = model;
    const { Avancar } = Funcoes({ navigation });

    return (
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
                        <TouchableOpacity onPress={() => Avancar(item)} style={style.CardButton}>
                            <Text style={style.CardButtonText}>INICIAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};


export default ListView;