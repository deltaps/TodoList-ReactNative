import React, {useContext} from 'react'
import {Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {RoleContext, TokenContext, UsernameContext} from "../Context/Context";

import TodoListsScreen from "../Screen/TodoListsScreen";
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import AdminScreen from "../Screen/AdminScreen";
//TODO Finir l'ux design pour l'espace admin, et peut être faire la barre de progression.
const Tab = createBottomTabNavigator()

export default function Navigation () {
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken] = useContext(TokenContext)
    const [role,setRole] = useContext(RoleContext)
    return (
        <NavigationContainer>
            {token == null ? (
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen
                        name='Connexion'
                        component={SignInScreen}
                        options={{
                            tabBarIcon: () => (<Image source={require("./../assets/connexion.png")} style={{width: 20, height: 20}} />),
                            tabBarActiveTintColor:"#294936"
                        }}
                    />
                    <Tab.Screen
                        name='Inscription'
                        component={SignUpScreen}
                        options={{
                            tabBarIcon: () => (<Image source={require("./../assets/inscription.png")} style={{width: 20, height: 20}} />),
                            tabBarActiveTintColor:"#294936"
                        }}
                    />
                </Tab.Navigator>
            ) : (
               role == "admin" ? (
                   <Tab.Navigator screenOptions={{ headerShown: false }}>
                       <Tab.Screen
                           name='Home'
                           component={HomeScreen}
                           options={{
                               tabBarIcon: () => (<Image source={require("./../assets/home.png")} style={{width: 20, height: 20}} />),
                               tabBarActiveTintColor:"#294936"
                           }}
                       />
                       <Tab.Screen
                           name='TodoLists'
                           component={TodoListsScreen}
                           options={{
                               tabBarIcon: () => (<Image source={require("./../assets/todolists.png")} style={{width: 20, height: 20}} />),
                               tabBarActiveTintColor:"#294936"
                           }}
                       />
                       <Tab.Screen
                           name='SignOut'
                           component={SignOutScreen}
                           options={{
                               tabBarIcon: () => (<Image source={require("./../assets/exit.png")} style={{width: 17.5, height: 17.5}} />),
                               tabBarActiveTintColor:"#294936"
                           }}
                       />
                       <Tab.Screen
                           name='Admin'
                           component={AdminScreen}
                           options={{
                               tabBarIcon: () => (<Image source={require("./../assets/admin.png")} style={{width: 26, height: 26}} />),
                               tabBarActiveTintColor:"#294936"
                            }}
                       />
                    </Tab.Navigator>
               ) : (
                       <Tab.Navigator screenOptions={{ headerShown: false }}>
                       <Tab.Screen
                           name='Home'
                           component={HomeScreen}
                           options={{
                               tabBarIcon: () => (<Image source={require("./../assets/home.png")} style={{width: 20, height: 20}} />),
                               tabBarActiveTintColor:"#294936"
                           }}
                       />
                       <Tab.Screen
                           name='TodoLists'
                           component={TodoListsScreen}
                           options={{
                               tabBarIcon: () => (<Image source={require("./../assets/todolists.png")} style={{width: 20, height: 20}} />),
                               tabBarActiveTintColor:"#294936"
                           }}
                       />
                       <Tab.Screen
                           name='SignOut'
                           component={SignOutScreen}
                           options={{
                               tabBarIcon: () => (<Image source={require("./../assets/exit.png")} style={{width: 17.5, height: 17.5}} />),
                               tabBarActiveTintColor:"#294936"
                           }}
                       />
                       </Tab.Navigator>
                   )
                )}
        </NavigationContainer>
    )
}