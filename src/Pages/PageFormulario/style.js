import { StyleSheet } from 'react-native';
import Configs from '../../Configs';

const Style = StyleSheet.create({
    SafeAreaView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Configs.ColorWhite
    },
    SafeAreaView_Camera: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        backgroundColor: Configs.ColorWhite
    },
    Title: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleText: {
        fontWeight: 'bold',
        color: Configs.ColorGray200
    },
    ScrollView: {
        width: '100%',
        height: '100%'
    },
    ScrollViewContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 5,
        alignItems: 'center',
        marginBottom: '22%'
    },
    Comodos: {
        width: '100%',
        height: 60,
        borderRadius: 5,
        elevation: 5,
        marginTop: 5,
        marginBottom: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: Configs.ColorGray100
    },
    ComodosText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Configs.ColorGray200
    },
    ComodosBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: Configs.ColorGray200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fab: {
        backgroundColor: Configs.ColorPrimary,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 60,
        elevation: 15,
        height: 60,
        margin: 16,
        right: 0,
        bottom: 0,
    },
    CardContainer: {
        width: '100%',
        height: 80,
        marginTop:10,
        marginBottom: 10,
        alignItems: 'center'
    },
    Card: {
        width: '95%',
        height: 80,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: Configs.ColorGray100
    },
    CardText: {
        width: '100%',
        height: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    CardTextContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CardTextContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CardTextTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    CardTextEndereco: {
        fontSize: 11,
        fontWeight: '600'
    },
    AutoComplete: {
        borderRadius: 5,
        backgroundColor: Configs.ColorGray100,
        color: Configs.ColorGray,
        paddingLeft: 5,
        height: 50,
        fontSize: 15
    },
    rightButtonsContainerStyle: {
        right: 8,
        height: 30,
        alignSelf: 'center'
    },
    inputContainerStyle: {
        backgroundColor: Configs.ColorGray100,
        borderRadius: 5,
        elevation: 5,
        width: '95%',
        height: 50
    },
    suggestionsListContainerStyle: {
        backgroundColor: Configs.ColorGray100,
        borderColor: Configs.ColorGray200,
        borderWidth: 1,
        width: '95%',
        marginTop: 10
    },
    containerStyle: {
        maxHeight: 50,
        marginBottom: 10,
        flexGrow: 1,
        flexShrink: 1
    },
    ConmteinerInput: {
        width: '95%',
        minHeight: 50,
        maxHeight: 180,
        borderRadius: 5,
        marginTop: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        elevation: 5,
        backgroundColor: Configs.ColorGray100
    },
    Input:{
        maxHeight:'100%',
        minHeight: '100%',
        textAlign:'left',
        textAlignVertical: 'top',
        fontSize:15
    }
});

export default Style;