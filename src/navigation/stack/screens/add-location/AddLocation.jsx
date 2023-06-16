import { Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../../theme/Colors'
import MyButton from './components/MyButton'
import { useDispatch } from 'react-redux'
import { addLocation, addLocationDb } from '../../../../store/slices/LocationSlice'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location';
import { renameAndSavePicture } from '../../../../services/RenameAndSavePicture'
import { obtenerFechaActual } from '../../../../services/Date'

const AddLocation = ({ navigation }) => {
    const [inputTitle, setInputTitle] = useState('')
    const [pickerUrl, setPickerUrl] = useState("")
    const [gps, setGps] = useState(null);
    const dispatch = useDispatch()

    const closeKeyboard = () => {
        Keyboard.dismiss()
    }

    const verifyPermissionsCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        console.log(status);
        if (status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes',
                'Necesitas otorgar los permisos necesarios',
                [{ text: 'Ok' }]
            )
            return false
        }
        return true
    }

    const takeAPicture = async () => {
        const isCameraOk = await verifyPermissionsCamera()
        if (!isCameraOk) return
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        setPickerUrl(image.assets[0].uri)
        console.log("PICTURE");
    }

    //


    const verifyPermissionsLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes',
                'Necesitas otorgar los permisos necesarios',
                [{ text: 'Ok' }]
            )
            return false
        }
        return true
    }


    //

    const getLocation = async () => {
        console.log("LOCATION");
        const isLocationOk = await verifyPermissionsLocation()
        if (!isLocationOk) return
        const locationCoords = await Location.getCurrentPositionAsync({});
        const locationGps = {
            latitude: locationCoords.coords.latitude,
            longitude: locationCoords.coords.longitude
        }
        setGps(locationGps);
        console.log(locationGps);
    }

    const saveLocation = async () => {
        const fecha = obtenerFechaActual()
        const id = Date.now()

        console.log(pickerUrl);
        const path = await renameAndSavePicture(pickerUrl)


        // dispatch(addLocation({
        //     id,
        //     fecha,
        //     title: inputTitle,
        //     image: pickerUrl,
        //     // image: path
        // }))
        dispatch(addLocationDb({
            id,
            fecha,
            title: inputTitle,
            // image: pickerUrl,
            image: path,
            latitude: gps.latitude,
            longitude: gps.longitude,
            address: "gps.address",
        }))
        navigation.navigate("locations")
        console.log("OK -save location desde addLocation");
    }

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={styles.container}>
                <TextInput value={inputTitle} onChangeText={(value) => setInputTitle(value)} style={styles.inputTitle} placeholder='Titulo' />
                <View style={styles.buttonsContainer}>
                    <MyButton title={"TAKE A PICTURE"} onPress={takeAPicture} />
                    <View style={styles.imagePreview}>
                        {pickerUrl ?
                            <Image
                                style={styles.image}
                                source={{ uri: pickerUrl }}
                            // source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4HPSAEg58ccCbSVMkfprM-XA65fAg4iM9Fl34yZ0&s' }}
                            />
                            :
                            <Text style={styles.textImage}>No hay imagen seleccionada</Text>
                        }
                    </View>
                    <MyButton title={"GET LOCATION"} onPress={getLocation} />
                    <MyButton title={"SAVE LOCATION"} onPress={saveLocation} disabled={gps ? false : true} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AddLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.tertiary,
    },
    buttonsContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        padding: 20,
        gap: 20
    },
    inputTitle: {
        backgroundColor: COLORS.primary,
        padding: 5,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 5,
        // height: 60,
        fontSize: 24,
    },
    imagePreview: {
        width: '100%',
        height: 300,
        borderWidth: 1,
        borderColor: COLORS.acent,
        justifyContent: 'center'
    },
    image: {
        flex: 1
        // width: '100%',
        // height: '100%'
    },
    textImage: {
        alignSelf: 'center',

    }
})