import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CardLocation from './components/CardLocation'
import { COLORS } from '../../../../theme/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLocationDb } from '../../../../store/slices/LocationSlice'
import ModalDelete from './components/ModalDelete'
import ButtonFastAddPlace from './components/ButtonFastAddPlace'


const Locations = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const locationsRedux = useSelector((state) => state.location.places)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLocationDb())
    }, [])

    const navigateToDetail = (item) => {
        navigation.navigate('detail location', { item })
    }


    const renderItem = (i) => (
        <CardLocation
            key={i.id}
            navigateToDetail={navigateToDetail}
            item={i.item}
            setIsModalVisible={setIsModalVisible}
            setSelectedItem={setSelectedItem}
        />
    )
    const finalRenderItem = () => (
        <View style={styles.finalRenderItem} />
    )

    console.log(locationsRedux);
    return (
        <View style={styles.container}>
            <ModalDelete isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} item={selectedItem} />
            <FlatList
                data={locationsRedux}
                renderItem={renderItem}
                keyExtractor={i => i.id}
                style={styles.list}
                ListFooterComponent={finalRenderItem}
            />
            <ButtonFastAddPlace />
        </View>
    )
}

export default Locations

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        backgroundColor: COLORS.tertiary,
        flex: 1,
    },
    list: {
        // padding: 10,

    },
    finalRenderItem: {
        height: 220,
        width: '100%'
    }
})