import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../theme/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import * as Location from 'expo-location';
import { obtenerFechaActual } from '../../../../../services/Date';
import { useDispatch } from 'react-redux';
import { addLocationDb } from '../../../../../store/slices/LocationSlice';
import { ActivityIndicator } from 'react-native';

const ButtonFastAddPlace = () => {
    const [isDisabled, setIsDisabled] = useState(false)
    const dispatch = useDispatch()

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


    const addFastLocation = async () => {
        setIsDisabled(true)
        console.log("ADD FAST LOCATION");

        const isLocationOk = await verifyPermissionsLocation()
        if (!isLocationOk) return
        console.log("OK -permisos");
        const locationCoords = await Location.getCurrentPositionAsync({});
        console.log("OK -ubicacion");
        const locationGps = {
            latitude: locationCoords.coords.latitude,
            longitude: locationCoords.coords.longitude
        }


        const fecha = obtenerFechaActual()
        const id = Date.now()
        dispatch(addLocationDb({
            id,
            fecha,
            title: "Fast Save",
            // image: pickerUrl,
            image: "",
            latitude: locationGps.latitude,
            longitude: locationGps.longitude,
            address: "gps.address",
        }))
        console.log("OK -save FAST location desde ButtonFastAddPlace");
        setIsDisabled(false)
    }


    return (
        <TouchableOpacity style={isDisabled ? styles.buttonDisabled : styles.buttonActive} disabled={false} onPress={addFastLocation}>

            <MaterialCommunityIcons name="car-brake-parking" size={150} color="black" />
            {
                isDisabled && <ActivityIndicator size='large' color={COLORS.secondary} style={{ position: 'absolute' }} />
            }
        </TouchableOpacity>
    )
}

export default ButtonFastAddPlace

const styles = StyleSheet.create({

    buttonActive: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.acent,
        height: 200,
        width: 200,
        borderRadius: 200,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

    },
    buttonDisabled: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        height: 200,
        width: 200,
        borderRadius: 200,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        opacity: 0.45
    },

})