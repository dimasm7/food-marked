import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useDispatch, useSelector } from "react-redux";
import { getInProgress, getPastOrders } from "../../../redux/Action";
import ItemListFood from '../ItemListFood';

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#020202', height: 3, width: 0.3, marginLeft: 0 }}
      style={{ backgroundColor: 'white', elevation: 0, shadowOpacity: 0, borderBottomColor: '#F2F2F2', borderBottomWidth: 1 }}
      tabStyle={{width: 'auto'}}
      renderLabel={({ route, focused, color }) => (
        <Text style={{fontFamily: 'Poppins-Medium', color: focused ? '#020202' : '#8D92A3'}}>{route.title}</Text>
      )}
    />
  );

const InProgess = () => {
  const navigation = useNavigation();

  const {inProgress} = useSelector((state) => state.orderReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInProgress())
  }, [])
  return(
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {inProgress.map((order) => {
        return <ItemListFood 
          key={order.id}
          image={{uri: order.food.picturePath}} 
          type="in-progress" 
          name={order.food.name} 
          items={order.quantity} 
          price={order.total} 
          onPress={() => navigation.navigate('OrderDetail', order)} 
          />
      })}
    </View>
  )
}

const PastOrders = () => {
  const navigation = useNavigation();
  const {pastOrders} = useSelector((state) => state.orderReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPastOrders())
  }, [])
  return(
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {pastOrders.map((order) => {
        return <ItemListFood 
          key={order.id}
          image={{uri: order.food.picturePath}} 
          type="past-orders" 
          name={order.food.name} 
          date={order.created_at} 
          items={order.quantity} 
          price={order.total}
          status={order.status} 
          onPress={() => navigation.navigate('OrderDetail', order)} 
          />
      })}
    </View>
  )
}

const OrderTabSection = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'In Progress' },
        { key: '2', title: 'Past Orders' }
    ]);

    const renderScene = SceneMap({
        1: InProgess,
        2: PastOrders
    });

    return (
      <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          style={{backgroundColor: 'white'}}
      />
    )
}

export default OrderTabSection

const styles = StyleSheet.create({})
