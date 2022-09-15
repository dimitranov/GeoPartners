import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { MIN_INVITE_DISTANCE } from '../../constants';
import { getDistanceInKm } from '../../utils/valueFormater';
import { ProximityPartner } from './types'

interface PartnerCardProps {
    partner: ProximityPartner;
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
    const isInvited = partner.proximity <= MIN_INVITE_DISTANCE;
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                    {partner.partner_id}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                    {partner.name}
                </Typography>
                <Typography variant="body2">
                    Position: [{partner.latitude}, {partner.longitude}]
                </Typography>
                <Typography variant="body2">
                    Distance to office: {getDistanceInKm(partner.proximity)}
                </Typography>
                <Typography variant="body2" color={!isInvited ? "red": "green"}>
                    Invite status: {isInvited ? "INVITED" : "NOT INVITED"}
                </Typography>
            </CardContent>
        </React.Fragment>
    );


    return (
        <Card variant="outlined" sx={{ height: '300px' }}>{card}</Card>
    )
}

export default React.memo(PartnerCard);
