import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/FontAwesome';
import Configs from '../../Configs';
import Logo from './../../../assets/logo.png';
import style from './styleCliente';
import { Button, Dialog } from 'react-native-paper';
import Funcoes from './Funcoes';

function FormCliente({ navigation, setModo }) {

    const { Teclado, Erro, setErro, Usuario, setUsuario, Senha, setSenha } = Funcoes({ navigation });

    return (
        <View style={style.Container}>
            <StatusBar backgroundColor={Configs.ColorPrimary} barStyle="default" />
            
            <View style={style.Session1}>
                <Image style={style.Logo} resizeMode="contain" source={Logo} />
            </View>

            <View style={style.Session2}>

                <View style={style.Input}>
                    <Icon name='user' size={20} color={Configs.ColorGray200} />
                    <TextInput value={Usuario} onChangeText={(e) => setUsuario(e)} style={style.TextInput} autoCapitalize={false} autoCorrect={false} placeholder="Usuário" placeholderTextColor={Configs.ColorGray200} />
                </View>

                <View style={style.Input}>
                    <Icon name='lock' size={20} color={Configs.ColorGray200} />
                    <TextInput value={Senha} onChangeText={(e) => setSenha(e)} style={style.TextInput} secureTextEntry autoCapitalize={false} autoCorrect={false} placeholder="Senha" placeholderTextColor={Configs.ColorGray200} />
                </View>

                <View style={style.Session2Row}>
                    <View style={style.Lembrar}>
                        <TouchableOpacity style={style.LembrarButton}>

                        </TouchableOpacity>
                        <Text style={style.LembrarText}>LEMBRAR ME</Text>
                    </View>

                    <View style={style.Esquici}>
                        <TouchableOpacity style={style.EsquiciButton}>
                            <Text style={style.EsquiciText}>ESQUECI MINHA SENHA</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <View style={style.Session3}>

                <TouchableOpacity onPress={() => setErro(true)} style={style.BtnEntrar}>
                    <Text style={style.BtnEntrarText}>ENTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.BtnCadastrar}>
                    <Text style={style.BtnCadastrarText}>QUERO ME CADASTRAR</Text>
                </TouchableOpacity>

            </View>

            {!Teclado &&
                <View style={style.Session4}>

                    <TouchableOpacity onPress={() => setModo('Cliente')} style={style.BtnCliente}>
                        <Text style={style.BtnClienteText}>ÁREA DO CLIENTE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModo('Funcionario')} style={style.BtnFuncionario}>
                        <Text style={style.BtnFuncionarioText}>FUNCIONÁRIO</Text>
                    </TouchableOpacity>

                </View>
            }

            <Dialog visible={Erro} dismissable={false} style={{ borderRadius: 5 }}>
                <Dialog.Title>Atenção</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Login não permitido !</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setErro(false)}>Ok</Button>
                </Dialog.Actions>
            </Dialog>

        </View>
    );
};

export default FormCliente;