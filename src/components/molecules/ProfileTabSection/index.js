import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import ItemListMenu from "../ItemListMenu";

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

const Account = () => {
  const navigation = useNavigation();
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 1, routes: [{name: 'SignIn'}]})
    })
  }
  return(
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListMenu text="Edit Profile" />
      <ItemListMenu text="Home Address" />
      <ItemListMenu text="Security" />
      <ItemListMenu text="Payment" />
      <ItemListMenu text="SignOut" onPress={signOut} />
    </View>
  )
}

const FoodMarket = () => {
  return(
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListMenu text="Rate App" />  
      <ItemListMenu text="Help Center" />  
      <ItemListMenu text="Privacy & Policy" />  
      <ItemListMenu text="Terms & Conditions" />  
    </View>
  )
}

const ProfileTabSection = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Account' },
        { key: '2', title: 'FoodMarket' }
    ]);

    const renderScene = SceneMap({
        1: Account,
        2: FoodMarket
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

export default ProfileTabSection

const styles = StyleSheet.create({})
