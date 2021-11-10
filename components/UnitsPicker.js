import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import{Picker } from '@react-native-picker/picker'

export default function UnitsPicker({unitsSystem, setUnitsSystem}) {
    return (
        <View style={styles.unitsSystem}>
            <Picker
                selectedValue={unitsSystem}
                onValueChange={(item) => setUnitsSystem(item)}
                mode="dropdown"
                itemStyle={{ fontSize: 12 }}
            >
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}
const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        ...Platform.select({
          
            ios: {
                top: -30,
                backgroundColor: 'red'
            },
            android: {
                top: 30,
                backgroundColor: 'green'
            },
            default: {
                backgroundColor: 'purple'
            },
        }),

        left: 20,
        height: 50,
        width: 100,
    },
})