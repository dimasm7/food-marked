import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useDispatch, useSelector } from "react-redux";
import { FoodDummy2, FoodDummy3, FoodDummy4, FoodDummy6 } from '../../../assets';
import { getFoodDataByTypes } from "../../../redux/Action";
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

const NewTaste = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {newTaste} = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodDataByTypes('new_food'))
  }, [])

  return(
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {newTaste.map((item)=> {
        return <ItemListFood 
          key={item.id} 
          image={{uri: item.picturePath}} 
          type="product" 
          price={item.price} 
          name={item.name} 
          rating={item.rate} 
          onPress={() => navigation.navigate('FoodDetail', item)} />
      })}
    </View>
  )
}

const Popular = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {popular} = useSelector((state) => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDataByTypes('popular'))
  }, [])
  return(
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {popular.map((item)=> {
        return <ItemListFood 
          key={item.id} 
          image={{uri: item.picturePath}} 
          type="product" 
          price={item.price} 
          name={item.name} 
          rating={item.rate} 
          onPress={() => navigation.navigate('FoodDetail', item)} />
      })}
    </View>
  )
}

const Recommended = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {recommended} = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodDataByTypes('recommended'))
  }, [])
  return(
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {recommended.map((item)=> {
        return <ItemListFood 
          key={item.id} 
          image={{uri: item.picturePath}} 
          type="product" 
          price={item.price} 
          name={item.name} 
          rating={item.rate} 
          onPress={() => navigation.navigate('FoodDetail', item)} />
      })}
    </View>
  )
}

const HomeTabSection = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'New Taste' },
        { key: '2', title: 'Popular' },
        { key: '3', title: 'Recommended' },
    ]);

    const renderScene = SceneMap({
        1: NewTaste,
        2: Popular,
        3: Recommended,
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

export default HomeTabSection

const styles = StyleSheet.create({})
