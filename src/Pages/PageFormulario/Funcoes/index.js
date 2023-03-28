import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from '@react-native-voice/voice';
import SQLite from "../../../SQLite/SQLite";

function Funcoes({ navigation, Id, vistoria }) {

    //#region Estancias
    const [Teclado, setTeclado] = useState(false);
    const [BtnSalvar, setBtnSalvar] = useState(false);
    const [Recording, setRecording] = useState(false);
    const [AmbienteList, setAmbienteList] = useState([]);
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

        // AsyncStorage.setItem('Voice', " ").then(() => {
        //     setDescricao("");
        // });
        // Voice.onSpeechError = onSpeechError;
        // Voice.onSpeechResults = onSpeechResults;
        // return () => {
        //     Voice.destroy().then(Voice.removeAllListeners);
        // }
    }, []);

    async function startSpeechToText() {
        await Voice.start("pt-BR");
        setRecording(true);
    };

    async function stopSpeechToText() {
        await Voice.stop();
        setRecording(false);
    };

    async function onSpeechResults(result) {
        const Audio = result.value[0].toString();
        await AsyncStorage.getItem('Voice').then(e => {
            const Text = e + ' ' + Audio;
            if (e !== null) {
                AsyncStorage.setItem('Voice', Text).then(() => {
                    setDescricao(Text);
                });
            } else {
                AsyncStorage.setItem('Voice', Audio).then(() => {
                    setDescricao(Audio);
                });
            };
        });
    };

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
                        { name: 'CameraForm', params: { vistoria: route, parametro: e } }
                    ]
                })
            );
        })
    };

    async function Salvar() {
        Keyboard.dismiss();
        if (AmbienteTextConfirm === "") {
            return console.log('Erro')
        };
        AsyncStorage.getItem('Parametro').then(e => {
            const Obj = { Id: e, Vistoria: Id, Titulo: AmbienteTextConfirm, Descricao: Descricao };
            SQLite.Database.transaction((db) => {
                db.executeSql("SELECT * FROM AmbientesOptions where title = ?", [AmbienteTextConfirm], (_, { rows }) => {
                    if (rows['length'] > 0) {
                        (async () => {
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

                    } else {
                        (async () => {
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

                    };
                });
            });
        });
    };

    return {
        Teclado, startSpeechToText, Salvar, AmbienteList, RemoveImage, Fotografar, stopSpeechToText, Recording, Descricao, Ambiente, setAmbiente, setDescricao, onDescricao, BtnSalvar, setBtnSalvar, Fotos, setFotos
    };
};

export default Funcoes;