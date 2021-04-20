import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IndexScreen from './Views/Index'
import CreateScreen from './Views/Create';
import EditScreen from './Views/Edit';

const Stack = createStackNavigator();

export default App = () => {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  name="Home" component={IndexScreen} options = {{title : 'Lista de usuários' }} />
          <Stack.Screen name="Create" component={CreateScreen} options = {{title : 'Novo usuário' }}/>
          <Stack.Screen name="Edit" component={EditScreen} options = {{title : 'Editar' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}
