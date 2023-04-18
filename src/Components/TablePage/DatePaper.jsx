import React, { useState } from "react";
import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from "@chakra-ui/react";

function DateRangeSlider({sliderValues,setSliderValues}) {
  
  const [sliderMin, setSliderMin] = useState(new Date('2022.01.01').getTime() / 1000);
  const [sliderMax, setSliderMax] = useState(new Date().getTime() / 1000);

  const updateInputValue = (values) => {
    const startDate = new Date(values[0] * 1000);
    const endDate = new Date(values[1] * 1000);
    let str1 = ((startDate+"").split(" "))
    let startDateStr = str1[2]+ "-" + str1[1]+ "-" + str1[3]
    let str2 = ((endDate+"").split(" "))
    let lastDateStr = str2[2]+ "-" + str2[1]+ "-" + str2[3]
    const inputValue = `${startDateStr} - ${lastDateStr}`;
    return inputValue;
  };

  const handleSliderChange = (values) => {
    setSliderValues(values);
  };

  return (
    <Box p="4">
      <Text mb="2" fontWeight="semibold" fontSize="sm">
        Select a date range:
      </Text>
      <RangeSlider
        min={sliderMin}
        max={sliderMax}
        step={86400}
        defaultValue={[sliderMin, sliderMax]}
        onChange={(values) => handleSliderChange(values)}
        w={"180px"}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Text fontSize={"14px"} mt="2">{updateInputValue(sliderValues)}</Text>
    </Box>
  );
}

export default DateRangeSlider;
