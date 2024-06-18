import * as REACT from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import { deleteEmployeedata, } from '../redux/api/deleteEmployeeApi';
import { updateEmployeeDataChanges} from "../redux/api/updateEmployeeApi"
import theme from '../utils/Theme';
import { deleteEmployeeDataError, deleteEmployeeDataStart, deleteEmployeeDataSuccess } from '../redux/actions/deleteEmployeeAction';
import { putEmployeeDataStart, putEmployeeDataSuccess, putEmployeeDataError } from '../redux/actions/updateEmployeeAction';
import ModalComponent from './Modal';
import Imports from '../commons/allImports';
import { styled } from '@mui/material';
import View from './View'

const Employee = ({ dispatch, data,initialEmployeeData,getAllEmployeeData,submitHandle }) => {
    const TableStyle = styled(Imports.TableCell)({
        textAlign: 'center', 
        fontWeight: 'bold'
    })
    
const [isEditMode, setIsEditMode] = useState(false);
const [view, setView] = useState({});
const [modalOpen, setModalOpen] = useState(false);
const [employee, setEmployee] = useState({initialEmployeeData})

const handleEdit = (id) => {
    setIsEditMode(true);
    const selectedEmployee = data.find((emp) => emp.id === id);
    if (selectedEmployee) {
        setEmployee({
            id: selectedEmployee.id,
            name: selectedEmployee.name,
            email: selectedEmployee.email,
            role: selectedEmployee.role,
            location: selectedEmployee.location,
            rating: selectedEmployee.rating,
            gender: selectedEmployee.gender
        });
    }
};

const handleView = (name, email, role, location, rating, gender) => {
    setModalOpen(true);
    setView({ name, email, role, location, rating, gender });
};

const handleCloseModal = () => {
    setModalOpen(false);
};

const handleDelete = async (id) => {
    dispatch(deleteEmployeeDataStart());
    try {
        await deleteEmployeedata(id);
        dispatch(deleteEmployeeDataSuccess(id));
        getAllEmployeeData(); 
    } catch (error) {
        dispatch(deleteEmployeeDataError(error));
    }
};

const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
};

const handleClose = () => {
    setIsEditMode(false);
    setEmployee({
        name: '',
        email: '',
        role: '',
        location: '',
        rating: null,
        gender: ''
    });
};


const handleSaveChanges = async () => {
    const { name, email, role, rating, gender, location, id } = employee;
    const updateemployeedata = { name, email, role, rating, gender, location, id };

    console.log("updateemployeedata",updateemployeedata)

        dispatch(putEmployeeDataStart());
    try {
        const employeedata = await updateEmployeeDataChanges(updateemployeedata, id);
        dispatch(putEmployeeDataSuccess(employeedata));
        getAllEmployeeData();
        handleClose();
    } catch (error) {
        dispatch(putEmployeeDataError(error));
    }
    
};

return (
    <>
        <Imports.Grid sx={{ maxWidth: '100%', justifyContent: 'center', marginBottom: 0 }}>
            <Imports.TableContainer component={Paper}>
                <Imports.Table size="small" aria-label="a dense table">
                    <Imports.TableHead>
                        <Imports.TableRow >
                            <TableStyle >NAME</TableStyle>
                            <TableStyle >ROLE</TableStyle>
                            <TableStyle>EMAIL</TableStyle>
                            <TableStyle >GENDER</TableStyle>
                            <TableStyle >LOCATION</TableStyle>
                            <TableStyle >RATING</TableStyle>
                            <TableStyle >ACTIONS</TableStyle>
                        </Imports.TableRow>
                    </Imports.TableHead>
                    <Imports.TableBody>
                        {data.map((row) => (
                            <Imports.TableRow key={row.id}>
                                <TableStyle >{row.name}</TableStyle>
                                <TableStyle >{row.role}</TableStyle>
                                <TableStyle >{row.email}</TableStyle>
                                <TableStyle >{row.gender}</TableStyle>
                                <TableStyle >{row.location}</TableStyle>
                                <TableStyle >
                                    <Imports.Box sx={{ '& > legend': { mt: 2 } }}>
                                        <Imports.Rating name="read-only" value={row.rating} readOnly />
                                    </Imports.Box>
                                </TableStyle>
                                <TableStyle>
                                    <Imports.Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Imports.Button onClick={() => handleEdit(row.id)}><Imports.EditIcon /></Imports.Button>
                                        <Imports.Button sx={{ color: theme.palette.two.main }} onClick={() => handleView(row.name, row.email, row.role, row.location, row.rating, row.gender)}><Imports.RemoveRedEyeIcon /></Imports.Button>
                                        <Imports.Button sx={{ color: theme.palette.three.main }} onClick={() => handleDelete(row.id)}><Imports.DeleteIcon /></Imports.Button>
                                    </Imports.Grid>
                                </TableStyle>
                            </Imports.TableRow>
                        ))}
                    </Imports.TableBody>
                </Imports.Table>
            </Imports.TableContainer>

              {isEditMode && (
                <ModalComponent
                    open={isEditMode}
                    handleClose={handleClose}
                    submitHandle={submitHandle}
                    employee={employee}
                    handleChange={handleChange}
                    isEditMode={isEditMode}
                    setEmployee={setEmployee}
                    handleSaveChanges={handleSaveChanges}
                />
            )}

            {modalOpen && (
                  <View 
                  open={modalOpen}
                  handleView={handleView}
                  onClose={handleCloseModal}
                  modalOpen={modalOpen}
                  view={view}
                  setView={setView}
              />
                
            )}
        </Imports.Grid>
    </>
);

}
const mapStateToProps = (state) => ({
data: state.getemployeedata.data,
loading: state.getemployeedata.loading,
error: state.getemployeedata.error,
});

const mapDispatchToProps = (dispatch) => ({
dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(Employee);
