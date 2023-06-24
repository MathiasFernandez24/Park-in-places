import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../theme/Colors'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeLocation, removeLocationDb } from '../../../../../store/slices/LocationSlice';
import { deleteToLocalDb } from '../../../../../db';
import { deletePictureInFileSystem } from '../../../../../services/RenameAndSavePicture';
import coustomImage from '../../../../../assets/coustom_image.jpg'
import { Linking } from 'react-native';

const CardLocation = ({ item, navigateToDetail, setIsModalVisible, setSelectedItem }) => {

    const deleteLocationButton = async () => {
        setSelectedItem(item)
        setIsModalVisible(true)
        // dispatch(removeLocation(item.id))
        // await deleteToLocalDb(item.id)

        // dispatch(removeLocationDb(item))
        // console.log(item);
    }

    const iniciarNavegacionACoordenadas = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${parseFloat(item.latitude)},${parseFloat(item.longitude)}&travelmode=walking`;
        Linking.openURL(url);
    }

    const navigateToDetailButton = () => {
        navigateToDetail(item)
    }

    return (
        <TouchableOpacity style={styles.container} onLongPress={navigateToDetail} onPress={iniciarNavegacionACoordenadas}>
            <Image style={styles.image} source={item.image ? { uri: item.image } : coustomImage} />
            <View style={styles.containerText}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.fecha}</Text>
            </View>
            <View style={styles.containerButtons}>
                <Feather name="list" size={34} color="black" onPress={navigateToDetailButton} />
                <AntDesign style={{}} name="delete" size={34} color="black" onPress={deleteLocationButton} />
            </View>
        </TouchableOpacity>
    )
}

export default CardLocation

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        resizeMode: 'cover'
    },
    containerButtons: {
        flexDirection: 'row',
        gap: 16
    },
    containerText: {
        flex: 1,
        marginHorizontal: 12,
    },
    title: {
        fontSize: 16
    },
    date: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        paddingRight: 10,
    },

})