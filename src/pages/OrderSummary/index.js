import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { Button, Gap, Header, ItemListFood, ItemValue, Loading } from '../../components'
import { API_HOST } from '../../config'
import { getData, showMessage } from '../../utils'

const OrderSummary = ({navigation, route}) => {
    const {item, transaction, userProfile} = route.params;
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const [paymentUrl, setPaymentUrl] = useState('https://google.com')

    const onCheckout = () => {
        const data ={
            food_id: item.id,
            user_id: userProfile.id,
            quantity: transaction.totalItem,
            total: transaction.total,
            status: 'PENDING'
        }
        getData('token').then((resToken) => {
            axios.post(`${API_HOST.url}/checkout`, data, {
                headers:{'Authorization': resToken.value
            }}).then((res) => {
                setIsPaymentOpen(true)
                setPaymentUrl(res.data.data.payment_url)
            }).catch((err) => {
                showMessage(err?.response?.data?.message)
            })
            
        })
    }
    const onNavChange = (state) => {
        const titleWeb ='Laravel' 
        if(state.title === titleWeb){
            navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]})
        }
    }

    if(isPaymentOpen){
        return (
            <>
                <Header title="Payment" subTitle="You deserve better meal" onBack={() => setIsPaymentOpen(false)} />
                <WebView source={{ uri: paymentUrl }} 
                    startInLoadingState={true}
                    renderLoading={() => <Loading />}
                    onNavigationStateChange={onNavChange} />
            </> 
        )
    }

    return (
        <ScrollView>
            <Header title="Order Summary" subTitle="You deserve better meal" onBack={() => navigation.goBack()} />
            <View style={styles.content}>
                <Text style={styles.label}>Item Ordered</Text>
                <ItemListFood image={{uri: item.picturePath}} type="order-summary" name={item.name} price={item.price} items={transaction.totalItem} />
                <Text style={styles.label}>Details Transaction</Text>
                <ItemValue type="currency" label={item.name} value={transaction.totalPrice} />
                <ItemValue type="currency" label="Driver" value={transaction.driver} />
                <ItemValue type="currency" label="Tax 10%" value={transaction.tax} />
                <ItemValue type="currency" label="Total Price" value={transaction.total} valueColor="#1ABC9C" />
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>Deliver to:</Text>
                <ItemValue label="Name" value={userProfile.name} />
                <ItemValue label="Phone No." value={userProfile.phoneNumber} />
                <ItemValue label="Address" value={userProfile.address} />
                <ItemValue label="House No." value={userProfile.houseNumber} />
                <ItemValue label="City" value={userProfile.city} />
            </View>
            <View style={styles.button}>
                <Button text="Checkout Now" onPress={onCheckout} />
            </View>
            <Gap height={40}/>
        </ScrollView>
    )
}

export default OrderSummary

const styles = StyleSheet.create({
    content:{
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 16,
        marginTop: 24
    },
    label:{
        fontFamily: 'Poppins-Regular',
        color: '#020202',
        marginBottom: 8
    },
    button:{
        paddingHorizontal: 24,
        marginTop: 24
    }
})