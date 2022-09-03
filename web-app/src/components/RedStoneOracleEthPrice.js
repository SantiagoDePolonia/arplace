import { Typography } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

const RedStoneOracleEthPrice = ({price, ETHPrice}) => {
    const numericPrice = parseFloat(price);
    if(!numericPrice || isNaN(numericPrice)) {
        return null;
    }

    if(!ETHPrice) {
        return (<CircularProgress />);
    }

    const ETHItemPrice = numericPrice / ETHPrice;
    return (<Typography>~ {ETHItemPrice.toFixed(8)} ETH</Typography>);
}

export default RedStoneOracleEthPrice;
