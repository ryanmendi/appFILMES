import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { firestore } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarFilmes({navigation}) {

    const [nomeFilme, setNomeFilme] = useState(null);
    const [diretorFilme, setdiretorFilme] = useState(null);
    const [anoFilme, setAnoFilme] = useState(null);

    async function addFilme() {
        try {
            const docRef = await addDoc(collection(firestore, 'tbfilmes'), {
                nomeFilme: nomeFilme,
                diretorFilme: diretorFilme,
                anoFilme: anoFilme
            });
            console.log("Cadastrado com ID: ", docRef.id);
            Alert.alert("Cadastro", "Registros cadastrados com sucesso")
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            Alert.alert("Erro", "Erro ao cadastrar . Por favor, tente novamente.");
        }
    }

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}> Cadastre um novo filme</Text>
            </View>
            <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite o nome do filme" onChangeText={setNomeFilme} value={nomeFilme} />
            <TextInput style={estilo.input} placeholder="Digite o diretor" onChangeText={setdiretorFilme} value={diretorFilme} />
            <TextInput style={estilo.input} placeholder="Digite o ano de lançamento" onChangeText={setAnoFilme} value={anoFilme} />

            <TouchableOpacity
                style={estilo.btnenviar}
                onPress={() => {
                    addFilme();
                }}>
                <Text style={estilo.btntxtenviar}> Enviar </Text>
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
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 20,
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
