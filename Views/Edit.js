import axios from 'axios';
import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

export default function edit({ route, navigation}) {
    const usr = route.params;

    const [name, onChangeName] = useState(usr.name)
    const [email, onChangeEmail] = useState(usr.email)
    const [password, onChangePassword] = useState()
    
    const user = {
        name: name,
        email: email,
        password: password,
    };

    function editUser() {
        axios.put('http://192.168.0.79/api/user/'+ usr.id, user)
         navigation.goBack();
    }
    
    return(
        <View>
            <Text style={styles.text}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={onChangeName} value={name}/>

            <Text style={styles.text}>Email:</Text>
            <TextInput keyboardType="email-address" style={styles.input} onChangeText={onChangeEmail} value={email}/>

            <Text style={styles.text}>Password:</Text>
            <TextInput secureTextEntry={true} style={styles.input} onChangeText={onChangePassword}/>

            <TouchableHighlight  style={styles.btn} onPress={()=>editUser()}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableHighlight>

        </View>
    );
}


//  <Text>{JSON.stringify(usr.id)}</Text> 

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        marginLeft: 15,
    },
    input: {
        padding: 10,
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