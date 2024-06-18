import * as types from './actionTypes'

export const deleteEmployeeDataStart=()=>{
    return{
        type:types.DELETE_EMPLOYEE_DATA_START
    }
}
export const deleteEmployeeDataSuccess=(data)=>{
    console.log("this is delete employee reducer call---->")
    return{
        type:types.DELETE_EMPLOYEE_DATA_SUCCESS,
        payload:data
    }
}
export const deleteEmployeeDataError=(error)=>{
    return{
        type:types.DELETE_EMPLOYEE_DATA_ERROR,
        payload:error
    }
}