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
    Container: {
        width: '100%',
        height: '90%'
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
        height: '100%'
    },
    CardTextContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    CardTextContainer: {
        width: '100%',
        height: '70%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    CardTextTitle: {
        fontWeight: 'bold'
    },
    CardTextEndereco: {
        fontSize: 11,
        fontWeight: '600'
    },
    CardTextButton: {
        width: '100%',
        height: '30%',
        alignItems: 'flex-end'
    },
    CardButton: {
        minWidth: 70,
        height: '80%',
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    CardButtonText: {
        color: Configs.ColorWhite,
        fontSize: 12
    }
});

export default Style;