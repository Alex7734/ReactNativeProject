import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { User } from "../../auth/types/user";
import { Image } from "react-native";
import { useAuthStore } from "../../auth/store/useAuthStore";
import ImagePicker from 'react-native-image-crop-picker';

interface Props {
    user: User | null
}

export const Avatar = ({user}: Props) => {
    const {setCurrentUser} = useAuthStore()
    
    useEffect(() => setCurrentUser({ ...user, profilePicture: '', favorites: ['French Defense: Tarrasch Variation', 'Italian Game: Giucco Pianissimo', 'Sicilian Defense: Alapin Variation'] } as User), [])

    return (
        <View style={styles.container}>
            {user?.profilePicture !== '' ? (
                <Image style={styles.imageAvatar} source={{uri: user?.profilePicture}} />
            ):(
                <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{user?.username[0]}</Text>
            </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
})
