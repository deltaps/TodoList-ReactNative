import React, {useContext, useState} from 'react'
import {Text, Button, TextInput, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
import {TokenContext, UsernameContext,RoleContext} from "../Context/Context";
import {checkRole, signIn} from "../API/todoAPI";
import {Link} from "@react-navigation/native";

export default function SignInScreen () {
    const [token, setToken] = useContext(TokenContext)
    const [user,setUser] = useContext(UsernameContext)
    const [role,setRole] = useContext(RoleContext)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [erreur,setErreur] = useState(null)
    const [isLoading,setIsLoading] = useState(false)

    return( <View style={styles.container}>
        <Text
            style={{
                marginBottom:60,
                fontSize: 40,
                fontWeight: "bold"
            }}
        >
            TodoList
        </Text>
        <Text
            style={{
                marginBottom:10,
                fontSize: 20,
                fontWeight: "bold"
            }}
        >
            Connexion
        </Text>
        {erreur != null ? <Text style={{color:"red",marginBottom:10}}>{erreur}</Text> : <></>}

        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Identifiant"
                placeholderTextColor="#003f5c"
                onChangeText={data => setUsername(data)}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                onChangeText={data => setPassword(data)}
                placeholder="Mot de passe"
                placeholderTextColor="#003f5c"
            />
        </View>
        {isLoading ? (
            <ActivityIndicator size="large" color="#5B8266"/>
        ) : (
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() =>
                {
                    setIsLoading(true)
                    signIn(username, password)
                        .then(token => {
                            setToken(token)
                            setUser(username)
                            setIsLoading(false)
                            checkRole(username,token)
                                .then((data) => {
                                    setRole(data[0].roles[0])
                                })
                                .catch((error) => {
                                    setErreur(error)
                                })
                            props.navigate('Home')
                        })
                        .catch(err => {
                            setIsLoading(false)
                            setErreur(err.message)
                        })}
                }

            >
                <Text>Connexion</Text>
            </TouchableOpacity>
        )}
        <Text>
            Pas encore de compte?{' '}
            <Link
                style={{
                    textDecorationLine: 'underline',
                    color:'#294936',
                    fontWeight: "bold"

            }}
                to={{ screen: 'Inscription' }}
            >
                Créé en un!
            </Link>
        </Text>
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputView: {
        backgroundColor: "#AEF6C7",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        width: "80%",
        alignItems:"center",
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#5B8266",
        marginBottom:10
    },
});
/*
<Button
            title="Connexion"
            style={styles.loginButton}
            onPress={() => signIn(username, password)
                .then(token => {
                    setToken(token)
                    setUser(username)
                    checkRole(username,token)
                        .then((data) => {
                            setRole(data[0].roles[0])
                        })
                        .catch((error) => {
                            setErreur(error)
                        })
                    props.navigate('Home')
                })
                .catch(err => {
                    setErreur(err.message)
                })}
        />
 */

