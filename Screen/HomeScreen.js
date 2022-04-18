import React, {useContext, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {RoleContext, UsernameContext} from "../Context/Context";


export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    const [role,setRole] = useContext(RoleContext)
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
                Bienvenue!
            </Text>
            <View style={{flexDirection: 'row',marginBottom:10}}>
                <Text>Vous êtes actuellement connecté en tant que</Text>
                <Text style={{color:"#3E6259",fontWeight: "bold"}}> {username}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text>Votre rôle est</Text>
                <Text style={{color:"#3E6259",fontWeight: "bold"}}> {role}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});