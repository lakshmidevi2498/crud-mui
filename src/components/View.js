import REACT from 'react';
import Imports from '../commons/allImports';
import theme from '../utils/Theme';

const View = ({ open, handleView, onClose, view }) => {
    return (
        <Imports.Dialog open={open} onClose={onClose} sx={{ padding: '20px' }}>
            <Imports.DialogTitle style={{ backgroundColor: theme.palette.five.main, color: theme.palette.three.main, marginBottom: '20px' }}>
                <Imports.Typography variant='h5' sx={{ textAlign: 'center' }}>Selected Employee Details</Imports.Typography>
            </Imports.DialogTitle>
            <Imports.DialogContent sx={{ padding: '20px' }}>
                <Imports.Grid container spacing={2}>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.Typography variant=''>Full Name: {view.name}</Imports.Typography>
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.Typography>Email: {view.email}</Imports.Typography>
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.Typography>Role: {view.role}</Imports.Typography>
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.Typography>Gender: {view.gender}</Imports.Typography>
                    </Imports.Grid>
                    <Imports.Grid item xs={12} md={6}>
                        <Imports.Typography>Location: {view.location}</Imports.Typography>
                    </Imports.Grid>
                    <Imports.Box sx={{ '& > legend': { mt: 6 } ,display:'flex' ,marginTop:"10px"}}>
                        Rating:
                        <Imports.Rating name="rating" value={view.rating} />
                    </Imports.Box>
                </Imports.Grid>
            </Imports.DialogContent>
            <Imports.DialogActions>
                <Imports.Button onClick={onClose} variant='contained' sx={{ backgroundColor: theme.palette.three.main, '&:hover': { backgroundColor: theme.palette.three.main } }}>Close</Imports.Button>
            </Imports.DialogActions>
        </Imports.Dialog>
    );
};

export default View;
