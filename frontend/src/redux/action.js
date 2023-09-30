import { DataDeleteSuccess, DataLoadinFailure, DataLoadinPending, DataLoadinSuccess, DataPatchSuccess, DataPostSuccess } from "./actionType"
import axios from "axios"
import { base_url } from "../utils/base_url";


//get data from server
export const getData = (page = 1) => (dispatch) => {

    dispatch({ type: DataLoadinPending });
    axios.get(`${base_url}?page=${page}&limit=5`).then((res) => {
        dispatch({ type: DataLoadinSuccess, payload: res.data })
    });
    dispatch({ type: DataLoadinFailure });
}


//patch data
export const editData = (id, obj) => (dispatch) => {

    dispatch({ type: DataLoadinPending });
    return axios.patch(`${base_url}${id}`, obj).then((res) => {
        dispatch({ type: DataPatchSuccess })

    }).catch((error) => {
        dispatch({ type: DataLoadinFailure });
    })
}



//delete data
export const deleteVendor = (id)=>(dispatch) => {

    dispatch({ type: DataLoadinPending });
    return axios.delete(`${base_url}${id}`).then((res) => {
           dispatch({ type: DataDeleteSuccess,})
    }).catch((error) => {
        dispatch({ type: DataLoadinFailure });
    })

}


//post data
export const addVendor = (obj)=>(dispatch)=>{

    dispatch({ type: DataLoadinPending });
    axios.post(`${base_url}add`,obj).then((res)=>{
    console.log(res.data)
         dispatch({type:DataPostSuccess});
    })
    dispatch({type:DataLoadinFailure})
}


