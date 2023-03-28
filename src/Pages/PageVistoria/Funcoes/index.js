import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { CommonActions } from '@react-navigation/native';
import SQLite from "../../../SQLite/SQLite";

function Funcoes({ navigation }) {

    //#region Estancias
    const [Teclado, setTeclado] = useState(false);
    const [Imoveis, setImoveis] = useState([]);
    //#endregion

    //#region KeyboardControl
    Keyboard.addListener("keyboardDidShow", () => {
        setTeclado(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
        setTeclado(false);
    });
    //#endregion

    //#region BuscarVistorias
    async function BuscarVistorias() {
        setImoveis([]);
        const Model = [
            { Id: 1, Tipo: 'Casa', Rua: 'Rua Floriano Peixoto', Numero: '71', Bairro: 'Jardim Coolapa', Cidade: 'São Sebastião do Paraiso', Estado: 'MG', Image: 'https://grupospimovel.s3.amazonaws.com/Imagens/Noticias/Sistema/mercado-imobiliario/0201_valor_venal_b.jpg' },
            { Id: 2, Tipo: 'Apartamento', Rua: 'Av dos Emigrantes', Numero: '351', Bairro: 'Centro', Cidade: 'São Sebastião do Paraiso', Estado: 'MG', Image: 'https://www.melnick.com.br/wp-content/uploads/2022/04/20170403-5-diferenciais-de-quem-vive-em-um-apartamento-de-alto-padrao.jpeg' },
            { Id: 3, Tipo: 'Apartamento', Rua: 'Av dos Emigrantes', Numero: '985', Bairro: 'Centro', Cidade: 'São Sebastião do Paraiso', Estado: 'MG', Image: 'https://www.melnick.com.br/wp-content/uploads/2022/04/20170403-5-diferenciais-de-quem-vive-em-um-apartamento-de-alto-padrao.jpeg' },
            { Id: 4, Tipo: 'Fazenda', Rua: 'Morro Vermelho', Numero: 'TAB589', Bairro: 'Zona Rural', Cidade: 'São Sebastião do Paraiso', Estado: 'MG', Image: 'https://s2.glbimg.com/PkAJ2BkF_dFex7M9JqMhJB8zUz4=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/B/8/GLxRVASxmeYcMAtKACTw/nc-fazenda-itu-061220.jpg' }
        ];
        // (async () => {
        //     await SQLite.TruncateVistorias()
        // })();
        Model.map(e => {
            (async () => {
                await SQLite.InsertVistoria(e);
            })();
        });
        (async () => {
            await SQLite.Database.transaction((db) => {
                db.executeSql("SELECT * FROM Vistorias", [], (_, { rows }) => {
                    if (rows['length'] > 0) {
                        setImoveis(rows['_array']);
                    } else {
                        setImoveis([]);
                    };
                });
            });
        })();
    };
    //#endregion

    useEffect(() => {
        setTimeout(() => {
            BuscarVistorias();
        }, 2000);
    }, []);

    //#region Avancar
    async function Avancar(model) {

        await SQLite.Database.transaction((db) => {
            db.executeSql("UPDATE Vistorias SET Status = ? where Id = ? ", [false, model.Id]);
        });

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' },
                    { name: 'DrawerPagesVistoria' },
                    { name: 'VistoriaList', params: model }
                ]
            })
        );
    };
    //#endregion 

    return {
        Teclado, Imoveis, Avancar, BuscarVistorias
    };
};

export default Funcoes;