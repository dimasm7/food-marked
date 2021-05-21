import axios from 'axios'
import { API_HOST, API_STORAGE } from '../../config'
import { showMessage, storeData } from '../../utils'
import { setLoading } from './global'

export const signUpAction = (dataRegister, photoReducer, navigation) => (dispatch) => {
    axios.post(`${API_HOST.url}/register`, dataRegister)
        .then((res) => {
            const profile = res.data.data.user;
            const token = `${res.data.data.token_type} ${res.data.data.access_token}`;

            storeData('token', {value: token})
            
            if(photoReducer.isUploadPhoto){
                const photoForUpload = new FormData();
                
                photoForUpload.append('file', photoReducer)
                axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((resUpload) => {
                    profile.profile_photo_url = `${API_STORAGE.url}/${resUpload.data.data[0]}`
                    storeData('userProfile', profile)
                    dispatch(setLoading(false))
                    navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]})
                })
                .catch((err) => {
                    showMessage('Upload photo tidak berhasil')
                    dispatch(setLoading(false))
                    navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]})
                })
            }else{
                storeData('userProfile', profile)
                dispatch(setLoading(false))
                navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]})
            }
            
        })
        .catch((err) => {
            dispatch(setLoading(false))
            showMessage(err?.response?.data?.message)
        }
    )
}

export const signInAction = (form, navigation) => (dispatch) => {
    dispatch(setLoading(true))
    axios.post(`${API_HOST.url}/login`, form)
        .then((res) =>{
            const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
            const profile = res.data.data.user;

            storeData('token', {value: token})
            storeData('userProfile', profile)

            dispatch(setLoading(false))
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
        })
        .catch((err) => {
            dispatch(setLoading(false))
            showMessage(err?.response?.data?.message)
        })
}