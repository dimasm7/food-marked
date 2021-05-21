import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IcMin, IcPlus } from '../../../assets'

const Conter = ({onValueChange}) => {

    const [value, setValue] = useState(1);

    const onCount = (type) => {
        let res = value;
        if(type === 'plus') res++
        if(type === 'minus'){
            if(value > 1) res--
        }

        setValue(res);
        onValueChange(res);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onCount('minus')}>
                <IcMin />
            </TouchableOpacity>
            <Text style={styles.value}> {value} </Text>
            <TouchableOpacity onPress={() => onCount('plus')}>
                <IcPlus />
            </TouchableOpacity>
        </View>
    )
}

export default Conter

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    value:{
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#020202',
        paddingHorizontal: 10
    }
})
