import { useState } from "react";
import { Keyboard } from "react-native";
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Configs from "../../../Configs";
import { useEffect } from "react";
import SQLite from "../../../SQLite/SQLite";

function Funcoes({ navigation, model }) {

    //#region Estancias
    const [Teclado, setTeclado] = useState(false);
    const [Ambientes, setAmbientes] = useState([]);
    //#endregion

    //#region KeyboardControl
    Keyboard.addListener("keyboardDidShow", () => {
        setTeclado(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
        setTeclado(false);
    });
    //#endregion

    //#region Avancar
    async function Avancar(route) {
        AsyncStorage.setItem('Voice', '')
        AsyncStorage.setItem('Parametro', Configs.Parametro());
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' },
                    { name: 'DrawerPagesVistoria' },
                    { name: 'VistoriaList', params: route },
                    { name: 'Formulario', params: { vistoria: route, model: null } }
                ]
            })
        );
    };
    //#endregion


    //#region Editar
    async function Editar(route, model) {
        AsyncStorage.setItem('Parametro', model.Id.toString());
        AsyncStorage.setItem('Voice', model.Descricao)
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' },
                    { name: 'DrawerPagesVistoria' },
                    { name: 'VistoriaList', params: route },
                    { name: 'Formulario', params: { vistoria: route, model: model } }
                ]
            })
        );
    };
    //#endregion

    //#region Salvar
    async function Salvar(Id) {
        AsyncStorage.setItem('Voice', '')
        await SQLite.Database.transaction((db) => {
            db.executeSql("UPDATE Vistorias SET Status = ? where Id = ? ", [true, Id]);
        });

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' },
                    { name: 'DrawerPagesVistoria' }
                ]
            })
        );
    };
    //#endregion

    async function BuscarAmbientes() {
        SQLite.Database.transaction((db) => {
            db.executeSql("SELECT * FROM Ambientes where Vistoria = ?", [model.Id], (_, { rows }) => {
                console.log(rows['_array']);
                if (rows['length'] > 0) {
                    setAmbientes(rows['_array']);
                } else {
                    setAmbientes([]);
                };
            });
        });
    };

    async function Deletar(model) {
        SQLite.DeleteAmbiente(model);
        BuscarAmbientes();
    };


    useEffect(() => {
        BuscarAmbientes();
    }, []);

    return {
        Teclado, Ambientes, Avancar, Salvar, Deletar, Editar
    };
};

export default Funcoes;