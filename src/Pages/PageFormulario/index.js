import { SafeAreaView, StatusBar, View, Text, TextInput,  Image, TouchableOpacity, FlatList } from 'react-native';
import Configs from '../../Configs';
import Icon from '@expo/vector-icons/FontAwesome';
import { AutocompleteDropdown } from 'react-native-autocomplete-4t';
import Funcoes from './Funcoes';
import style from './style';
import Lottie from 'lottie-react-native';
import Mic from './../../../assets/mic.json';
import Wave from './../../../assets/wave.json';

function Formulario({ navigation, route }) {
    const { vistoria } = route.params;
    const {Id, Tipo, Rua, Numero, Bairro, Cidade, Estado } = vistoria;
    const { Teclado, startSpeechToText, Salvar, AmbienteList, stopSpeechToText, Fotos, Fotografar, RemoveImage, Recording, Descricao, onDescricao, Ambiente, setAmbiente, BtnSalvar, setBtnSalvar } = Funcoes({ navigation, Id, vistoria });

    //#region Render
    function Render() {
        return (
            <View style={{ alignItems: 'center', marginBottom: '20%' }}>

                <AutocompleteDropdown
                    textInputProps={{
                        placeholder: 'Digite o ambiente',
                        placeholderTextColor: Configs.ColorGray,
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        style: style.AutoComplete
                    }}
                    initialValue={Ambiente}
                    onChangeText={(e) => setAmbiente({ id: null, title: e })}
                    onSelectItem={(e) => setAmbiente(e)}
                    rightButtonsContainerStyle={style.rightButtonsContainerStyle}
                    inputContainerStyle={style.inputContainerStyle}
                    suggestionsListContainerStyle={style.suggestionsListContainerStyle}
                    containerStyle={style.containerStyle}
                    clearOnFocus={false}
                    closeOnBlur={false}
                    closeOnSubmit={false}
                    emptyResultText="Opção não cadastrada"
                    renderItem={model => <View style={{ width: '100%', height: 40, alignItems: 'flex-start', paddingHorizontal: 10, justifyContent: 'center' }}><Text style={{ fontWeight: '500', color: Configs.ColorGray200 }}>{model.title}</Text></View>}
                    dataSet={AmbienteList}
                />

                <View style={style.ConmteinerInput}>
                    <TextInput value={Descricao} onChangeText={(e) => onDescricao(e)} multiline style={style.Input} placeholder='Descrição' placeholderTextColor={Configs.ColorGray} />
                </View>

                <View style={{
                    width: '95%',
                    height: 50,
                    marginTop: 15,
                    elevation: 5,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: Configs.ColorGray100
                }}>

                    {!Recording &&
                        <TouchableOpacity onPress={() => Fotografar(vistoria)} style={{
                            minWidth: 150,
                            height: 40,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            backgroundColor: Configs.ColorPrimary
                        }}>

                            <Text style={{
                                fontSize: 13,
                                color: Configs.ColorWhite
                            }}>ADICIONAR FOTOS</Text>
                            <Icon name='camera' size={15} color={Configs.ColorWhite} />
                        </TouchableOpacity>}

                    {!Recording ? <TouchableOpacity onPress={() => startSpeechToText()} style={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Configs.ColorPrimary
                    }}>
                        <Icon name='microphone' size={20} color={Configs.ColorWhite} />
                    </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => stopSpeechToText()} style={{
                            minWidth: '100%',
                            height: 40,
                            borderRadius: 40,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}>

                            <View style={{ width: '70%', height: 40 }}>
                                <Lottie width={'100%'} source={Wave} autoPlay loop />
                            </View>
                            <View style={{ width: '30%', height: 40 }}>
                                <Lottie source={Mic} autoPlay loop />
                            </View>
                        </TouchableOpacity>}

                </View>

                <View style={{
                    width: '95%',
                    minHeight: 0,
                    marginTop: 15,
                    elevation: 5,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    backgroundColor: Configs.ColorGray100
                }}>

                    {Fotos.map((e, index) => (
                        <TouchableOpacity key={index} onPress={() => RemoveImage(e)} style={
                            {
                                minWidth: '45%',
                                height: 120,
                                borderRadius: 5,
                                marginBottom: 7,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Image style={
                                {
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 5
                                }
                            } resizeMode="stretch" source={{ uri: e.Image }} />

                            <View style={
                                {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }>
                                <Icon name='remove' size={20} color={Configs.ColorRed} />
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>

            </View>
        );
    };
    //#endregion

    return (
        <SafeAreaView style={style.SafeAreaView}>
            <StatusBar backgroundColor={Configs.ColorPrimary} barStyle="default" />

            <View style={style.CardContainer}>
                <View style={style.Card}>
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

            <FlatList
                style={{ width: '100%' }}
                data={[{}]}
                renderItem={Render}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onEndReached={() => setBtnSalvar(true)}
                onEndReachedThreshold={0.1}
            />

            {BtnSalvar && !Teclado &&
                <View style={{
                    width: '100%',
                    height: 60,
                    position: 'absolute',
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={Salvar} style={{
                        width: '70%',
                        height: 50,
                        borderRadius: 5,
                        elevation: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Configs.ColorPrimary
                    }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: Configs.ColorWhite
                        }}>Salvar</Text>
                    </TouchableOpacity>
                </View>}

        </SafeAreaView>
    );
};


export default Formulario;