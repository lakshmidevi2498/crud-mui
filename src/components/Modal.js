import React, { useState } from 'react';
import theme from '../utils/Theme';
import Imports from '../commons/allImports';

const ModalComponent = ({ open, handleClose, submitHandle, employee, handleSaveChanges, isEditMode, setEmployee }) => {
    const initialErrors = {
        nameError: false,
        emailError: false,
        roleError: false,
        locationError: false,
        genderError: false,
        ratingError: false
    };

    const [errors, setErrors] = useState(initialErrors);

    const handleSubmit = (event) => {
        event.preventDefault();

        const isNameValid = validateName(employee.name);
        const isEmailValid = validateEmail(employee.email);
        const isRoleValid = validateRole(employee.role);
        const isLocationValid = validateLocation(employee.location);
        const isRatingValid = validateRating(employee.rating);
        const isGenderValid = validateGender(employee.gender);

        if (isNameValid && isEmailValid && isRoleValid && isLocationValid && isRatingValid && isGenderValid) {
            if (isEditMode) {
                handleSaveChanges();
            } else {
                submitHandle();
            }
        } else {
             alert("Please fill out all fields correctly.");
        }
    };

    const validateName = (name) => {
        if (!name || name.length < 3) {
            setErrors(prevErrors => ({ ...prevErrors, nameError: true }));
            return false;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, nameError: false }));
            return true;
        }
    };

    const validateEmail = (email) => {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailFormat)) {
            setErrors(prevErrors => ({ ...prevErrors, emailError: true }));
            return false;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, emailError: false }));
            return true;
        }
    };

    const validateRole = (role) => {
        if (!role) {
            setErrors(prevErrors => ({ ...prevErrors, roleError: true }));
            return false;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, roleError: false }));
            return true;
        }
    };

    const validateLocation = (location) => {
        if (!location) {
            setErrors(prevErrors => ({ ...prevErrors, locationError: true }));
            return false;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, locationError: false }));
            return true;
        }
    };

    const validateGender = (gender) => {
        if (!gender) {
            setErrors(prevErrors => ({ ...prevErrors, genderError: true }));
            return false;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, genderError: false }));
            return true;
        }
    };

    const validateRating = (rating) => {
        if (!rating) {
            setErrors(prevErrors => ({ ...prevErrors, ratingError: true }));
            return false;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, ratingError: false }));
            return true;
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });

        switch (name) {
            case 'name':
                validateName(value);
                break;
            case 'email':
                validateEmail(value);
                break;
            case 'role':
                validateRole(value);
                break;
            case 'location':
                validateLocation(value);
                break;
            case 'gender':
                validateGender(value);
                break;
            case 'rating':
                validateRating(value);
                break;
            default:
                break;
        }
    };

    return (
        <Imports.Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: submitHandle,
            }}
            sx={{ padding: '20px' }}
        >
            <Imports.DialogTitle style={{ backgroundColor: theme.palette.four.main, color: theme.palette.one.main, marginBottom: '20px' }}>
                <Imports.Typography variant='h5' sx={{ textAlign: 'left' }}>{isEditMode ? 'Edit Employee Details:' : 'Add Employee Details:'}</Imports.Typography>
            </Imports.DialogTitle>
            <Imports.DialogContent >
                <Imports.Grid container spacing={2}>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={employee.name}
                            onChange={handleChange}
                        />
                         {errors.nameError && <Imports.Typography sx={{color:'red'}}>Enter FULLNAME  at least it contains 3 letters</Imports.Typography>}
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.TextField
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={employee.email}
                            onChange={handleChange}
                        />
                        {errors.emailError && <Imports.Typography sx={{color:'red'}}>Enter valid Email </Imports.Typography>}
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.TextField
                            required
                            margin="dense"
                            id="role"
                            name="role"
                            label="Role"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={employee.role}
                            onChange={handleChange}
                        />
                        {errors.roleError && <Imports.Typography sx={{color:'red'}}>Enter your role</Imports.Typography>}
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.TextField
                            required
                            margin="dense"
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={employee.location}
                            onChange={handleChange}
                        />
                        {errors.locationError && <Imports.Typography sx={{color:'red'}}>Enter your Location</Imports.Typography>}
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.FormControl component="fieldset" fullWidth>
                            <Imports.RadioGroup
                                aria-label="gender"
                                name="gender"
                                value={employee.gender}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 18,
                                    },
                                }}
                            >Gender
                                <Imports.FormControlLabel value="Male" control={<Imports.Radio />} label="Male" />
                                <Imports.FormControlLabel value="Female" control={<Imports.Radio />} label="Female" />
                            </Imports.RadioGroup>
                        </Imports.FormControl>
                        {errors.genderError && <Imports.Typography sx={{color:'red'}}>Choose gender</Imports.Typography>}
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.FormControl component="fieldset" fullWidth>Rating
                            <Imports.Box sx={{ '& > legend': { mt: 2 } }}>
                                <Imports.Rating
                                    name="rating"
                                    value={employee.rating}
                                    onChange={(event, newValue) => {
                                        setEmployee({ ...employee, rating: newValue });
                                        validateRating(newValue);
                                    }}
                                />
                                {errors.ratingError && <Imports.Typography sx={{color:'red'}}>Choose Rating</Imports.Typography>}
                            </Imports.Box>
                        </Imports.FormControl>
                    </Imports.Grid>
                </Imports.Grid>
            </Imports.DialogContent>
            <Imports.DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Imports.Button onClick={handleClose} variant='contained'
                    sx={{
                        backgroundColor: theme.palette.three.main,
                        '&:hover': { backgroundColor: theme.palette.three.main },
                    }}>Cancel</Imports.Button>
                <Imports.Button type="submit" variant='contained'
                    sx={{
                        backgroundColor: theme.palette.two.main,
                        '&:hover': { backgroundColor: theme.palette.two.main },
                    }}
                    onClick={handleSubmit}>
                    {isEditMode ? 'Save Changes' : 'Save'}
                </Imports.Button>
            </Imports.DialogActions>
        </Imports.Dialog>
    );
};

export default ModalComponent;
