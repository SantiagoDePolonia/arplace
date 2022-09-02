import React from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

export default function AddProductForm() {
    return (
    <Grid container spacing={2}>
        <Grid item xs={12} mt={2}>
            <TextField
                mt={4}
                label="Title"
                maxRows={4}
            />
        </Grid>
        <Grid item xs={12}>
        </Grid>
    </Grid>
  );
}