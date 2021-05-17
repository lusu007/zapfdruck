const temperatureSlider = document.getElementById('temperature-slider');
noUiSlider.create(temperatureSlider, {
  start: [10, 12],
  connect: true,
  step: 1,
  orientation: 'horizontal',
  range: {
    'min': 5,
    'max': 26
  },
  format: wNumb({
    decimals: 0
  }),
  pips: {
    mode: 'steps',
    stepped: true,
    density: 4,
    format: wNumb({
      suffix: '°C'
    })
  }
});

// Initialize select
$(document).ready(function(){
  $('select').formSelect();
});

// Round number with given precision
function round(value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) /multiplier;
}

// Calculate needed pressure
function calcPressure() {
  let temperatureMax, temperatureMin, height, length, thicknessSelect, resultMin, resultMax;
  temperatureMin = parseInt(temperatureSlider.noUiSlider.get()[0]);
  temperatureMax = parseInt(temperatureSlider.noUiSlider.get()[1]);
  height = parseInt(document.getElementById('height').value);
  length = parseInt(document.getElementById('length').value);
  thicknessSelect = document.getElementById('thickness');

  if (isNaN(temperatureMin) || isNaN(temperatureMax) || isNaN(height) || isNaN(length)) {
    document.getElementById('result').innerHTML = '<span>Bitte geben Sie alle Werte an!</span>';
    return;
  }

  const temperatureMap = new Map();
  temperatureMap.set(5, 0.8);
  temperatureMap.set(6, 0.9);
  temperatureMap.set(7, 1);
  temperatureMap.set(8, 1);
  temperatureMap.set(9, 1.1);
  temperatureMap.set(10, 1.2);
  temperatureMap.set(11, 1.3);
  temperatureMap.set(12, 1.4);
  temperatureMap.set(13, 1.5);
  temperatureMap.set(14, 1.5);
  temperatureMap.set(15, 1.6);
  temperatureMap.set(16, 1.7);
  temperatureMap.set(17, 1.8);
  temperatureMap.set(18, 1.9);
  temperatureMap.set(19, 1.9);
  temperatureMap.set(20, 2);
  temperatureMap.set(21, 2);
  temperatureMap.set(22, 2.1);
  temperatureMap.set(23, 2.2);
  temperatureMap.set(24, 2.3);
  temperatureMap.set(25, 2.4);
  temperatureMap.set(26, 2.5);

  // Add base pressure
  resultMin = temperatureMap.get(temperatureMin);
  resultMax = temperatureMap.get(temperatureMax);

  // Add height pressure
  resultMin += height * 0.1;
  resultMax += height * 0.1;

  // Add thickness pressure
  resultMin += length * thicknessSelect.options[thicknessSelect.selectedIndex].value;
  resultMax += length * thicknessSelect.options[thicknessSelect.selectedIndex].value;

  // Round to 1 decimal
  resultMin = round(resultMin, 1);
  resultMax = round(resultMax, 1);

  if (resultMin === resultMax) {
    document.getElementById('result').innerHTML = '<span>' + resultMin + ' bar</span>';
  } else {
    document.getElementById('result').innerHTML = '<span>Minimum: ' + resultMin + ' bar<br> Maximum: ' + resultMax + ' bar</span>'
  }
}
