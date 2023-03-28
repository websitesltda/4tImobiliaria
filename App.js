import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from '@expo/vector-icons/FontAwesome';
import Configs from './src/Configs';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

//#region import pages
import Login from './src/Pages/PageLogin';
import Home from './src/Pages/PageHome';
import Vistoria from './src/Pages/PageVistoria';
import VistoriaList from './src/Pages/PageVistoriaList';
import Formulario from './src/Pages/PageFormulario';
import CameraForm from './src/Pages/PageCamera';

//#endregion

function DrawerPages() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerType: 'slide',
      drawerIcon: () => <Icon name='home' size={20} color={Configs.ColorGray200} />,
      drawerInactiveTintColor: Configs.ColorGray200,
      drawerActiveTintColor: Configs.ColorPrimary,
      headerTintColor: Configs.ColorWhite,
      headerTitleStyle: {
        color: Configs.ColorWhite
      },
      headerStyle: {
        backgroundColor: Configs.ColorPrimary
      }
    }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Vistoria" component={Vistoria} />
    </Drawer.Navigator>
  );
};

function DrawerPagesVistoria() {
  return (
    <Drawer.Navigator initialRouteName='Vistoria' screenOptions={{
      drawerType: 'slide',
      drawerIcon: () => <Icon name='home' size={20} color={Configs.ColorGray200} />,
      drawerInactiveTintColor: Configs.ColorGray200,
      drawerActiveTintColor: Configs.ColorPrimary,
      headerTintColor: Configs.ColorWhite,
      headerTitleStyle: {
        color: Configs.ColorWhite
      },
      headerStyle: {
        backgroundColor: Configs.ColorPrimary
      }
    }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Vistoria" component={Vistoria} />
    </Drawer.Navigator>
  );
};


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        drawerInactiveTintColor: Configs.ColorWhite,
        drawerActiveTintColor: Configs.ColorPrimary,
        headerTintColor: Configs.ColorWhite,
        headerTitleStyle: {
          color: Configs.ColorWhite
        },
        headerBackTitle:'Voltar',
        headerStyle: {
          backgroundColor: Configs.ColorPrimary
        }
      }} initialRouteName='HomePage'>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="HomePage" options={{ headerShown: false }} component={DrawerPages} />
        <Stack.Screen name="DrawerPagesVistoria" options={{ headerShown: false }} component={DrawerPagesVistoria} />
        <Stack.Screen name="VistoriaList" options={{ headerShown: true, headerTitle: '' }} component={VistoriaList} />
        <Stack.Screen name="Formulario" options={{ headerShown: true, headerTitle: '' }} component={Formulario} />
        <Stack.Screen name="CameraForm" options={{ headerShown: false, headerTitle: 'Camera' }} component={CameraForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;