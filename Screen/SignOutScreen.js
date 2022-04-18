import React, {useContext} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {TokenContext, UsernameContext} from "../Context/Context";
import {checkRole, signIn} from "../API/todoAPI";

export default function SignOutScreen ({ navigation, route }) {
    const [token, setToken] = useContext(TokenContext)
    const [user,setUser] = useContext(UsernameContext)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => {
                    setUser(null);
                    setToken(null);
                    navigation.navigate('Home');
                }}
            >
                <Text>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutBtn: {
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