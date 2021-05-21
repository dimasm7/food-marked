import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IcBackWhite } from '../../assets'
import { Counter, Number, Rating } from '../../components/molecules'
import {Button} from '../../components'
import { getData } from '../../utils'

const FoodDetail = ({navigation, route}) => {
    const {id, name, picturePath, description, ingredients, price, rate, } = route.params;
    const [totalItem, setTotalItem] = useState(1)
    const [userProfile, setUserProfile] = useState({})
    const onCounterChange = (value) => {
        setTotalItem(value)
    }

    useEffect(() => {
        getData('userProfile').then((res) => {
            setUserProfile(res)
        })
    }, [])

    const onOrder = () => {
        const totalPrice = totalItem * price;
        const tax = 10 / 100 * totalPrice;
        const driver = 50000;
        const total = totalPrice + tax + driver;

        const data = {
            item:{
                id, 
                name,
                price,
                picturePath
            },
            transaction:{
                totalItem,
                totalPrice,
                driver,
                tax,
                total
            },
            userProfile
        }
        navigation.navigate('OrderSummary', data)
    }

    return (
        <View style={styles.page}>
            <ImageBackground source={{uri: picturePath}} style={styles.cover}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} >
                    <IcBackWhite />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.content}>
                <View style={styles.mainContent}>
                    <View style={styles.productContainer} >
                        <View>
                            <Text style={styles.title}>{name}</Text>
                            <Rating number={rate} />
                        </View>
                        <Counter onValueChange={onCounterChange} />
                    </View>
                    <Text style={styles.desc}>{description}</Text>
                    <Text style={styles.label}>Ingredients:</Text>
                    <Text style={styles.desc}>{ingredients}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.labelTotal}>Total Price:</Text>
                        <Number number={price * totalItem} style={styles.priceTotal} />
                    </View>
                    <View style={styles.button}>
                        <Button text="Order Now" onPress={onOrder} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default FoodDetail

const styles = StyleSheet.create({
    page:{flex: 1},
    cover:{
        height: 330,
        paddingTop: 26,
        paddingLeft: 22
    },
    back:{
        width: 30,
        height: 30
    },
    mainContent:{flex: 1},
    content:{
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -40,
        paddingTop: 26,
        paddingHorizontal: 16
    },
    productContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14
    },
    title:{
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#020202'
    },
    desc:{
        fontFamily: 'Poppins-Regular',
        color: '#8D92A3',
        marginBottom: 16    

    },
    label:{
        fontFamily: 'Poppins-Regular',
        color: '#020202',
        marginBottom: 4
    },
    footer:{
        flexDirection: 'row',
        paddingVertical: 16,
        alignItems: 'center'
    },
    priceContainer:{flex:1},
    button:{width: 163},
    labelTotal:{
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#8D92A3'        
    },
    priceTotal:{
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: '#020202'        
    }
})
