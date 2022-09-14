import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { makeLoadingSelector } from "../../app/loading";
import TourCard from "./TourCard";
import { fetchAllToursThunk, makeToursSelector } from "./tourSlice";

export default function TourList() {
  const dispatch = useAppDispatch();
  const tours = useSelector(makeToursSelector);
  const toursLoading = useSelector(
    makeLoadingSelector(fetchAllToursThunk.pending.type)
  );

  useEffect(() => {
    dispatch(fetchAllToursThunk());
  }, []);

  if (toursLoading.pending) return <p>Loading...</p>;
  if (toursLoading.rejected) return <p>ERROR!!!</p>;

  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {tours.map((tr) => (
        <Grid item xs={4} key={tr.name}>
          <TourCard tour={tr} />
        </Grid>
      ))}
    </Grid>
  );
}
