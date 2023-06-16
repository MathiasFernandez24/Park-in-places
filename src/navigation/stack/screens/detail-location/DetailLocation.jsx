import { Button, Image, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../theme/Colors';
import coustomImage from '../../../../assets/coustom_image.png'
import MapView, { Marker } from 'react-native-maps';

const DetailLocation = ({ route }) => {
    const { item } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Fecha: {item.fecha}hs</Text>
            <Text>Longitud: {item.latitude}</Text>
            <Text>Latitud: {item.longitude}</Text>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                        latitudeDelta: 0.0046,
                        longitudeDelta: 0.0021
                    }}
                >
                    <Marker
                        title='My Car'
                        coordinate={{
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude),
                        }}
                    />
                </MapView>
            </View>
            <Image style={styles.image} source={item.image ? { uri: item.image } : coustomImage} resizeMode='contain' />
        </View >
    )
}

export default DetailLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.tertiary,
        // padding: 30,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%'
    },
    mapContainer: {
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        overflow: 'hidden'

    },
    map: {
        width: '100%',
        height: 300,
    },
    title: {
        fontSize: 30,
        alignSelf: 'center'
    }
})