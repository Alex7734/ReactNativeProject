import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Avatar } from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes, MainStackParamList } from '../../navigation/routes/main-routes';
import { HomeRoutes } from '../../navigation/routes/home-routes';
import ImagePicker from 'react-native-image-crop-picker';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { User } from '../../auth/types/user';

const EditUserScreen = (props: StackScreenProps<MainStackParamList, MainRoutes.EDIT>) => {
  const currentUser = useAuthStore(state => state.currentUser);
  const { updateUser } = useAuthStore();
  const [username, setUsername] = React.useState<string>(currentUser?.username as string);
  const [email, setEmail] = React.useState<string>(currentUser?.email as string);

  const handleOpenPicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        includeBase64: true,
        cropping: true,
        mediaType: 'photo'
      })
      updateUser({ ...currentUser, profilePicture: `data:${image.mime};base64,${image.data}` } as User)
    } catch (error) {
      console.log(error)
    }
  }

  const navigation = useNavigation();

  const handleEdit = () => {
    if (!currentUser) return
    updateUser({ ...currentUser, username: username, email: email });
    props.navigation.navigate(MainRoutes.HOME_TABS, { screen: HomeRoutes.ACCOUNT });
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleOpenPicker}>
        <Avatar user={currentUser} />
      </Pressable>
      <TextInput autoCapitalize='none' style={styles.username} placeholder={currentUser?.username} value={username} onChangeText={setUsername} />
      <TextInput  autoCapitalize='none' style={styles.email} placeholder={currentUser?.email} value={email} onChangeText={setEmail} />
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Submit Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: '60%',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: '60%',
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  editButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditUserScreen;
