import React, { useState, useEffect} from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View} from 'react-native';

import axios from 'axios';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';


export default function Index({navigation}) {
    const [user, setUser] = useState([]); // Variável com os dados dos usuários
    const [load, setLoad] = useState(false); // Variavel para dar recarregar dados da tela
    const [modal, setModal] = useState(false);

   //Recarregar a tela com os novos dados de usuários
   const recarregar = () => {
     console.log('Recarregado');
     axios.get('http://192.168.0.79/api/user') // faz a busca dos usuários na api
     .then(data => setUser(data.data)) // passa os dados para a variável
    }
   
   
   //A função abixo é usado para atualizar a lista toda vez que o index estiver em foco
   useEffect(() => {
     const unsubscribe = navigation.addListener('focus', () => {
        setLoad(!load);
        recarregar();
     });
     return unsubscribe;
   }, [navigation, load]);


   function destroy(id) {
       axios.delete('http://192.168.0.79/api/user/' + id)
        .then(()=>{
            recarregar()
        })
   }


   //O que vai ser visto dentro da lista
   const listaUsuario = ({item})=>(
       <View style={styles.viewItem}>
           <Text style={styles.item}>{item.name}</Text>
           <TouchableHighlight style={styles.btnItem} onPress={()=>navigation.push('Edit', {id: item.id, name: item.name, email: item.email})}>
               <Text style={styles.textList}>Editar</Text>
           </TouchableHighlight>
           <TouchableHighlight style={styles.btnExItem} onPress={()=>setModal(!modal)}>
               <Text style={styles.textList}>Excluir</Text>
           </TouchableHighlight>
       </View>
   );

   //Chama tela de edição de usuário.

   //Retorno da tela
 return(
       <View style={styles.container} >
           <TouchableHighlight style={styles.btn} onPress={()=>navigation.push('Create')}>
               <Text style={styles.textBtn}>Novo</Text>
           </TouchableHighlight>
         <FlatList 
           data={user}
           renderItem={listaUsuario}
           keyExtractor={(item, index)=>item.id.toString()}
         >
             
         </FlatList>
         <Modal 
            animationType = 'slide'
            transparent={true}
            visible = {modal}

            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setModalVisible(!modal);
            }}
         >
             
             <View style={styles.modalView}>
                <View>
                    <Text>Desejá realmente exluir o item?</Text>
                    <View style={styles.btnConfirm}>
                        <TouchableHighlight style={styles.btn}>
                            <Text style={styles.textBtnS}>Sim</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.btn}>
                            <Text style={styles.textBtnN}>Não</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                 
             </View>
         </Modal>
       </View>
     );
   
   }

   
   const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    btn: {
        backgroundColor: '#00aaff',
        borderRadius: 5, 
        padding: 7,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 5,
    },
    textBtn: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
     },
    viewItem: {
        marginTop: 10,
        marginRight: 10,
        flex: 1,
        flexDirection: "row",
    },
    item: {
      flex: 1,
      padding: 10,
      fontSize: 18,
      height: 44,
    },

    btnItem: {
        flex: 3,
        backgroundColor: '#ffae00',
        padding: 13,
        borderRadius: 10,
    },
    btnExItem: {
        marginLeft: 10,
        flex: 3,
        backgroundColor: '#ff3c4d',
        padding: 13,
        borderRadius: 10,
    },
    textList: {
       color: '#fff',
       textAlign: 'center',
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      btnConfirm: {
          flexDirection: 'row',
      },
      textBtnS:{
        flex: 3,
        backgroundColor: '#ffae00',
        padding: 13,
        borderRadius: 10,
      }
  });
  