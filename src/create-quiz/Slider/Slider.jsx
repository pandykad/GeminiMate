import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Slider } from "@/components/ui/slider"

import './Slider.css'

// Slider Component
const CustomSlider = ({ min, max, step, value, setValue }) => {
  const [sliderValue, setSliderValue] = useState(1);

  const handleChange = (event) => {
    const newValue = Number(event[0]);
    setSliderValue(newValue);
    setValue(newValue);
  };

  return (
    <div className="slider-container">
      <Slider defaultValue={[1]} value={[sliderValue]} max={max} min={min} step={step} onValueChange={handleChange}/>
      <span className="slider-value">{sliderValue}</span>

    </div>
  );
};

CustomSlider.defaultProps = {
  trackColor: 'yellow',
  thumbColor: '#ff5546',
};

export default CustomSlider;
