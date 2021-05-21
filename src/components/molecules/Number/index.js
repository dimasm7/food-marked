import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NumberFormat from 'react-number-format';

const Number = ({number, type, style}) => {
    if(type === 'decimal'){
        return (
            <NumberFormat 
                value={number} 
                displayType="text" 
                decimalSeparator="." 
                decimalScale={1} 
                fixedDecimalScale 
                renderText={(value) => <Text style={style}>{value}</Text>} 
            />
        )
    }
    return (
        <NumberFormat 
            value={number} 
            prefix="IDR " 
            thousandSeparator="." 
            displayType="text" 
            renderText={(value) => <Text style={style}>{value}</Text>} 
            decimalSeparator=","
        />
    )
}

export default Number

const styles = StyleSheet.create({})
