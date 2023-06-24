import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../theme/Colors';
import coustomImage from '../../../../assets/coustom_image.jpg'
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const DetailLocation = ({ route }) => {
    const { item } = route.params
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.containerInfo}>
                    <Text>Fecha: {item.fecha}hs</Text>
                    <Text>Longitud: {item.latitude}</Text>
                    <Text>Latitud: {item.longitude}</Text>
                </View>
                <View style={{ height: screenWidth, ...styles.mapContainer }}>
                    <MapView
                        style={{ height: screenWidth, width: screenWidth }}
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
                <Image
                    style={{ resizeMode: 'contain', width: screenWidth, height: screenWidth, marginTop: 5 }}
                    source={item.image ? { uri: item.image } : coustomImage}
                    resizeMode='contain'
                />
            </ScrollView>
        </View >
    )
}

export default DetailLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.tertiary,
        padding: 5,
    },
    image: {

    },
    mapContainer: {
        // padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        overflow: 'hidden',
        width: '100%'

    },
    title: {
        fontSize: 30,
        alignSelf: 'center'
    },
    containerInfo: {
        marginLeft: 16
    }
})