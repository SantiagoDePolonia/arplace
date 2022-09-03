import React, {useState, useEffect} from 'react';

import Arweave from 'arweave';

import { Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';

const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
});

const ProductsListning = () => {
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/announcements').then(response => {

        // TODO: Add error reporting
            return response.json();
        }).then(json => {
            setAnnouncements(json);
        });
    }, []);

    console.log("announcements", announcements);

    const products = [
        {
            "title": "Phone for sell - Samsung A70 - used",
            "description": "It was really cool phone until one day it had follen down and the glass on the front broke.",
            "price": "150 $",
            "contact": "+48 725544943",
            "photo": "rQOopuqG74dVWBb1EICh3S9BhLgqM38XgQcZoq0WUE8",
            "added": "2022-09-01"
        },
        {
            "title": "Phone for sell - Samsung A70 - used",
            "description": "It was really cool phone until one day it had follen down and the glass on the front broke.",
            "price": "150 $",
            "contact": "+48 725544943",
            "photo": "rQOopuqG74dVWBb1EICh3S9BhLgqM38XgQcZoq0WUE8",
            "added": "2022-09-01"
        },
        {
            "title": "Phone for sell - Samsung A70 - used",
            "description": "It was really cool phone until one day it had follen down and the glass on the front broke.",
            "price": "150 $",
            "contact": "+48 725544943",
            "photo": "rQOopuqG74dVWBb1EICh3S9BhLgqM38XgQcZoq0WUE8",
            "added": "2022-09-01"
        }
    ];

    // const onClick = async () => {
    //     let transaction = await arweave.createTransaction({
    //         data: "Some Data"
    //     });
    //     transaction.addTag('Content-Type', 'text/html');
    //     arweave.transactions.sign(transaction);    
    // };

    return (
        <Grid container spacing={2}>
            {announcements.map((product, index) => (
                <Grid item xs={6} mt={3} key={index}>
                    <Card>
                        <CardHeader title={product.title} />
                        <CardMedia
                            component="img"
                            height="100px"
                            image={"https://arweave.net/"+product.photo}
                            alt="Product photo"
                        />
                        <CardContent>
                            {/*
                                ADD REMOVE BUTTON IF THE USER EXISTS
                                <Button onClick={onClick}>Test</Button>
                            */}
                            <Typography>
                                {product.description}
                            </Typography>
                            <Typography variant="h6" mt={3}>
                                Contact: {product.contact}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsListning;
