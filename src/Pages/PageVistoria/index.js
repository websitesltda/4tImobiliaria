import { SafeAreaView, StatusBar, View, Text, FlatList } from 'react-native';
import Configs from '../../Configs';
import ListView from './listview';
import Funcoes from './Funcoes';
import style from './style';
import { Skeleton } from '@rneui/themed';

function Vistoria({ navigation }) {

    const { Imoveis, BuscarVistorias } = Funcoes({ navigation });

    function LoadingCard() {
        return (
            <View animation="wave" style={style.Card} >
                <Skeleton animation="pulse" style={style.CardImage} />
                <View style={style.CardText}>
                    <View style={style.CardTextContainer}>
                        <Skeleton animation="pulse" style={{ width: 100, height: 15, marginBottom: 10, marginTop: 5 }} />
                        <Skeleton animation="pulse" style={{ width: 100, height: 15, marginBottom: 3 }} />
                        <Skeleton animation="pulse" style={{ width: 100, height: 15, marginBottom: 3 }} />
                        <Skeleton animation="pulse" style={{ width: 100, height: 15, marginBottom: 3 }} />
                    </View>
                    <View style={style.CardTextButton}>
                        <Skeleton animation="pulse" style={{ width: 100, height: 20, marginTop: 10 }} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={style.SafeAreaView}>
            <StatusBar backgroundColor={Configs.ColorPrimary} barStyle="default" />

            <View style={style.Title}>
                <Text style={style.TitleText}>LISTA DE IMÓVEIS PARA VISTORIA</Text>
            </View>

            {Imoveis.length === 0 && <LoadingCard />}

            <View style={style.Container}>
                <FlatList
                    onRefresh={() => BuscarVistorias()}
                    refreshing={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: '100%' }}
                    ListFooterComponentStyle={{ marginBottom: '50%' }}
                    data={Imoveis}
                    renderItem={(model) => <ListView model={model} Funcoes={Funcoes} navigation={navigation} />}
                />
            </View>

        </SafeAreaView>
    );
};


export default Vistoria;