import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { View, Text, Alert } from "react-native";
import LoginForm  from "../components/LoginForm";

export const LoginScreen = () => {
    const { users, setCurrentUser } = useAuthStore();
    
    // note: the logic should always work like this when dealing with form inputs
    // the form component should have this logic passed as a prop
    // now go to LoginForm.tsx and see how to handle this prop
    const onLogin = (email: string, password: string) => {
        const user = users?.find((user) =>  {
            return user.email === email && user.password === password 
        })
        if (user){
            setCurrentUser(user)
        } else {
            Alert.alert('Wrong email or password')
        }
    }

    return (
        <LoginForm onLogin={onLogin}></LoginForm>
    )
}