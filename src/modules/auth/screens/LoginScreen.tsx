import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Alert } from "react-native";
import LoginForm  from "../components/LoginForm";

export const LoginScreen = () => {
    const { users, setCurrentUser } = useAuthStore();
    
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