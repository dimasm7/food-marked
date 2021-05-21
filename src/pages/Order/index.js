import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, StyleSheet, View } from 'react-native'
import { EmptyOrder, Header, OrderTabSection } from '../../components'
import { getOrder } from '../../redux/Action';

const Order = () => {
    const dispatch = useDispatch()
    const {orders} = useSelector((state) => state.orderReducer)
  
    useEffect(() => {
      dispatch(getOrder())
    }, [])
    
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.page}>
            {orders.length < 1 ? (
              <EmptyOrder />
              ) : (
              <View style={styles.content}>
                <Header title="Your Order" subTitle="Wait for the best meal" />
                <View style={styles.tabContainer}>
                  <OrderTabSection />
                  </View>
              </View>
              )}
        </View>   
      </ScrollView>
    )
}

export default Order

const styles = StyleSheet.create({
    page:{flex: 1},
    content:{flex: 1},
    tabContainer:{
      flex: 1,
      marginTop: 24
    }
})
