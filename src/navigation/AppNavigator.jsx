import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Onboarding from '../screens/Onboarding';
import WelcomeScreen from '../screens/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* Add your Home Screen here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
