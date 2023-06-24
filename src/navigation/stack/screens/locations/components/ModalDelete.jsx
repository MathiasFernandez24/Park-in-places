import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../theme/Colors'
import MyModalButton from './MyModalButton'
import { useDispatch } from 'react-redux'
import { removeLocationDb } from '../../../../../store/slices/LocationSlice'

const ModalDelete = ({ isModalVisible, setIsModalVisible, item }) => {
    const dispatch = useDispatch()
    console.log("----------");
    console.log(item);
    console.log("----------");
    const onHandleDelete = () => {
        dispatch(removeLocationDb(item))
        setIsModalVisible(false)
    }

    const onHandleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <Modal visible={isModalVisible} transparent={true}>
            <View style={styles.container} />
            <View style={styles.modalCard}>
                <Text style={styles.title}>Eliminar de forma permanente?</Text>
                <View style={styles.buttonContainer}>
                    <MyModalButton title={"Cancelar"} onPress={onHandleCancel} />
                    <MyModalButton title={"Borrar"} onPress={onHandleDelete} />
                </View>
            </View>
        </Modal>
    )
}

export default ModalDelete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    modalCard: {
        position: 'absolute',
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 100,
        alignItems: 'center',
        padding: 10,
        paddingBottom: 0,
        borderColor: COLORS.acent,
        borderWidth: 1
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 20,
    },
    title: {
        fontSize: 24
    }
})