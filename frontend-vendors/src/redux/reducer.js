import { DataDeleteSuccess, DataLoadinFailure, DataLoadinPending, DataLoadinSuccess, DataPatchSuccess, DataPostSuccess } from "./actionType";

const initialState =  {
    isLoading:true,
    isError:false,
    data:[]
};

export const reducer = (state=initialState,{type,payload})=>{
// console.log(payload)
    switch (type) {
        case DataLoadinPending:{

            return {...state,isLoading:true,isError:false}
        }
        case DataLoadinSuccess:{

            return {...state,isLoading:false,isError:false,data:payload}
        }
        case DataLoadinFailure:{

            return {...state,isLoading:false,isError:true}
        }
        case DataPatchSuccess:{

            return {...state,isLoading:false,isError:false}
        }
        case DataDeleteSuccess:{

            return {...state,isLoading:false,isError:false}
        }
        case DataPostSuccess:{

            return {...state,isLoading:false,isError:false}
        }
    
        default:
           return state;
    }
}