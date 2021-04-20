import axios from 'axios';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';



export default function CreateScreen({navigation}) {
    const [name, onChangeName] = useState()
    const [email, onChangeEmail] = useState()
    const [password, onChangePassword] = useState()
    
    const user = {
        name: name,
        email: email,
        password: password,
    };

    const novoUser = () => {
        axios.post('http://192.168.0.79/api/user', user)   
        navigation.goBack(); 
    }

    return(
        <View>
            <Text style={styles.text}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={onChangeName}/>

            <Text style={styles.text}>Email:</Text>
            <TextInput keyboardType="email-address" style={styles.input} onChangeText={onChangeEmail}/>

            <Text style={styles.text}>Password:</Text>
            <TextInput secureTextEntry={true} style={styles.input} onChangeText={onChangePassword}/>

            <TouchableHighlight  style={styles.btn} onPress={()=>novoUser()}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        marginLeft: 6,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        marginBottom: 25,
        marginLeft: 6,
        marginRight: 6,
    },

    btn: {
        backgroundColor: '#00aaff',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        marginLeft: 6,
        marginRight: 6,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff'
    }

});