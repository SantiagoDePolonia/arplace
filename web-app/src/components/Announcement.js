
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RedStoneOracleEthPrice from './RedStoneOracleEthPrice';

const Announcement = ({announcement, ETHPrice}) => (
    <Grid item xs={6} mt={3}>
        <Card>
            <CardHeader title={announcement.title} />
            <CardMedia
                component="img"
                height="250px"
                image={"https://arweave.net/"+announcement.photo}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/default.png";
                  }}
                alt="Product photo"
            />
            <CardContent>
                {/*
                    TODO:
                    ADD REMOVE BUTTON IF THE WALLET OWNER IS ITEM OWNER
                    <Button onClick={onClick}>Remove announcement</Button>
                */}
                <Typography>
                    {announcement.description}
                </Typography>
                <Grid container mt={3}>
                    <Grid item xs={6}>
                        {announcement.contact ?
                            <Typography variant="h6">
                                <LocalPhoneIcon /> Contact: {announcement.contact}
                            </Typography>
                        :
                            <i>(no contact)</i>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" textAlign={"right"}>
                            <strong>
                                $ {announcement.price ? announcement.price : "not disclosed" } 
                                <RedStoneOracleEthPrice ETHPrice={ETHPrice} price={announcement.price} />
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
);

export default Announcement;
