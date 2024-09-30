import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarFilmes({navigation, route}) {

    const id = route.params.id;

    const [nomeFilme, setnomeFilme] = useState(route.params.nomeFilme);
    const [diretorFilme, setdiretorFilme] = useState(route.params.diretorFilme);
    const [anoFilme, setanoFilme] = useState(route.params.anoFilme);


    async function alterarFilme(id, nomeFilme, diretorFilme, anoFilme) {
        try {
            await updateDoc(doc(collection(firestore, "tbfilmes"), id), {
                nomeFilmes: nomeFilmes,
                diretorFilme: diretorFilme,
                anoFilme: anoFilme
            })
            Alert.alert("Aviso", "Filme alterado com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
        return (
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados do Filme </Text>
                </View>
                <View>
                    <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite o filme" onChangeText={setnomeFilme} value={nomeFilme} />
                    <TextInput style={estilo.input} placeholder="Digite a Sigla" onChangeText={setdiretorFilme} value={diretorFilme} />
                    <TextInput style={estilo.input} placeholder="Digite o valor" onChangeText={setanoFilme} value={anoFilme} />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={() => {
                            alterarFilme(id, nomeFilme, diretorFilme, anoFilme);
                        }}>
                        <Text style={estilo.btntxtenviar}> Alterar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    const estilo = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f4f9', 
            padding: 20, 
        },
        input: {
            width: '100%', 
            marginVertical: 10,
            backgroundColor: '#fff', 
            paddingHorizontal: 20,
            paddingVertical: 15,
            fontSize: 16, 
            borderRadius: 8, 
            borderColor: '#dcdce6', 
            borderWidth: 1, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2, 
        },
        btnenviar: {
            backgroundColor: '#6a9ae2', 
            paddingHorizontal: 40,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 3,
        },
        btntxtenviar: {
            color: '#fff', 
            fontSize: 18,
            fontWeight: 'bold', 
            textAlign: 'center',
        },
        titulo: {
            fontSize: 26,
            fontWeight: 'bold', 
            color: '#333', 
            marginBottom: 20,
            textAlign: 'center',
        },
    });
    