import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Avatar } from '../components/Avatar';
import { User } from '../../auth/types/user';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainRoutes, MainStackParamList } from '../../navigation/routes/main-routes';
import { HomeRoutes } from '../../navigation/routes/home-routes';
import ImagePicker from 'react-native-image-crop-picker';

const EditUserScreen = (props: StackScreenProps<MainStackParamList, MainRoutes.EDIT>) => {
  const currentUser = useAuthStore(state => state.currentUser);
  const { updateUser } = useAuthStore();
  const [username, setUsername] = React.useState<string>(currentUser?.username as string);
  const [email, setEmail] = React.useState<string>(currentUser?.email as string);

  const handleOpenPicker = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
      cropping: true,
      mediaType: 'photo'
    })
    updateUser({...currentUser, profilePicture: `data:${image.mime};base64,${image.data}`} as User)
    return image
  }

  const navigation = useNavigation();
  const handleGoBack = () => navigation.goBack();

  const handleEdit = () => {
    if(!currentUser) return
    updateUser({...currentUser, username: username, email: email} );
    props.navigation.navigate(MainRoutes.HOME_TABS, {screen: HomeRoutes.ACCOUNT});
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleOpenPicker}>
        <Avatar user={currentUser} />
      </Pressable>
      <TextInput style={styles.username} placeholder={currentUser?.username} value={username} onChangeText={setUsername} />
      <TextInput style={styles.email} placeholder={currentUser?.email} value={email} onChangeText={(value) => setEmail(value)}/>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Submit edit</Text>
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
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
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
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  favoritesContainer: {
    marginTop: 150,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  favoriteText: {
    fontSize: 16,
    marginLeft: 10,
  },
  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'lightblue',
    padding: 10,
  },
  goBackText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditUserScreen;