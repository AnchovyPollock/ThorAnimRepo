// script.js
console.log('📝 script.js loaded');

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, setting up...');
    
    const audio = document.getElementById('audioPlayer');
    const playIcon = document.getElementById('playAudio');
    const lotiplayer = document.getElementById('dotlottiePlayer');
    
    if (!lotiplayer) {
        console.error('❌ Player not found!');
        return;
    }
    
    console.log('✅ Player found');
    
    let dotLottieInstance = null;
    let isReady = false;

    function initLottie() {
        if (lotiplayer.dotLottie) {
            dotLottieInstance = lotiplayer.dotLottie;
            isReady = true;
            console.log('✅ Lottie ready');
            
            // Set marker if available
            try {
                if (typeof dotLottieInstance.setMarker === 'function') {
                    dotLottieInstance.setMarker('Wizard');
                    console.log('✅ Marker set');
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
        console.log('⏳ Waiting for load...');
        lotiplayer.addEventListener('load', function() {
            console.log('🎯 Load event fired!');
            initLottie();
        });
    }

    // Play button
    playIcon.addEventListener('click', function() {
        try {
            if (audio.paused) {
                audio.play();
                playIcon.className = 'fas fa-pause-circle play-icon';
                console.log('▶️ Playing');
                
                if (isReady && dotLottieInstance) {
                    dotLottieInstance.play();
                } else {
                    initLottie();
                    if (isReady && dotLottieInstance) {
                        dotLottieInstance.play();
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

    console.log('🎮 Setup complete');
});
