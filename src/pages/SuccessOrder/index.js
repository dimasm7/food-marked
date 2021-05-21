import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IlSuccessOrder } from '../../assets'
import { Button, Gap } from '../../components'

const SuccessOrder = ({navigation}) => {
    return (
        <View style={styles.page}>
            <IlSuccessOrder />
            <Gap height={30} />
            <Text style={styles.title}>You've Made Order</Text>
            <Gap height={6} />
            <Text style={styles.subTitle}>Just stay at home while we are</Text>
            <Text style={styles.subTitle}>preparing your best foods</Text>
            <Gap height={30} />
            <View style={styles.buttonContainer}>
                <Button text="Order Other Foods" onPress={() => navigation.replace('MainApp')} />
                <Gap height={12} />
                <Button text="View My Order" color="#8D92A3" textColor="white" onPress={() => navigation.replace('MainApp', {screen: 'Order'})} />
            </View>
        </View>
    )
}

export default SuccessOrder

const styles = StyleSheet.create({
    page:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
        color: '#020202'
    },
    subTitle:{
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3'
    },
    buttonContainer:{
        width: '100%',
        paddingHorizontal: 80
    }
})
