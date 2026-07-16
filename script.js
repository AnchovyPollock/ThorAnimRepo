
// 1. Get a reference to the element
const playerElement = document.getElementById('dotlottiePlayer');

// 2. Ensure the component is ready before calling its methods
// You might want to wait for the 'load' event or use a timeout.
playerElement.addEventListener('load', () => {
  // Access the dotLottie instance
  const dotLottieInstance = playerElement.dotLottie;

  // 3. Call the setMarker method with your marker name
  dotLottieInstance.setMarker('Wizard');
console.log('dotLottie player started successfully.');
});
