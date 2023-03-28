import { SafeAreaView } from 'react-native';
import FormCliente from './formCliente';
import FormCFuncionario from './formFuncionario';
import Funcoes from './Funcoes';
import style from './styleCliente';

function Login({ navigation }) {

    const { Modo, setModo } = Funcoes({ navigation });

    return (
        <SafeAreaView style={style.SafeAreaView}>
            {Modo === 'Cliente' && <FormCliente navigation={navigation} setModo={setModo} />}
            {Modo === 'Funcionario' && <FormCFuncionario navigation={navigation} setModo={setModo} />}
        </SafeAreaView>
    );
};


export default Login;