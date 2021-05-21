import axios from "axios"
import { API_HOST } from "../../config/API"
import {getData} from "../../utils"

export const getOrder = () => (dispatch) => {
    getData('token').then((resToken) => {
        axios.get(`${API_HOST.url}/transaction`, {
            headers:{
                'Authorization' : resToken.value 
            }
        }).then((resOrder) => {
            console.log(resOrder.data)
            dispatch({type: 'SET_ORDER', value: resOrder.data.data.data})
        }).catch((err) => {
            console.log(err?.response)
        })
    })
}
export const getInProgress = () => (dispatch) => {
    getData('token').then((resToken) => {
        axios.all([
            axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
                headers:{
                    'Authorization' : resToken.value 
                }
            }),        
            axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
                headers:{
                    'Authorization' : resToken.value 
                }
            }),        
            axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
                headers:{
                    'Authorization' : resToken.value 
                }
            }),        
        ]).then(axios.spread((res1, res2, res3) => {
            console.log('onder1', res1.data)
            console.log('onder2', res2.data)
            console.log('onder3', res3.data)
            const pending = res1.data.data.data
            const success = res2.data.data.data
            const onDelivery = res3.data.data.data
            dispatch({type: 'SET_IN_PROGRESS', value: [...pending, ...success, ...onDelivery]})
        })).catch((err) => {
            console.log(err?.response)
        })
    })
}

// BCA M Bangking 16258486879

export const getPastOrders = () => (dispatch) => {
    getData('token').then((resToken) => {
        axios.all([
            axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
                headers:{
                    'Authorization' : resToken.value 
                }
            }),
            axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
                headers:{
                    'Authorization' : resToken.value 
                }
            }),
        ]).then(axios.spread((res1, res2) => {
            const cancelled = res1.data.data.data
            const delivered = res2.data.data.data
            dispatch({type: 'SET_PAST_ORDERS', value: [...cancelled, ...delivered]})
        })).catch((err) => {
            console.log(err?.response)
        })
    })
}
