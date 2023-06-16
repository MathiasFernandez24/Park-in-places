import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './stack/StackNavigation'

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})