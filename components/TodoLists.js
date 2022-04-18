import React, {useContext, useEffect, useState} from "react";
import {
    View,
    TextInput,
    ActivityIndicator,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';
import TodoItem from './TodoItem';
import {getTasks, createTask, deleteTask, updateTaskList} from "../API/todoAPI";
import {TokenContext, UsernameContext} from "../Context/Context";

export default function TodoLists(props){
    const [user,setUser] = useContext(UsernameContext)
    const [token,setToken] = useContext(TokenContext)
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(null);
    const [newTodoText, setNewTodoText] = useState("");
    const [shouldShow, setShouldShow] = useState(true);
    const [shouldDone, setShouldDone] = useState(false);
    const [shouldNotDone, setShouldNotDone] = useState(false);
    const [erreur,setErreur] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [inputIsLoading,setInputIsLoading] = useState(false);

    useEffect(() => {
        getTasks(props.id,token)
            .then(data => {
                setCount(data.filter((item)=>item.done).length),
                    setIsLoading(false)
                setTodos(data)
            })
            .catch(err => {
                setErreur(err)
            })
    },[])

    const onPressed = (offset) => {
        getTasks(props.id,token)
            .then(data => {
                setTodos(data)
                setCount(data.filter((item)=>item.done).length)
            })
            .catch(err => {
                setErreur(err)
            })
    }

    const deleteTodo = (id) => {
        deleteTask(token,id)
            .then(() => {
                getTasks(props.id,token)
                    .then(data => {
                        setTodos(data)
                        setCount(data.filter((item)=>item.done).length)
                    })
            })

    }

    const addNewTodo = () => {
        setInputIsLoading(true)
        createTask(newTodoText,token,props.id)
            .then(() => {
                getTasks(props.id,token)
                    .then(data => {
                        setTodos(data)
                        setCount(data.filter((item)=>item.done).length)
                        setInputIsLoading(false)
                    })
            })
    }

    const checkAllFunct = () => {
        const newTodos = todos.map(item => {return {id: item.id, content: item.content, done:true}})
        setTodos(newTodos)
        setCount(newTodos.length)
    }

    const checkNone = () => {
        setTodos(todos.map(item => {return {id: item.id, content: item.content, done:false}}))
        setCount(0)
    }

    return (
        <View>
            {isLoading ? (
                <View styles={styles.container}>
                    <ActivityIndicator size="large" color="#5B8266" />
                </View>
            ) : (
                <View style={[styles.container,{marginBottom:60}]}>
                    <Text style={{
                        marginTop:50,
                        marginBottom:20,
                        fontSize: 20,
                        fontWeight: "bold"}}>
                        {props.title}
                    </Text>
                    <Text>Barre de progression:</Text>
                    {todos == null ? (<></>) : (
                        <Text>{Math.round(100 * count / todos.length)}%</Text>
                    )}
                    {todos == null ? (
                        <ActivityIndicator size="large" color="#5B8266" />
                    ) : (
                        <View style={styles.progressBar}>
                            <Animated.View style={[StyleSheet.absoluteFill,{backgroundColor: '#8BED4F', width: 100*count/todos.length + "%"}]}></Animated.View>
                        </View>
                    )}

                    <Text style={{marginBottom:20}}>Il y a {count} slider cocher</Text>
                    {shouldShow ? (
                        <FlatList
                            style={{marginTop:10}}
                            data={todos}
                            renderItem={({item}) =>
                                <TodoItem onPressed = {onPressed} item={item} deleteTodo = {deleteTodo} beDone = {shouldDone} beNotDone = {shouldNotDone} id = {item.id} idUser = {props.idUser}/>
                            }
                        />
                    ) : <></>}


                    <View style={styles.inputView}>
                        <TextInput
                            style={[styles.TextInput,{marginLeft:10}]}
                            onChangeText={setNewTodoText}
                            placeholder='Saisir ici un nouveau todo'
                            onSubmitEditing={addNewTodo}
                            value={newTodoText}
                        />
                        {inputIsLoading ? (
                            <ActivityIndicator size="small" color="#5B8266" style={{marginRight:10}} />
                        ) : (<></>)}
                    </View>

                    <TouchableOpacity
                        style={shouldShow ? (styles.generalBtn) : ([styles.generalBtn,{backgroundColor: "grey"}])}
                        onPress={() => {
                            setShouldShow(!shouldShow)
                            setShouldDone(false)
                            setShouldNotDone(false)
                        }}
                    >
                        {shouldShow ? (
                            <Text>
                                Tout retirer
                            </Text>
                        ) : (
                            <Text>
                                Tout afficher
                            </Text>
                        )}

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={shouldDone ? ([styles.generalBtn,{backgroundColor: "grey"}]) : (styles.generalBtn)}
                        onPress={() => {
                            setShouldDone(!shouldDone)
                            setShouldNotDone(false)
                            setShouldShow(true)
                        }}
                    >
                        <Text>
                            Afficher les tâches déjà effectuées
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={shouldNotDone ? ([styles.generalBtn,{backgroundColor: "grey"}]) : (styles.generalBtn)}
                        onPress={() => {
                            setShouldNotDone(!shouldNotDone)
                            setShouldDone(false)
                            setShouldShow(true)
                        }}
                    >
                        <Text>
                            Afficher les tâches non effectuées
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.generalBtn}
                        onPress={() => checkAllFunct()}
                    >
                        <Text>
                            Cocher toutes les tâches
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.generalBtn}
                        onPress={() => checkNone()}
                    >
                        <Text>
                            Décocher toutes les tâches
                        </Text>
                    </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        backgroundColor: "#AEF6C7",
        borderRadius: 30,
        width: 270,
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

    generalBtn: {
        width: 270,
        borderRadius: 25,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5B8266",
        marginBottom:5,
    },
    progressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    }
});
