import { StyleSheet } from 'react-native';
import Configs from '../../Configs';

const Style = StyleSheet.create({
    SafeAreaView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Configs.ColorWhite
    },
    Container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Configs.ColorPrimary
    },
    Session1: {
        width: '100%',
        height: '30%'
    },
    Session2: {
        width: '100%',
        height: '35%',
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: 25
    },
    Session3: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    Session4: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Configs.ColorWhite
    },
    Logo: {
        width: '100%',
        height: '100%'
    },
    Input: {
        width: '100%',
        height: 50,
        marginBottom: 7,
        borderRadius: 5,
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'row',
        backgroundColor: Configs.ColorWhite
    },
    TextInput:{
        marginLeft:10,
        height:'100%',
        fontSize:13,
        width:'90%',
        color:Configs.ColorBlack
    },
    Session2Row: {
        width: '100%',
        height: 25,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Lembrar: {
        width: '50%',
        height: 20,
        flexDirection: 'row'
    },
    LembrarButton: {
        width: 17,
        height: 17,
        borderRadius: 3,
        backgroundColor: Configs.ColorWhite
    },
    LembrarText: {
        fontSize: 12,
        fontWeight: '400',
        color: Configs.ColorWhite,
        marginLeft: 3
    },
    Esquici: {
        width: '50%',
        height: 20,
        flexDirection: 'row'
    },
    EsquiciButton: {
        width: '100%',
        height: 17,
        alignItems: 'flex-end'

    },
    EsquiciText: {
        fontSize: 12,
        fontWeight: '400',
        color: Configs.ColorWhite,
        marginLeft: 3
    },
    BtnEntrar: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: Configs.ColorWhite
    },
    BtnEntrarText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Configs.ColorGray
    },
    BtnCadastrar: {
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    BtnCadastrarText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: Configs.ColorWhite
    },
    BtnCliente: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 40,
        backgroundColor: Configs.ColorPrimary
    },
    BtnClienteText: {
        fontWeight: 'bold',
        color:Configs.ColorWhite
    },
    BtnFuncionario: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Configs.ColorWhite
    },
    BtnFuncionarioText: {
        fontWeight: 'bold',
        color:Configs.ColorGray
    },
});

export default Style;