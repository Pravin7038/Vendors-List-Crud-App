import { DataDeleteSuccess, DataLoadinFailure, DataLoadinPending, DataLoadinSuccess, DataPatchSuccess, DataPostSuccess } from "./actionType"
import axios from "axios"


//get data from server
export const getData = (page = 1) => (dispatch) => {

    dispatch({ type: DataLoadinPending });
    axios.get(`http://localhost:8080/vendors/?page=${page}&limit=5`).then((res) => {
        dispatch({ type: DataLoadinSuccess, payload: res.data })
    });
    dispatch({ type: DataLoadinFailure });
}


//patch data
export const editData = (id, obj) => (dispatch) => {

    dispatch({ type: DataLoadinPending });
    return axios.patch(`http://localhost:8080/vendors/${id}`, obj).then((res) => {
        dispatch({ type: DataPatchSuccess })

    }).catch((error) => {
        dispatch({ type: DataLoadinFailure });
    })
}



//delete data
export const deleteVendor = (id)=>(dispatch) => {

    dispatch({ type: DataLoadinPending });
     axios.delete(`http://localhost:8080/vendors/${id}`).then((res) => {
        return dispatch({ type: DataDeleteSuccess,})
    }).catch((error) => {
        dispatch({ type: DataLoadinFailure });
    })

}


//post data
export const addVendor = (obj)=>(dispatch)=>{

    dispatch({ type: DataLoadinPending });
    axios.post(`http://localhost:8080/vendors/add`,obj).then((res)=>{
    console.log(res.data)
         dispatch({type:DataPostSuccess});
    })
    dispatch({type:DataLoadinFailure})
}


