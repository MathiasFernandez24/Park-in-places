import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../theme/Colors'

const MyButton = ({ title, onPress, disabled = false }) => {
    return (
        <TouchableOpacity style={disabled ? styles.containerDisabled : styles.container} onPress={onPress} disabled={disabled}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default MyButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    containerDisabled: {
        backgroundColor: COLORS.secondary,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        opacity: 0.2
    }
})