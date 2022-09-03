import React, {useState, useEffect} from 'react';
import redstone from 'redstone-api';

import { Grid } from '@mui/material';
import Announcement from './Announcement';

const AnnouncementsListning = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [ETHPrice, setETHPrice] = useState();

    useEffect(() => {
        fetch('http://localhost:3001/api/announcements').then(response => {

            // TODO: Add error reporting
            return response.json();
        }).then(json => {
            setAnnouncements(json);
        });
    }, []);

    useEffect(() => {
        redstone.getPrice("ETH").then(response => {
            setETHPrice(response.value);
        });
    }, []);


    const announcementList = announcements.map((announcement, index) => (
        <Announcement key={index} announcement={announcement} ETHPrice={ETHPrice} />
    ));
    
    return (
        <Grid container spacing={2}>
            {announcementList}
        </Grid>
    );
};

export default AnnouncementsListning;
