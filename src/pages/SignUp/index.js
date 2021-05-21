import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button, Gap, Header, TextInput } from '../../components'
import { showMessage, useForm } from '../../utils'
import * as ImagePicker from 'react-native-image-picker'

const SigUp = ({navigation}) => {

    const [form, setForm] = useForm({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch();

    const onSubmit = () => {
        console.log(form)
        dispatch({type: 'SET_REGISTER', value: form})
        navigation.navigate('SignUpAddress')
    }
    
    const [photo, setPhoto] = useState('');
    const addPhoto = () => {
        ImagePicker.launchImageLibrary({
            quality: 0.5,
            maxWidth: 200,
            maxHeight: 200
        }, (response) => {
            console.log('response: ', response)

            if(response.didCancel || response.error){
                showMessage('Anda tidak memilih photo')
            } else {
                const source ={uri: response.uri};
                const dataImage = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }

                setPhoto(source);
                dispatch({type: 'SET_PHOTO', value: dataImage})
                dispatch({type: 'SET_UPLOAD_STATUS', value: true})
            }
        });
    };


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.page}>
                <Header title="Sign Up" subTitle="Register and eat" onBack={() => navigation.goBack()} />
                <View style={styles.container}>
                    <TouchableOpacity onPress={addPhoto}>
                        <View style={styles.photo}>
                            <View style={styles.borderPhoto}>
                                {photo ? (
                                    <Image source={photo} style={styles.photoContainer} />
                                ):(
                                        <View style={styles.photoContainer}>
                                            <Text style={styles.addPhoto}>Add</Text>
                                            <Text style={styles.addPhoto}>Photo</Text>
                                        </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TextInput label="Full Name" placeholder="Type your full name" value={form.name} onChangeText={(value) => setForm('name', value)} />
                    <Gap height={16} />
                    <TextInput label="Email Address" placeholder="Type your email address" value={form.email} onChangeText={(value) => setForm('email', value)} />
                    <Gap height={16} />
                    <TextInput label="Password" placeholder="Type your password" value={form.password} onChangeText={(value) => setForm('password', value)} secureTextEntry />
                    <Gap height={24} />
                    <Button text="Continue" onPress={onSubmit} />
                </View>
            </View>
        </ScrollView>
    )
}

export default SigUp

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        backgroundColor: 'white', 
        paddingHorizontal: 24, 
        paddingVertical: 26, 
        marginTop: 24, 
        flex: 1
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    addPhoto:{
        fontSize: 14, 
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
        textAlign: 'center'
    }
})
