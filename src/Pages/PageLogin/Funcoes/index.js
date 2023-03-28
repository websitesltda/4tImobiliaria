import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { CommonActions } from '@react-navigation/native';
import Configs from "../../../Configs";

function Funcoes({ navigation }) {

    //#region Estancias
    const [Teclado, setTeclado] = useState(false);
    const [Modo, setModo] = useState('Cliente');
    const [Usuario, setUsuario] = useState('usuario');
    const [Senha, setSenha] = useState('bbbb5555');
    const [Erro, setErro] = useState(false);
    //#endregion

    useEffect(() => {
        // setSenha('');
    }, [Modo]);

    //#region KeyboardControl
    Keyboard.addListener("keyboardDidShow", () => {
        setTeclado(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
        setTeclado(false);
    });
    //#endregion

    //#region LogarCliente
    async function LogarCliente() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' }
                ]
            })
        );
    };
    //#endregion

    //#region LogarFuncionario
    async function LogarFuncionario() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' }
                ]
            })
        );
        // Keyboard.dismiss();
        // try {
        //     await fetch(Configs.API + `?username=${Usuario}&password=${Senha}`, {
        //         method: 'GET'
        //     }).then((response) => response.json())
        //         .then(e => {
        //             if (e.error) {
        //                 setErro(true);
        //             } else {
        //                 navigation.dispatch(
        //                     CommonActions.reset({
        //                         index: 1,
        //                         routes: [
        //                             { name: 'HomePage' }
        //                         ]
        //                     })
        //                 );
        //             };
        //         });
        // } catch (error) {
        //     console.log(error)
        // };
    };
    //#endregion

    return {
        Teclado, Modo, setModo, LogarCliente, LogarFuncionario, Erro, setErro, Usuario, setUsuario, Senha, setSenha
    };
};

export default Funcoes;