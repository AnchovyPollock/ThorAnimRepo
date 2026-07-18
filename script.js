// script.js
console.log('📝 script.js loaded');

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, setting up...');
    
    const audio = document.getElementById('audioPlayer');
    const playIcon = document.getElementById('playAudio');
    const lotiplayer = document.getElementById('dotlottiePlayer');
    
    // Create a custom event with optional data
    const softEvent = new CustomEvent('click', {  //customTrigger
        detail: { source: "soft trigger" }
        });
    const softEvent2 = new CustomEvent('click', {  //customTrigger
        detail: { source: "soft trigger" }
        });
                
    if (!lotiplayer) {
        console.error('❌ Player not found!');
        return;
    }
    
    console.log('✅ Player found');
    
    let dotLottieInstance = null;
    let isReady = false;
    //Fired when the WASM module is loaded and the player is ready.
        lotiplayer.addEventListener('ready', () => {
        isReady = dotLottieInstance.isReady; //true;
        console.log('Player is ready');
        dotLottieInstance.autoplay = true;
        dotLottieInstance.loop = true;
        dotLottieInstance.play();
    });
    lotiplayer.addEventListener('load', function() {
           console.log('🎯 1st Load event fired!');
           // initLottie(); 
    });

    function initLottie() {
        if (lotiplayer.dotLottie) {
            dotLottieInstance = lotiplayer.dotLottie;
            isReady = dotLottieInstance.isReady; //true or flase ?
            if (dotLottieInstance.isReady) {
                console.log('✅ Lottie ready');
            } else {
                    console.log('✅ player found but ❌ Player NOT ready!');
                    // Force the component to load the Lottie file
                    // lotiplayer.load(); gives error
                    dotLottieInstance.load(); // Force the component to load the file
                   }
            
            // Set marker if available
            try {
                if (typeof dotLottieInstance.setMarker === 'function') {
                    dotLottieInstance.setMarker('Orbit'); //Wizard
                    // dotLottieInstance.setSegment(75,400);                    
                    console.log('✅ Marker / segment set');
                    const markers = dotLottieInstance.markers[1];
                    console.log('🖊️'+markers); //
                    if (isReady && dotLottieInstance) {
                        dotLottieInstance.autoplay = true;
                        dotLottieInstance.loop = true;
                        dotLottieInstance.play();
                        console.log('🎈 intro play 🎈');
                    }
                }
            } catch (e) {
                console.warn('⚠️ Marker error:', e.message);
            }
            return true;
        }
        return false;
    }
    
    // Try immediate init
    if (!initLottie()) {
        console.log('⏳ init failed and Waiting for load event...');
        } else if (dotLottieInstance.isReady) {
            console.log('🎯 READY in 1st init');
            dotLottieInstance.play();
            } else if (!dotLottieInstance.isLoaded) {
                console.log('🎯 Lottie initatied but not Loaded in 1st init...');
                } // else if
        else if (dotLottieInstance.isLoaded) {console.log('🎯 LOADED in 1st init');}
    //}}

    // Lottie click event
    lotiplayer.addEventListener('click', function() {
        console.log('🔳🔳 Area click triggered🔳🔳');
        try {
            if (isReady && dotLottieInstance) {    
                dotLottieInstance.setMarker('Orbit'); //Wizard
                dotLottieInstance.play();
                console.log('▶️ Playing Lottie Click ');
                } else {
                console.log('♾️Lottie Click: not ready re-inited ');
                initLottie();
                // Create a custom event with optional data
                // Dispatch it on the element
                lotiplayer.dispatchEvent(softEvent2);
                }
        } catch (error) {
            console.error('❌ Lottie Area click Error:', error)
            }
    });
    // Play button
    playIcon.addEventListener('click', function() {
        try {
            if (audio.paused) {
                audio.play();
                playIcon.className = 'fas fa-pause-circle play-icon';
                console.log('▶️ Playing');
                
                if (isReady && dotLottieInstance) {
                    dotLottieInstance.setMarker('Wizard'); //Orbit
                    dotLottieInstance.play();
                } else {
                    initLottie();
                    if (isReady && dotLottieInstance) {
                        dotLottieInstance.setMarker('Orbit'); //Wizard
                        dotLottieInstance.play();
                        console.log('▶️ Playing INTRO ');
                    }
                }
            } else {
                audio.pause();
                playIcon.className = 'fas fa-play-circle play-icon';
                console.log('⏸ Paused');
                
                if (isReady && dotLottieInstance) {
                    dotLottieInstance.pause();
                }
            }
        } catch (error) {
            console.error('❌ Error:', error);
        }
    });

    // Audio ended
    audio.addEventListener('ended', function() {
        playIcon.className = 'fas fa-play-circle play-icon';
        if (dotLottieInstance) {
            dotLottieInstance.stop();
        }
    });

    // Create a custom event with optional data
    // Dispatch it on the element
    lotiplayer.dispatchEvent(softEvent);
    console.log('🎮 Setup complete');
});
