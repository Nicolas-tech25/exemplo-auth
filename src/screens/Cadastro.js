import { useState } from "react";
import { auth } from "../../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  Alert,
  navigation,
  Button,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const cadastrar = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha!");
      return;
    }
    try {
      const contaUsuário = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      if (contaUsuário) {
        await updateProfile(auth.currentUser, { displayName: nome });
        console.log(contaUsuário.user.displayName);
      }
      Alert.alert("Cadastro", "Seu cadastro foi concluido com sucesso!", [
        {
          style: "cancel",
          text: "Ficar aqui mesmo",
          onPress: () => {
            return;
          },
        },
        {
          style: "default",
          text: "Ir para a Área logada",
          onPress: () => navigation.replace("AreaLogada"),
        },
      ]);
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          mensagem = "E-mail já cadastrado";
          break;
        case "auth/weak-password":
          mensagem = "Senha fraca (mínimo 6 caracteres)";
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
  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          placeholder="Nome"
          style={estilos.input}
          keyboardType="default"
          onChangeText={(valor) => setNome(valor)}
        />
        <TextInput
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          onChangeText={(valor) => setSenha(valor)}
          secureTextEntry
        />
        <View style={estilos.botoes}>
          <Button onPress={cadastrar} title="Cadastre-se" color="blue" />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
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
