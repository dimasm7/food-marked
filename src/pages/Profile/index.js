import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ProfileDummy } from '../../assets'
import { ProfileTabSection } from '../../components'
import { getData } from '../../utils'

const Profile = () => {
    const [userProfile, setUserProfile] = useState({})
    useEffect(() => {
        getData('userProfile').then((res)=>{
            setUserProfile(res)
        })
    },[])
    return (
        <View style={styles.page}>
            <View style={styles.profileDetail}>
                <View style={styles.photo}>
                    <View style={styles.borderPhoto}>
                        <Image style={styles.photoContainer} source={{uri: userProfile.profile_photo_url}} />
                    </View>
                </View>
                <Text style={styles.name}>{userProfile.name}</Text>
                <Text style={styles.email}>{userProfile.email}</Text>
            </View>

            <View style={styles.content}>
                <ProfileTabSection />
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    page:{
        flex: 1
    },
    profileDetail:{
        backgroundColor: 'white', 
        paddingVertical: 26
    },
    content: {
        flex: 1, 
        marginTop: 24
    },
    name:{
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#020202',
        textAlign: 'center'
    },
    email:{
        fontSize: 13,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
        textAlign: 'center'
    },
    photo:{
        alignItems: 'center',
        marginBottom: 16
    },
    borderPhoto:{
        borderWidth: 1,
        width: 110,
        height: 110,
        borderRadius: 110,
        borderColor: '#8D92A3',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoContainer:{
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: '#F0F0F0',
        padding: 24
    }
})
