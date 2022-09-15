import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { makeLoadingSelector } from '../../app/loading';
import { MIN_INVITE_DISTANCE, OFFICE_COORDINATES } from '../../constants';
import { getDistanceBetweenTwoCords } from '../../utils/geo';
import { getPartnersAction } from './actions';
import PartnerCard from './PartnerCard';
import { makePartnersSelector } from './selectors';
import { Partner, ProximityPartner } from './types';

export default function GeoPartners() {
  const partners: Partner[] = useAppSelector(makePartnersSelector);
  const partnersLoading = useAppSelector(makeLoadingSelector(getPartnersAction.REQUEST.type))
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');

  console.log(partners, partnersLoading);

  useEffect(() => {
    dispatch(getPartnersAction.REQUEST());
  }, [dispatch])

  useEffect(() => {
    if (partnersLoading.pending) {
      setMessage('Loading')
    } else if (partnersLoading.fulfilled) {
      setMessage('Success')
    } else if (partnersLoading.rejected) {
      setMessage('Error')
    } 
  }, [partnersLoading]);

  const partnersInProximity = useMemo(() => {
    let result: ProximityPartner[] = [];

    // find distance from all partners to office location
    for (const prt of partners) {
      const distanceToOffice = getDistanceBetweenTwoCords(
        [Number(prt.latitude), Number(prt.longitude)],
        OFFICE_COORDINATES
      );
      const newProximityPartner: ProximityPartner = { ...prt, proximity: distanceToOffice };
    
      result.push(newProximityPartner);
    }

    // sort accending
    result = result.sort((a: ProximityPartner, b: ProximityPartner) => a.partner_id - b.partner_id).filter(pr => pr.proximity <= MIN_INVITE_DISTANCE);

    return result;
  }, [partners]);


  if (partners.length === 0 && !partnersLoading.pending && !partnersLoading.rejected) {
    return <p>Empty</p>
  }

  return (
    <div>
      {partnersInProximity.map(pr => (
        <Box sx={{ display: 'inline-block', width: "calc(25% - 10px)", marginBottom: '20px', padding: '0 5px' }}>
          <PartnerCard key={pr.partner_id} partner={pr} />
        </Box>
      ))}
    </div>
  )
}
