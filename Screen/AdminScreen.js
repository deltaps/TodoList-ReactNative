import React, {useContext, useEffect, useState} from 'react'
import {View, Text, Button, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator} from 'react-native'
import {TokenContext, UsernameContext} from "../Context/Context";
import {deleteTaskList, deleteUsers, getTaskList, users} from "../API/todoAPI";
import TodoLists from "../components/TodoLists";
import {Touchable} from "react-native-web";
//TODO pouvoir changer le slider pour tout les utilisateurs (tous marche sinon)

export default function AdminScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    const [token,setToken] = useContext(TokenContext)

    const [allUsers,setAllUsers] = useState(null)
    const [nbUsers,setNbUsers] = useState(0)
    const [actualUser,setActualUser] = useState(null)
    const [idUser,setIdUser] = useState(null)

    const [todoListUser,setTodoListUser] = useState(null)
    const [nbTasksUser,setNbTasksUser] = useState(0)
    const [taskListIdUser,setTaskListIdUser] = useState(null)
    const [taskListNameUser,setTaskListNameUser] = useState(null)
    const [erreur,setErreur] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [deleteUserLoading,setDeleteUserLoading] = useState(false)

    useEffect(() => {
        users(username,token)
            .then(data => {
                setAllUsers(data)
                setNbUsers(data.length)
                setIsLoading(false)
            })
            .catch(err => {
                setErreur(err.message)
            })
    },[])

    const deleteUserFunction = (id) => {
        deleteUsers(id,token)
            .then(() => {
                users(username,token)
                    .then(data => {
                        setAllUsers(data)
                        setNbUsers(data.length)
                        setDeleteUserLoading(false)
                    })
            })
    }

    const deleteTaskListFunction = (id) => {
        deleteTaskList(token,id)
            .then(() => {
                getTaskList(actualUser,token)
                    .then(data => {
                        setNbTasksUser(data.length)
                        setTodoListUser(data)
                        setIsLoading(false)
                    })
            })
    }

    return (

        taskListIdUser != null ? (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => {
                        setTaskListNameUser(null)
                        setTaskListIdUser(null)
                    }}
                >
                    <Image source={require('../assets/back.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
                <Text style={{
                    textAlign:"center",
                    marginTop:100,
                    fontSize: 20,
                    fontWeight: "bold"}}>
                    Utilisateur {actualUser}
                </Text>
                <TodoLists id = {taskListIdUser} title = {taskListNameUser} idUser = {idUser}/>
            </View>
        ) : (
            actualUser != null ? (
                isLoading ? (
                    <ActivityIndicator size="large" color="#5B8266" style={{justifyContent: 'center', alignItems: 'center',flex: 1,}}/>
                ) : (
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.goBackButton}
                            onPress={() => {
                                setActualUser(null)
                            }}
                        >
                            <Image source={require('../assets/back.png')} style={{ height: 35, width: 35 }} />
                        </TouchableOpacity>
                        <Text style={{
                            marginTop: 90,
                            marginBottom:20,
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign:"center",
                        }}>L'utilisateur {actualUser} possède {nbTasksUser} todolists :</Text>
                        <FlatList data={todoListUser} renderItem={(item) =>
                            <View style={styles.generalListView}>
                                <TouchableOpacity
                                    style={styles.generalBtn}
                                    onPress={() => {
                                        setTaskListIdUser(item.item.id)
                                        setTaskListNameUser(item.item.title)
                                    }}
                                >
                                    <Text>{item.item.title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTaskListFunction(item.item.id)}>
                                    <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                                </TouchableOpacity>
                            </View>}>
                        </FlatList>
                    </View>
                    )
            ) : (
                isLoading ? (
                    <ActivityIndicator size="large" color="#5B8266" style={{justifyContent: 'center', alignItems: 'center',flex: 1,}}/>
                ) : (
                    <View style={styles.container}>
                        <Text style={{
                            marginTop: 50,
                            marginBottom:20,
                            fontSize: 20,
                            fontWeight: "bold"
                        }}>Bienvenue dans la section admin</Text>
                        <Text style={{marginBottom:20}}>Il y a actuellement {nbUsers} utilisateurs inscrit sur l'application</Text>
                        <FlatList data={allUsers} renderItem={(user) =>
                            <View>
                                <Text style={{marginBottom: 10}}>Nom de l'utilisateur : {user.item.username}</Text>
                                <View style={styles.generalListView}>
                                    <TouchableOpacity
                                        style={styles.generalBtn}
                                        onPress={() => {
                                            setIsLoading(true);
                                            getTaskList(user.item.username,token)
                                                .then(data => {
                                                    setIdUser(user.item.id)
                                                    setNbTasksUser(data.length)
                                                    setIsLoading(false)
                                                    setTodoListUser(data)
                                                })
                                                .catch(err => {
                                                    setErreur(err.message)
                                                })
                                            setActualUser(user.item.username)
                                        }}
                                    >
                                        <Text>TodoLists de {user.item.username}</Text>
                                    </TouchableOpacity>
                                    {deleteUserLoading ? (
                                        <ActivityIndicator size="small" color="#5B8266" />
                                    ) : (
                                        <TouchableOpacity onPress={() =>
                                            {
                                                setDeleteUserLoading(true)
                                                deleteUserFunction(user.item.id)
                                            }

                                        }>
                                            <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                                        </TouchableOpacity>
                                    )}

                                </View>
                            </View>}>
                        </FlatList>
                    </View>
                    )
            )
        )

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    generalListView :{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:15,
    },

    generalBtn: {
        width: "85%",
        borderRadius: 25,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5B8266",
    },
    goBackButton:{
        marginTop:30,
        position: 'absolute',
        top: 5,
        left: 5,
        right: 0,
        bottom: 0,
    }
});