import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveEmployeeData } from '../redux/api/addEmployeeeApi';
import { fetchEmployeeData } from '../redux/api/getEmployeeApi';
import theme from '../utils/Theme';
import { getEmployeeDataStart, getEmployeeDataSuccess, getEmployeeDataError } from '../redux/actions/getEmployeeAction';
import { postEmployeeDataStart, postEmployeeDataSuccess, postEmployeeDataError } from '../redux/actions/addEmployeeAction';
import ModalComponent from './Modal';
import Employee from './Employee';
import Imports from '../commons/allImports';

const AddEmployee = ({ dispatch }) => {
    useEffect(() => {
        getAllEmployeeData();
    }, [])

    const initialEmployeeData = {
        name: '',
        email: '',
        role: '',
        location: '',
        rating: null,
        gender: '',
    };
   

    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [employee, setEmployee] = useState(initialEmployeeData);
    

    const getAllEmployeeData = async () => {
        dispatch(getEmployeeDataStart());
        console.log("this is ")
        try {
            const responseObject = await fetchEmployeeData();
            console.log("this is addEmployee component  responseObject", responseObject)
            dispatch(getEmployeeDataSuccess(responseObject));
        } catch (error) {
            dispatch(getEmployeeDataError(error));
        }
    };

    const handleAdd = () => {
        setIsEditMode(false);
        setEmployee(initialEmployeeData);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditMode(false);
        setEmployee('');
    };

    const submitHandle = async () => {
        const { name, email, role, location, gender, rating } = employee
               
                if (!name || !email || !role || !location || !gender || !rating) {
                    alert("please give all input fields")
                } else {
                    const newdata = { ...employee };

                    dispatch(postEmployeeDataStart());
                    try {
                        const newEmployee = await saveEmployeeData(newdata);
                        dispatch(postEmployeeDataSuccess(newEmployee));
                        getAllEmployeeData();
                        handleClose();
                    } catch (error) {
                        dispatch(postEmployeeDataError(error));
                    }
                }
        }

            const handleChange = (event) => {
                const { name, value } = event.target;
                setEmployee({ ...employee, [name]: value });
            };
   


    return (
        <>
            <Imports.Grid sx={{ marginTop: 0, color: 'white' }}>
                <Imports.Grid container justifyContent="space-between" alignItems="center" style={{ backgroundColor: theme.palette.one.main, padding: '20px' }}>
                    <Imports.Typography variant='h5'>Manage Employee Details</Imports.Typography>
                    <Imports.Button variant='outlined' sx={{ color: 'white' }} onClick={handleAdd}>ADD+</Imports.Button>
                </Imports.Grid>
                <Employee initialEmployeeData={initialEmployeeData} getAllEmployeeData={getAllEmployeeData} submitHandle={submitHandle} />
                {open && (
                    <ModalComponent
                        open={open}
                        handleClose={handleClose}
                        submitHandle={submitHandle}
                        employee={employee}
                        handleChange={handleChange}
                        isEditMode={isEditMode}
                        setEmployee={setEmployee}
                        // errors={errors}
                        // initialErrors={initialErrors}
                        
                    />
                )}
            </Imports.Grid>
        </>
    );
};

const mapStateToProps = (state) => (
    // console.log("state", state.getemployeedata),
    {
   
    data: state.getemployeedata.data,
    loading: state.getemployeedata.loading,
    error: state.getemployeedata.error,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);
