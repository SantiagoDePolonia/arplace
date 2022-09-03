import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';

export default function AddProductForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photoHash, setPhotoHash] = useState("");
    const [contact, setContact] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    return (
        <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={10} mt={2}>
                <TextField
                    onChange={handleTitleChange}
                    value={title}
                    fullWidth
                    mt={4}
                    label="Title"
                />
            </Grid>
            <Grid item xs={10}>
                <TextField
                    onChange={handleDescriptionChange}
                    value={description}
                    fullWidth
                    mt={4}
                    minRows={2}
                    multiline
                    label="Description"
                />
            </Grid>
            <Grid item xs={10}>
                <FormControl fullWidth mt={12}>
                    <InputLabel>
                        Price
                    </InputLabel>
                    <OutlinedInput
                        onChange={handlePriceChange}
                        value={price}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10}>
                <FormControl fullWidth mt={12}>
                    <InputLabel shrink={true}>
                        Photo
                    </InputLabel>
                    <OutlinedInput
                        notched={true}
                        type="file"
                        hidden
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10}>
                <FormControl fullWidth mt={12}>
                    <InputLabel>
                        Contact
                    </InputLabel>
                    <OutlinedInput
                        onChange={handleContactChange}
                        value={contact}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" size="large">
                    Dodaj
                </Button>
            </Grid>
        </Grid>
    );
}
