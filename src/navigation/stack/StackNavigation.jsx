import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Locations from './screens/locations/Locations'
import DetailLocation from './screens/detail-location/DetailLocation'
import { Ionicons } from '@expo/vector-icons';
import AddLocation from './screens/add-location/AddLocation'
import { COLORS } from '../../theme/Colors'

const StackNavigation = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            initialRouteName='locations'
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.primary
                }
            }}>
            <Stack.Screen
                name='locations'
                component={Locations}
                options={({ navigation }) => ({
                    title: 'Ubicaciones Guardadas',
                    headerRight: () => <Ionicons name="add-circle-sharp" size={30} color="black" onPress={() => navigation.navigate("add location")} />
                })} />
            <Stack.Screen
                name='add location'
                component={AddLocation}
                options={{
                    title: 'Nueva Ubicacion'
                }} />
            <Stack.Screen
                name='detail location'
                component={DetailLocation}
                options={{
                    title: 'Detalle'
                }} />
        </Stack.Navigator>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})