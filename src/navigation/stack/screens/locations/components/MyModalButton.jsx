import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../theme/Colors'

const MyModalButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default MyModalButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.acent,
        padding: 8,
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    }
})