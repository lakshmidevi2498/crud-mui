import * as types from './actionTypes'


export const putEmployeeDataStart=()=>{
    return{
        type:types.UPDATE_EMPLOYEE_DATA_START
    }   
};

export const putEmployeeDataSuccess=(data)=>{
    console.log("this is putdatasuccessaction---->",data)
    return{
        type:types.UPDATE_EMPLOYEE_DATA_SUCCESS,
        payload:data
    }
};

export const putEmployeeDataError=(error)=>{
    console.log("this is putdataerrorsaction---->")
    return{
        type:types.UPDATE_EMPLOYEE_DATA_ERROR,
        payload:error
    }
}