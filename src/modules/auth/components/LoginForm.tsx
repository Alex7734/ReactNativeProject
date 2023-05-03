import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';

// You will have to make an interface for all the props that you pass to this component
// This is a good practice because it will help you to avoid errors
interface Props {
   onLogin: (email: string, password: string) => void;
}

// In this example we destructure the props object to get the onLogin function
const LoginForm = ({onLogin}: Props) => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    // The onPress function was made here to avoid having to write the logic in the Pressable component 
    const onPress = () => onLogin(email,password)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Form</Text>
      {/* The value prop is used to set the value of the input, the onChangeText prop is used to set the value of the state variable */}
      <TextInput style={styles.input} value={email} placeholder="Email" onChangeText={(value)=>setEmail(value)}/> 
      <TextInput style={styles.input} value={password} placeholder="Password" onChangeText={setPassword} />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginForm;
