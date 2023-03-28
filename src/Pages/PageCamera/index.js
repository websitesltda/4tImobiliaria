import { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import Configs from "../../Configs";
import { Camera } from 'expo-camera';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import SQLite from "../../SQLite/SQLite";
import { CommonActions } from '@react-navigation/native';
// import * as NavigationBar from 'expo-navigation-bar';

function CameraForm({ navigation, route }) {

    const CameraRef = useRef(null);
    const [Flash, setFlash] = useState(false);

    async function OnFotografar() {
        const Options = { quality: 0, base64: false, skipProcessing: true };
        const Foto = await CameraRef.current.takePictureAsync(Options);

        const Url = Foto.uri;
        const NomeImage = Url.substring(Url.lastIndexOf('/') + 1);
        const Estencao = NomeImage.split('.').pop();

        const FotoApp = new FormData();
        FotoApp.append("file", { uri: Url, name: NomeImage, type: 'image/' + Estencao });

        const obj = { Ambiente: route.params.parametro, Image: Url };

        (async () => {
            await SQLite.InsertImagen(obj);
        })();

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' },
                    { name: 'DrawerPagesVistoria' },
                    { name: 'VistoriaList', params: route.params.vistoria },
                    { name: 'Formulario', params: { vistoria: route.params.vistoria, model: route.params.model } }
                ]
            })
        );

        // (async () => {
        //     await NavigationBar.setVisibilityAsync("visible");
        // })();

    };

    useEffect(() => {
        (async () => {
            // await NavigationBar.setVisibilityAsync("hidden");
            // await NavigationBar.setBehaviorAsync('overlay-swipe')
            await Camera.requestCameraPermissionsAsync();
        })()
    }, []);

    function Back() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' },
                    { name: 'DrawerPagesVistoria' },
                    { name: 'VistoriaList', params: route.params.vistoria },
                    { name: 'Formulario', params: { vistoria: route.params.vistoria, model: route.params.model } }
                ]
            })
        );
    };

    return (
        <View style={
            {
                width: '100%',
                height: '100%',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <View style={
                {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: Configs.ColorBlack
                }} />


            <Camera ref={CameraRef} style={{ width: '100%', height: '100%', justifyContent: 'center' }} flashMode={Flash ? 'on' : 'off'} ratio={'16:9'} type={Camera.Constants.Type.back} >
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{ width: '100%', height: 90, position: 'absolute', bottom: 0, marginBottom: 30, paddingHorizontal: 80, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={Back} style={{ width: 50, height: 50, backgroundColor: Configs.ColorWhite, borderRadius: 70, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chevron-left-circle" size={30} color={Configs.ColorPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => OnFotografar()} style={{ width: 70, height: 70, backgroundColor: Configs.ColorWhite, borderRadius: 70, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="camera" size={30} color={Configs.ColorPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFlash(!Flash)} style={{ width: 50, height: 50, backgroundColor: Configs.ColorWhite, borderRadius: 70, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={Flash ? "flash" : "flash-off"} size={30} color={Flash ? Configs.ColorPrimary : Configs.ColorGray200} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>

        </View>
    );
};

export default CameraForm;