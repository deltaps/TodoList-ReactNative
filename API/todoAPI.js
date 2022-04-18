//const API_URL = 'http://10.212.6.86:4000' // Ip de mon ordinateur, pour ce connecter avec un appareil connecter au même réseau que la machine
const API_URL = 'http://127.0.0.1:4000/' //Ip localhost pour ce connecter a la bdd sur la même machine
//Possibilité d'ajouter l'ip de ça box, avec ces port ouvert sur le port 4000 en TCP, dans ce cas il est possible de ce connecter a la bdd avec n'importe qu'elle réseau (mais il faut que la machine soit en permanence activée)
const SIGN_IN =
    'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'
const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'
const TASK_LIST =
    'query taskLists($username: String!) {taskLists(where: { owner: { username: $username } }) {id title}}'
const TASKS =
    'query tasks($id: ID) {tasks(where: { belongsTo: { id: $id}}) {id content done}}'
const CREATETASK =
    'mutation($id: ID,$content: String!){createTasks(input: {content: $content, belongsTo: {connect: {where: {id: $id}}}}){tasks{id,content}}}'
const DELETETASK =
    'mutation($id:ID){deleteTasks(where:{id:$id}){nodesDeleted}}'
const UPDATETASK =
    'mutation($id:ID,$done:Boolean) {updateTasks(where: { id: $id },update: { done: $done }){tasks{id}}}'
const CHECKALL =
    'mutation($id: ID) {updateTasks(where: { belongsTo: { id: $id } }, update: { done: true }) {tasks {id,content,done}}}'
const CREATETASKLIST =
    'mutation($username: String!, $title: String!) {createTaskLists(input: {title: $title, owner: { connect: { where: { username: $username } } }}) {taskLists {id, title, owner {id , username}}}}'
const DELETETASKLIST =
    'mutation($id:ID){deleteTaskLists(where:{id:$id}){nodesDeleted}}'
const CHECKROLE =
    'query($username:String){users(where:{username:$username}){roles,id}}'
const USERS =
    'query($username:String){users(where:{username_NOT:$username}){username,roles,id}}'
const DELETEUSER =
    'mutation($id:ID) {deleteUsers(where: { id:$id }) {nodesDeleted}}'

export function signIn (username, password) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_IN,
            variables: {
                username: username,
                password: password
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.signIn
        })
        .catch(error => {
            throw error
        })
}

export function signUp (username, password) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_UP,
            variables: {
                username: username,
                password: password
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.signUp
        })
        .catch(error => {
            throw error
        })
}

export function getTaskList (username,token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: TASK_LIST,
            variables: {
                username: username,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.taskLists
        })
        .catch(error => {
            throw error
        })
}
export function getTasks(id,token){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: TASKS,
            variables: {
                id: id,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.tasks
        })
        .catch(error => {
            throw error
        })
}
export function createTask(content,token,id){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: CREATETASK,
            variables: {
                content: content,
                id: id,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.createTasks
        })
        .catch(error => {
            throw error
        })
}

export function deleteTask(token,id){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: DELETETASK,
            variables: {
                id: id,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.deleteTasks
        })
        .catch(error => {
            throw error
        })
}
export function createTaskList(token,username,title){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: CREATETASKLIST,
            variables: {
                username: username,
                title: title,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.createTaskLists
        })
        .catch(error => {
            throw error
        })
}
export function deleteTaskList(token,id){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: DELETETASKLIST,
            variables: {
                id:id,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.deleteTaskLists
        })
        .catch(error => {
            throw error
        })
}
export function updateTaskList(token,id,done){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: UPDATETASK,
            variables: {
                id:id,
                done:done,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.updateTasks
        })
        .catch(error => {
            throw error
        })
}
export function updateTaskList2(token,id,done,title){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: UPDATETASK2,
            variables: {
                id:id,
                done:done,
                title:title,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.updateTasks
        })
        .catch(error => {
            throw error
        })
}
export function checkRole(username,token){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: CHECKROLE,
            variables: {
                username:username,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.users
        })
        .catch(error => {
            throw error
        })
}

export function users(username,token){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: USERS,
            variables: {
                username:username,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.users
        })
        .catch(error => {
            throw error
        })
}

export function deleteUsers(id,token){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: DELETEUSER,
            variables: {
                id:id,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.deleteUsers
        })
        .catch(error => {
            throw error
        })
}
export function checkAll(id,token){
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({
            query: CHECKALL,
            variables: {
                id:id,
            }
        })
    })
        .then(response => {
            //console.log("Response", response.json())
            return response.json()
        })
        .then(jsonResponse => {
            //console.log("Json",jsonResponse)
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.updateTasks
        })
        .catch(error => {
            throw error
        })
}
