import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddNote from '../screen/AddNoteScreen';
import NoteScreen from '../screen/NoteScreen';
import {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const StackNavigator = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Root" component={NoteScreen} />
        <Stack.Screen name="AddNote" component={AddNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
