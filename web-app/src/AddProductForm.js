import React, {useState, useEffect} from 'react';
import Arweave from 'arweave';
import { WarpFactory } from 'warp-contracts/web';
import TextField from '@mui/material/TextField';
import { Button, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import generateAnnouncement from './helpers/generateAnnouncement';

const ARPlaceContractAddress = "Z_2TgMpZv9YgfVim1FFliXpsmQj5YU37qEiEu0gejCI";

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

        // // Create an object of formData
        // const formData = new FormData();
    
        // // Update the formData object
        // formData.append(
        //     "myFile",
        //     photo,
        //     photo.name
        // );
    
        // // Details of the uploaded file
        // console.log("upload", photo);
        
        // // Request made to the backend api
        // // Send formData object
        // // axios.post("api/uploadfile", formData);

        // console.log("submit");
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
            console.log("transaction 2", transaction);
        });

    },[photoARAddress]);

    // step 3: add transaction hash to the smart contract
    useEffect(() => {
        if(!productARAddress) {
            return;
        }

        const contract = warp.contract(ARPlaceContractAddress).connect('use_wallet');
        console.log("contract", contract);
        console.log('id', productARAddress)
        contract.writeInteraction({function: 'addAnnouncement', address: productARAddress}).then(({ originalTxId }) => {
            console.log("originalTxId", originalTxId);
        })
    }, [productARAddress]);

    const isSubmittable = title && description && price && contact && photo && !photoARAddress && !productARAddress
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
            <Grid item xs={3}>
                <Button variant="contained" size="large" onClick={handleOnSubmit}>
                    Dodaj
                </Button>
            </Grid>
        </Grid>
    );
}
