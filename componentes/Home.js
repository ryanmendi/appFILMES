import React,{ useEffect, useState } from "react";
import { View,Text,StyleSheet,FlatList, TouchableOpacity,Alert } from "react-native";
import { firestore } from "../Firebase"; 
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 

export default function Home({navigation}) {
           
    const [filmes, setFilmes] = useState([]);

    async function deleteFilme(id) {
        try{
            await deleteDoc(doc(firestore,'tbfilmes',id));
            Alert.alert("O filme foi deletado.")
        }catch(error){
            console.error("Erro ao deletar.", error)
        }
    }
       
    useEffect(()=>{
        const unsubcribe = onSnapshot(collection(firestore,'tbfilmes'),(querySnapshot)=>{
            const lista = [];
            querySnapshot.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id});
            });
            setFilmes(lista);
        });
        return () => unsubcribe();
    },[]);

    return(
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo} >Lista de Filmes</Text>
            </View>
            <FlatList 
                data={filmes}
                renderItem={({item})=>{
                    return(
                        <View style={estilo.filmes}>
                            <TouchableOpacity onPress={()=>navigation.navigate("Alterar",{
                                id: item.id,
                                nomeFilme: item.nomeFilme,
                                diretorFilme: item.diretorFilme,
                                anoFilme: item.anoFilme
                            })}>
                                <View style={estilo.itens}>
                                    <Text> Filme: <Text>{item.nomeFilme}</Text></Text>
                                    <Text> Diretor: <Text>{item.diretorFilme}</Text></Text>
                                    <Text> Ano de lançamento: <Text>{item.anoFIlme}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View style={estilo.botaodeletar}>
                                <TouchableOpacity onPress={()=>{deleteFilme(item.id)}}>
                                <Text>X</Text>
                                </TouchableOpacity>    
                            </View>    
                        </View>    
                    );
                }}
            />
            <TouchableOpacity onPress={()=> navigation.navigate("Cadastrar")}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
        paddingTop: 20,
    },
    titulo: {
        marginTop: 50,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    itens: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    titulofilmes: {
        fontSize: 13,
        color: '#555',
    },
    textofilmes: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    filmes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    botaodeletar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    addbutton: {
        backgroundColor: '#6a9ae2',
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        bottom: 40,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
