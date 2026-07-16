// script.js - Fixed version -  Wait for dom is added
console.log('script.js just starting...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, looking for player...');
    
    // 1. Get a reference to the element
    const playerElement = document.getElementById('dotlottiePlayer');
    
    if (!playerElement) {
        console.error('❌ Player element not found! Check the ID.');
        return;
    }
    
    console.log('✅ Player element found:', playerElement);
    
    // 2. Ensure the component is ready before calling its methods
    playerElement.addEventListener('load', function() {
        console.log('🎯 Load event fired!');
        
        // Access the dotLottie instance
        const dotLottieInstance = playerElement.dotLottie;
        
        if (!dotLottieInstance) {
            console.error('❌ dotLottie instance not available');
            return;
        }
        
        console.log('✅ dotLottie instance available');
        
        // 3. Call the setMarker method with your marker name
        try {
            dotLottieInstance.setMarker('Wizard');
            console.log('✅ Marker "Wizard" set successfully!');
        } catch (error) {
            console.error('❌ Error setting marker:', error);
            console.log('💡 Make sure "Wizard" marker exists in your animation');
        }
console.log('✅ dotLottie player started successfully.');
});
