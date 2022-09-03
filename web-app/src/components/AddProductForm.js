import React, {useState, useEffect} from 'react';
import Arweave from 'arweave';
import { WarpFactory } from 'warp-contracts/web';
import TextField from '@mui/material/TextField';
import { Button, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import generateAnnouncement from '../helpers/generateAnnouncement';
import { AR_PLACE_CONTRACT_ADDRESS } from '../consts';

const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
});

const warp = WarpFactory.forMainnet();

export default function AddProductForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState();
    const [photoARAddress, setPhotoARAddress] = useState();
    const [productARAddress, setProductARAddress] = useState();

    const [contact, setContact] = useState("");

    const isSubmittable = title && description && price && contact && photo && !photoARAddress && !productARAddress

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

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        } else {
            setPhoto();
        }
    };

    // SUBMITTING ANNONCEMENT PROCESS IN 3 STEPS!

    // step 1: upload photo on submit
    const handleOnSubmit = (_e) => {
        // TODO: validation. To make button active only if photo and other required fields are not empty
        if(!photo) {
            return;
        }

        let reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const transaction = await arweave.createTransaction({
                data: arrayBuffer
            });
            transaction.addTag('Content-Type', photo.type);
            await arweave.transactions.sign(transaction);
            await arweave.transactions.post(transaction);
            setPhotoARAddress(transaction.id);
        };
        reader.readAsArrayBuffer(photo);
    };

    // step 2: upload json with product details and photo arweave transaction hash
    useEffect(() => {
        if(!photoARAddress) {
            return;
        }
        const stringifiedAnnouncement = generateAnnouncement(title, description, price, contact, photoARAddress);

        arweave.createTransaction({
            data: stringifiedAnnouncement
        }).then(async (transaction) => {
            transaction.addTag('Content-Type', 'text/plain');
            await arweave.transactions.sign(transaction);
            await arweave.transactions.post(transaction);
            setProductARAddress(transaction.id);
        });

    },[photoARAddress]);

    // step 3: add transaction hash to the smart contract
    useEffect(() => {
        if(!productARAddress) {
            return;
        }

        const contract = warp.contract(AR_PLACE_CONTRACT_ADDRESS).connect('use_wallet');

        contract.writeInteraction({function: 'addAnnouncement', address: productARAddress}).then(({ originalTxId }) => {
            window.location.href = '/'; // redirect to home after the announcement has been added
        })
    }, [productARAddress]);

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
                    <label>
                        <Typography style={{textAlign:"left"}}>Photo</Typography>
                    </label>
                    <input onChange={handlePhotoChange} name="file" id="photo" type='file' />
                </FormControl>
            </Grid>
            <Grid item xs={10}>
                <TextField
                    onChange={handleContactChange}
                    value={contact}
                    fullWidth
                    mt={4}
                    label="Contact"
                />
            </Grid>
            <Grid item xs={10}>
                <Button disabled={!isSubmittable} variant="contained" size="large" onClick={handleOnSubmit}>
                    Dodaj
                </Button>
            </Grid>
        </Grid>
    );
}
