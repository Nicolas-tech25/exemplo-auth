import {
  navigation,
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

// Importando os recursos de autenticação
import { auth } from "../../firebase.config";

// Importando a função de login com e-mail e senha
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção!", "Preencha e-mail e senha!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace("AreaLogada");
      console.log("Login feito com sucesso!");
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case "auth/invalid-credential":
          mensagem = "dados invalidos!";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de email invalido!";
          break;
        default:
          mensagem = "Houve um erro tente mais tarde!";
          break;
      }
      Alert.alert("Ops!", mensagem);
    }
  };

  // anfn
  const recuperarSenha = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Recuperar senha", "Verifique sua caixa de emails.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          onChangeText={(valor) => setEmail(valor)}
          placeholder="E-mail"
          style={estilos.input}
        />
        <TextInput
          onChangeText={(valor) => setSenha(valor)}
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
        />
        <View style={estilos.botoes}>
          <Button onPress={login} title="Entre" color="green" />
          <Button
            title="Recuperar senha"
            color="grey"
            onPress={recuperarSenha}
          />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
