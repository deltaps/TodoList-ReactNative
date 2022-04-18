import React, {useContext, useState} from 'react'
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
import {RoleContext, TokenContext, UsernameContext} from "../Context/Context";
import {checkRole, signIn, signUp} from "../API/todoAPI";

export default function SignUpScreen () {
    const [token, setToken] = useContext(TokenContext)
    const [user,setUser] = useContext(UsernameContext)
    const [role,setRole] = useContext(RoleContext)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [passwordCorrect,setPasswordCorrect] = useState(false)
    const [erreur,setErreur] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const checkPassword = (pass) => {
        setPasswordCorrect(pass == password)
    }


    return (
        <View style={styles.container}>
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
                Inscription
            </Text>
            {erreur != null ? (<Text style={{color:"red",marginBottom:10}}>{erreur}</Text>) : (<></>)}

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
                    placeholder="Mot de passe"
                    placeholderTextColor="#003f5c"
                    onChangeText={data => setPassword(data)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    secureTextEntry={true}
                    placeholderTextColor="#003f5c"
                    placeholder="Vérification mot de passe"
                    onChangeText={data => checkPassword(data)}
                />
            </View>
            {passwordCorrect ? (
                isLoading ? (
                    <ActivityIndicator size="large" color="#5B8266"/>
                ) : (
                    <TouchableOpacity
                        style={styles.signUpBtn}
                        onPress={() =>
                        {
                            setIsLoading(true)
                            signUp(username, password)
                                .then(token => {
                                    setIsLoading(false)
                                    setToken(token)
                                    setUser(username)
                                    checkRole(username,token)
                                        .then((data) => {
                                            setRole(data[0].roles[0])
                                            //console.log(data[0].roles[0])
                                        })
                                        .catch((error) => {
                                            setErreur(error)
                                        })
                                    props.navigate('Home')
                                })
                                .catch(err => {
                                    setIsLoading(false)
                                    setErreur(err.message)
                                    console.log("Erreur")
                                    //setError(err.message)
                                })}
                        }
                    >
                        <Text>Inscription</Text>
                    </TouchableOpacity>
                    )
            ) : (
                <TouchableOpacity
                    style={styles.signUpBtnDisabled}
                    disabled={true}
                    onPress={() => signUp(username, password)
                        .then(token => {
                            setToken(token)
                            setUser(username)
                            checkRole(username,token)
                                .then((data) => {
                                    setRole(data[0].roles[0])
                                    //console.log(data[0].roles[0])
                                })
                                .catch((error) => {
                                    setErreur(error)
                                })
                            props.navigate('Home')
                        })
                        .catch(err => {
                            setErreur(err.message)
                            console.log("Erreur")
                            //setError(err.message)
                        })}
                >
                    <Text>Veuillez saisir les mêmes mots de passe</Text>
                </TouchableOpacity>
            )}
        </View>
    )
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
    },

    signUpBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#5B8266",
        marginBottom:10
    },
    signUpBtnDisabled:{
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "grey",
        marginBottom:10
    }
});