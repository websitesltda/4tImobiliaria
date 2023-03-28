import { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Configs from '../../Configs';
import { FAB, Button, Dialog } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from '@rneui/themed';
import Funcoes from './Funcoes';
import style from './style';

function VistoriaList({ navigation, route }) {

    const { Id, Tipo, Rua, Numero, Bairro, Cidade, Estado, Image: Imagem } = route.params;
    const { Ambientes, Avancar, Salvar, Deletar, Editar } = Funcoes({ navigation, model: route.params });
    const [Excluir, setExcluir] = useState(false);
    const [Model, setModel] = useState({});

    return (
        <SafeAreaView style={style.SafeAreaView}>
            <StatusBar backgroundColor={Configs.ColorPrimary} barStyle="default" />

            <View style={style.CardContainer}>
                <View style={style.Card}>
                    <View style={style.CardImage}>
                        <Image style={style.CardImg} resizeMode="stretch" source={{ uri: Imagem }} />
                    </View>
                    <View style={style.CardText}>
                        <Text style={style.CardTextTitle} >{Tipo}</Text>
                        <View style={style.CardTextContainer}>
                            <Text style={style.CardTextEndereco}>{Rua}, {Numero}</Text>
                            <Text style={style.CardTextEndereco}>{Bairro}</Text>
                            <Text style={style.CardTextEndereco}>{Cidade}/{Estado}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={style.Title}>
                <Text style={style.TitleText}>Ambientes</Text>
            </View>

            {Ambientes.length === 0 && <View style={{ width: '100%', height: 80, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={20} color={Configs.ColorPrimary} />
                <Text style={style.TitleText}>Não há registros cadastrados ainda.</Text>
            </View>}

            <ScrollView style={style.ScrollView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                <View style={style.ScrollViewContainer}>
                    {Ambientes.map((e, index) => (
                        <View key={index} style={style.Comodos}>
                            <Text style={style.ComodosText}>{e.Titulo}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => [setExcluir(true), setModel(e)]} style={[style.ComodosBtn, { marginRight: 10 }]}>
                                    <Icon name='delete' size={25} color={Configs.ColorRed} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => Editar(route.params, e)} style={style.ComodosBtn}>
                                    <Icon name='pen' size={25} color={Configs.ColorWhite} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <FAB
                icon="plus"
                style={style.fab}
                color={Configs.ColorWhite}
                onPress={() => Avancar(route.params)}
            />

            <FAB
                icon="content-save"
                style={style.fabSave}
                color={Configs.ColorWhite}
                onPress={() => Salvar(Id)}
            />

            <Dialog visible={Excluir} dismissable={false} style={{ borderRadius: 5 }}>
                <Dialog.Title>Atenção</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Deseja EXCLUIR este registro ?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => [setExcluir(false), setModel({})]}>Não</Button>
                    <Button onPress={() => [Deletar(Model), setExcluir(false), setModel({})]}>Sim</Button>
                </Dialog.Actions>
            </Dialog>

        </SafeAreaView>
    );
};


export default VistoriaList;