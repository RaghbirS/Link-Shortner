import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({val,func,tag }) {

  return (
    <Box width={"250px"} display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Typography>{val[0]}</Typography>
        <Typography>{tag}</Typography>
        <Typography>{val[1]}</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={val}
          onChange={(t,val)=>func([...val])}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={100000}
        />
      </Box>
    </Box>
  );
}