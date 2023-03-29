import { useState, useEffect, useCallback } from "react";
import { Keyboard, Alert } from "react-native";
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from '@react-native-voice/voice';
import SQLite from "../../../SQLite/SQLite";

function Funcoes({ navigation, vistoria, model }) {

    //#region Estancias
    const [Teclado, setTeclado] = useState(false);
    const [BtnSalvar, setBtnSalvar] = useState(false);
    const [Recording, setRecording] = useState(false);
    const [AmbienteList, setAmbienteList] = useState([]);

    const [IdAmbiente, setIdAmbiente] = useState('');
    const [IdVistoria, setIdVistoria] = useState('');
    const [Ambiente, setAmbiente] = useState({});
    const [Descricao, setDescricao] = useState('');
    const [Fotos, setFotos] = useState([]);

    const AmbienteTextConfirm = Ambiente !== null ? Ambiente.title : '';
    //#endregion

    //#region KeyboardControl
    Keyboard.addListener("keyboardDidShow", () => {
        setTeclado(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
        setTeclado(false);
    });
    //#endregion

    //#region useEffect
    useEffect(() => {
        if (model) {

            const Res = AmbienteList.filter(e => (e.title === model.Titulo));

            if (Res.length === 0) {
                setAmbiente({ id: null, title: model.Titulo });
                setDescricao(model.Descricao);
            } else {
                Res.map(e => {
                    setIdAmbiente(model.Id);
                    setAmbiente(e);
                    setDescricao(model.Descricao);
                    setIdVistoria(model.Vistoria);
                });
            }
        }
    }, [AmbienteList, model]);

    useEffect(() => {
        AsyncStorage.getItem('Parametro').then(e => {
            SQLite.Database.transaction((db) => {
                db.executeSql("SELECT * FROM Imagens where Ambiente = ?", [e], (_, { rows }) => {
                    if (rows['length'] > 0) {
                        setFotos(rows['_array']);
                    } else {
                        setFotos([]);
                    };
                });
            });
        });

        SQLite.Database.transaction((db) => {
            db.executeSql("SELECT * FROM AmbientesOptions", [], (_, { rows }) => {
                if (rows['length'] > 0) {
                    setAmbienteList(rows['_array']);
                } else {
                    setAmbienteList([]);
                };
            });
        });

    }, []);

    useFocusEffect(
        useCallback(() => {
            Voice.onSpeechError = onSpeechError;
            // Voice.onSpeechStart = startSpeechToText;
            Voice.onSpeechEnd = stopSpeechToText;
            Voice.onSpeechResults = onSpeechResults;
            return () => {
                Voice.destroy().then(Voice.removeAllListeners);
            };
        }, [])
    );
    //#endregion

    //#region startSpeechToText stopSpeechToText onSpeechResults
    async function startSpeechToText() {
        await Voice.start("pt-BR");
        AsyncStorage.setItem('Voice', Descricao);
        setRecording(true);
    };

    async function stopSpeechToText() {
        await Voice.stop();
        setRecording(false);
    };

    async function onSpeechResults(result) {
        const Texto = await AsyncStorage.getItem('Voice');
        const Audio1 = result.value[0].toString();
        const Audio2 = Texto + ' ' + result.value[0].toString();
        if (Texto) {
            setDescricao(Audio2);
        } else {
            setDescricao(Audio1);
        };
    };
    //#endregion

    //#region onDescricao onSpeechError RemoveImage
    async function onDescricao(Text) {
        setDescricao(Text);
        AsyncStorage.setItem('Voice', Text);
    };

    const onSpeechError = (error) => {
        console.log(error);
    };

    function RemoveImage(model) {
        SQLite.DeleteImagen(model);
        const Res = Fotos.filter(e => (e !== model));
        setFotos(Res);
    };
    //#endregion

    //#region Fotografar
    function Fotografar(route) {
        AsyncStorage.getItem('Parametro').then(e => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'HomePage' },
                        { name: 'DrawerPagesVistoria' },
                        { name: 'VistoriaList', params: route },
                        { name: 'Formulario', params: { vistoria: route } },
                        { name: 'CameraForm', params: { vistoria: route, parametro: e, model: model === null ? { "Descricao": Descricao, "Id": e, "Titulo": AmbienteTextConfirm, "Vistoria": vistoria.Id } : { "Descricao": Descricao, "Id": IdAmbiente, "Titulo": AmbienteTextConfirm, "Vistoria": IdVistoria } } }
                    ]
                })
            );
        })
    };
    //#endregion

    //#region Salvar
    async function Salvar() {

        Keyboard.dismiss();
        if (AmbienteTextConfirm === "") {
            return Alert.alert('Atenção', 'Insira o tipo de ambiente e a descrição para proseguir')
        };
        AsyncStorage.getItem('Parametro').then(e => {
            const Obj = { Id: e, Vistoria: vistoria.Id, Titulo: AmbienteTextConfirm, Descricao: Descricao };

            SQLite.Database.transaction((db) => {
                db.executeSql("SELECT * FROM AmbientesOptions where title = ?", [AmbienteTextConfirm], (_, { rows }) => {
                    if (rows['length'] > 0) {
                        (async () => {
                            await SQLite.InsertAmbiente(Obj);
                            await SQLite.UpdateAmbiente(Obj);
                        })();

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'HomePage' },
                                    { name: 'DrawerPagesVistoria' },
                                    { name: 'VistoriaList', params: vistoria }
                                ]
                            })
                        );
                        AsyncStorage.setItem('Parametro', '');
                        AsyncStorage.setItem('Voice', '');

                    } else {
                        (async () => {
                            await SQLite.InsertAmbiente(Obj);
                            await SQLite.UpdateAmbiente(Obj);
                            await SQLite.InsertAmbientesOptions(AmbienteTextConfirm);
                        })();

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'HomePage' },
                                    { name: 'DrawerPagesVistoria' },
                                    { name: 'VistoriaList', params: vistoria }
                                ]
                            })
                        );

                        AsyncStorage.setItem('Parametro', '');
                        AsyncStorage.setItem('Voice', '');

                    };
                });
            });
        });
    };
    //#endregion

    //#region Editar
    async function Editar() {

        Keyboard.dismiss();
        if (AmbienteTextConfirm === "") {
            return Alert.alert('Atenção', 'Insira o tipo de ambiente e a descrição para proseguir')
        };
        AsyncStorage.getItem('Parametro').then(e => {
            const Obj = { Id: IdAmbiente, Titulo: AmbienteTextConfirm, Descricao: Descricao };

            SQLite.Database.transaction((db) => {
                db.executeSql("SELECT * FROM AmbientesOptions where title = ?", [AmbienteTextConfirm], (_, { rows }) => {
                    if (rows['length'] > 0) {
                        (async () => {
                            await SQLite.UpdateAmbiente(Obj);
                            await SQLite.InsertAmbiente(Obj);
                        })();

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'HomePage' },
                                    { name: 'DrawerPagesVistoria' },
                                    { name: 'VistoriaList', params: vistoria }
                                ]
                            })
                        );
                        AsyncStorage.setItem('Parametro', '');
                        AsyncStorage.setItem('Voice', '');

                    } else {
                        (async () => {
                            await SQLite.UpdateAmbiente(Obj);
                            await SQLite.InsertAmbiente(Obj);
                            await SQLite.InsertAmbientesOptions(AmbienteTextConfirm);
                        })();

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'HomePage' },
                                    { name: 'DrawerPagesVistoria' },
                                    { name: 'VistoriaList', params: vistoria }
                                ]
                            })
                        );

                        AsyncStorage.setItem('Parametro', '');
                        AsyncStorage.setItem('Voice', '');

                    };
                });
            });
        });
    };
    //#endregion

    return {
        Teclado, startSpeechToText, Salvar, IdAmbiente, AmbienteList, Editar, RemoveImage, Fotografar, stopSpeechToText, Recording, Descricao, Ambiente, setAmbiente, setDescricao, onDescricao, BtnSalvar, setBtnSalvar, Fotos, setFotos
    };
};

export default Funcoes;