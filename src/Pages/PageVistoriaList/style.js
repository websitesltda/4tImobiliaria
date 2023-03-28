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
        bottom: 0
    },
    fabSave: {
        backgroundColor: Configs.ColorGreen,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 60,
        elevation: 15,
        height: 60,
        margin: 16,
        left: 0,
        bottom: 0
    },
    CardContainer: {
        width: '100%',
        height: 120,
        marginBottom: 10,
        alignItems: 'center'
    },
    Card: {
        width: '95%',
        height: 120,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        backgroundColor: Configs.ColorGray100
    },
    CardImage: {
        width: '45%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: Configs.ColorWhite
    },
    CardImg: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    CardText: {
        width: '55%',
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
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    CardTextTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    CardTextEndereco: {
        fontSize: 11,
        fontWeight: '600'
    }
});

export default Style;