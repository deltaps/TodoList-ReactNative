import React, {useContext, useEffect, useState} from 'react'
import {
    View,
    Text,
    FlatList,
    TextInput,
    Animated,
    Image,
    TouchableOpacity,
    StyleSheet, ActivityIndicator
} from 'react-native'
import {getTaskList, createTaskList, deleteTaskList, checkRole} from "../API/todoAPI";
import {TokenContext,UsernameContext} from "../Context/Context";
import TodoLists from "../components/TodoLists";

export default function TodoListsScreen(){
    const [user,setUser] = useContext(UsernameContext)
    const [token,setToken] = useContext(TokenContext)
    const [erreur,setErreur] = useState(null)
    const [data,setData] = useState(null)
    const [nbTasks,setNbTasks] = useState(null)
    const [title,setTitle] = useState("")
    const [taskListId,setTaskListId] = useState(null)
    const [taskListTitle,setTaskListTitle] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [inputIsLoading,setInputIsLoading] = useState(false)
    const [idUser,setIdUser] = useState(null)
    const [progress,setProgress] = useState(null)

    useEffect(() => {
        getTaskList(user,token)
            .then(data => {
                setNbTasks(data.length)
                setData(data)
                checkRole(user,token)
                    .then(data => {
                        setIdUser(data[0].id)
                        setIsLoading(false)
                    })

            })
            .catch(err => {
                setErreur(err.message)
            })
    },[])

    const addTaskList = () => {
        setInputIsLoading(true)
        createTaskList(token,user,title)
            .then( () => {
                getTaskList(user,token)
                    .then(data => {
                        setNbTasks(data.length)
                        setIsLoading(false)
                        setData(data)
                        setInputIsLoading(false)
                    })
            })
    }

    const deleteTaskListFunction = (id) => {
        deleteTaskList(token,id)
            .then(() => {
                getTaskList(user,token)
                    .then(data => {
                        setNbTasks(data.length)
                        setIsLoading(false)
                        setData(data)
                    })
            })
    }

    return (
        taskListId != null ? (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => {
                        setTaskListTitle(null)
                        setTaskListId(null)
                    }}
                >
                    <Image source={require('../assets/back.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
                <TodoLists id = {taskListId} title = {taskListTitle} idUser={idUser}/>
            </View>
        ) : (
            isLoading ? (
                <ActivityIndicator size="large" color="#5B8266" style={{justifyContent: 'center', alignItems: 'center',flex: 1}}/>
            ) : (
                erreur != null ? (
                    <View style={styles.container}>
                        <Text style={{
                            marginTop: 50,
                            marginBottom:20,
                            fontSize: 20,
                            fontWeight: "bold"
                        }} >Bienvenue sans la liste des todos</Text>
                        <Text>{erreur}</Text>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text style={{
                            marginTop: 50,
                            marginBottom:20,
                            fontSize: 20,
                            fontWeight: "bold"
                        }}>Bienvenue dans la liste des todos</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={[styles.TextInput,{marginLeft:10}]}
                                onChangeText={setTitle}
                                placeholder='Saisir ici une nouvelle tasklist'
                                onSubmitEditing={addTaskList}
                                value={title}
                            />
                            {inputIsLoading ? (
                                <ActivityIndicator size="small" color="#5B8266" style={{marginRight:10}} />
                            ) : (<></>)}
                        </View>
                        <Text style={{marginBottom: 15}}>Vous possédez {nbTasks} tasksLists:</Text>
                        <FlatList data={data} renderItem={(item) =>
                            <View style={styles.todoListView}>
                                <TouchableOpacity
                                    style={styles.todoListBtn}
                                    onPress={() => {
                                        setTaskListId(item.item.id)
                                        setTaskListTitle(item.item.title)
                                    }}
                                >
                                    <Text>
                                        {item.item.title}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTaskListFunction(item.item.id)}>
                                    <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                                </TouchableOpacity>
                            </View>
                            }>
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

    todoListView :{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:15,
    },

    inputView: {
        flexDirection: 'row',
        backgroundColor: "#AEF6C7",
        borderRadius: 30,
        width: "80%",
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

    todoListBtn: {
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
    },

});