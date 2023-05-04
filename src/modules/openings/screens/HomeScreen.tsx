import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from 'react-native/Libraries/NewAppScreen';

/*
    https://6453d40ae9ac46cedf30de1e.mockapi.io
    https://6453d40ae9ac46cedf30de1e.mockapi.io/chessOpenings
    query params for mockapi.io
    ?page=1&limit=10 for pagination
    ?search=string for search

    homework:
    1. add a screen with a list of openings
        a. use mockapi.io
        b. have a search bar to filter openingg by name
        c. filter button by color and by difficulty with a modal 
        The modal will have 2 filters, one for color and one for difficulty
    2. detail screen when card is pressed
        a. show the name of the opening
        b. show the moves of the opening
        c. show the difficulty of the opening
        d. show the color of the opening
        e. image of the opening
        f. favourite button
    3. add a screen with a list of favourites
        a. use zustand to store the favourites
        b. for each favourite opening create add to favourites and remove from favourites functions in the store
        c. show the list of favourites
        d. should store the whole opening object
        e. un-favourite button on the list
        f. use the same card both for the list of openings and the list of favourites
    4. edit user screen
        a. add interests in openings and delete interests
        b. text input for interests and button to add
        c. list of interests 
*/


export const HomeScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
    
    return(
        <View style={styles.container}>
        <Button title="Open Modal" onPress={toggleModal} />
        <Modal coverScreen={true} isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>This text is from the modal</Text>
          </View>
        </Modal>
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '100%',
        height: '35%',
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.1)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
        },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black"
    }
})
