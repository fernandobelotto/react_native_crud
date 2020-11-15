import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './Views/ListScreen';
import CreateScreen from './Views/CreateScreen';
import Icon from 'react-native-vector-icons/Feather';
import { UsersProvider } from './context/UserContext';

const Stack = createStackNavigator();

const options = ({ navigation }) => {
  return {
    headerRight: () => {
      return (
        <Icon name="plus" size={20} style={{ marginRight: 15 }} onPress={() => navigation.navigate("CreateScreen")} />
      )
    },
    title: "Usuários",
  }
}
const CreateScreenOptions = {
  title: "Criação/Edicão",
}


function App() {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ListScreen" component={ListScreen} options={options} />
          <Stack.Screen name="CreateScreen" component={CreateScreen} options={CreateScreenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
}

export default App;