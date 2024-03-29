import 'react-native-gesture-handler';
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from "./navigation/CustomDrawer";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

const Stack = createNativeStackNavigator();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default function App (){
    return (
        <Provider store={store}>
            <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
                >
                <Stack.Screen
                    name="Home"
                    component={CustomDrawer}
                />
            </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
