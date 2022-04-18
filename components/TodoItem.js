import React, {useContext, useEffect, useState} from "react";
import {Image, View, Text, StyleSheet, Switch, TouchableOpacity, ActivityIndicator} from 'react-native';
import {updateTaskList, updateTaskList2} from "../API/todoAPI";
import {TokenContext, UsernameContext} from "../Context/Context";

export default function TodoItem(props) {

    const [user,setUser] = useContext(UsernameContext)
    const [token,setToken] = useContext(TokenContext)
    const [done, setDone] = useState(props.item.done);
    const [id,setId] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const changeDone = (state) => {
        updateTaskList(token,id,state)
            .then(() => {
                setDone(state)
                props.onPressed(state ? 1 : -1)
            })
    }

    useEffect(() => {
        setId(props.id)
        changeDone(props.item.done)
    }, [props.item.done])

    return (props.beDone ?
        (
            <View style={styles.content}>
                {done ? (<Switch value={done} onValueChange={(state) => {changeDone(state)}} />) : null}
                {done ? (<Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>) : null}
                {done ? (
                    isLoading ? (
                            <ActivityIndicator size="small" color="#5B8266" />
                        ) : (
                            <TouchableOpacity onPress={() => {
                            setIsLoading(true)
                            props.deleteTodo(props.item.id)
                            }
                            }>
                                <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                            </TouchableOpacity>
                        )
                    ) : null}

            </View>
        ) :
    (props.beNotDone ?
        (
            <View style={styles.content}>
                {!done ? (<Switch value={done} onValueChange={(state) => {changeDone(state)}} />) : null}
                {!done ? (<Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>) : null}
                {!done ? (
                    isLoading ? (
                        <ActivityIndicator size="small" color="#5B8266" />
                    ) : (
                        <TouchableOpacity onPress={() =>
                    {
                        setIsLoading(true)
                        props.deleteTodo(props.item.id)
                    }
                    }>
                        <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                    </TouchableOpacity>)
                    ) : null}

            </View>
        )
        :
           (
               <View style={styles.content}>
                   <Switch value={done} onValueChange={(state) => {changeDone(state)}} />
                   <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
                   {isLoading ? (
                       <ActivityIndicator size="small" color="#5B8266" />
                   ) : (
                       <TouchableOpacity onPress={() => {
                       setIsLoading(true)
                       props.deleteTodo(props.item.id)
                   }}>
                       <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                   </TouchableOpacity>
                   )}


               </View>
           )
        )
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})