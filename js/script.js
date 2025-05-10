// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.visibility = 'hidden';
        }, 500);
    }, 2000);

    // Set Current Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Audio Controls
    const audioBtn = document.getElementById('toggleAudio');
    const bgMusic = document.getElementById('bgMusic');
    
    // Try to play background music (might be blocked by browser)
    let isPlaying = false;
    
    // Function to toggle audio
    function toggleAudio() {
        if (isPlaying) {
            bgMusic.pause();
            audioBtn.classList.remove('playing');
            audioBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play().then(() => {
                audioBtn.classList.add('playing');
                audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.error("Audio playback failed:", error);
                // Show notification that user needs to interact first
                showNotification("Klik tombol musik untuk memulai lagu", 5000);
            });
        }
        isPlaying = !isPlaying;
    }
    
    // Event listener for audio button
    audioBtn.addEventListener('click', toggleAudio);
    
    // Try to autoplay (might be blocked by browser)
    bgMusic.volume = 0.7; // Set volume to 50%
    bgMusic.play().then(() => {
        isPlaying = true;
        audioBtn.classList.add('playing');
        audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(error => {
        console.log("Autoplay prevented. User must interact first.");
        showNotification("Klik tombol musik untuk memulai lagu", 5000);
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Reveal animations on scroll
        revealElements();
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize all reveal elements
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    // Call reveal once on load
    revealElements();

    // Floating Hearts Animation
    createFloatingHearts();

    function createFloatingHearts() {
        const heartContainer = document.querySelector('.floating-hearts');
        const heartIcons = ['❤️', '💕', '💖', '💘', '💓', '💗', '💝'];
        const numHearts = 20; // Lebih sedikit hati sekaligus
        const maxHeartsOnScreen = 40; // Batas jumlah hati yang tampil bersamaan

        for (let i = 0; i < numHearts; i++) {
            setTimeout(() => {
                // Cek jumlah hati saat ini
                if (heartContainer.querySelectorAll('.floating-heart').length >= maxHeartsOnScreen) return;

                const heart = document.createElement('div');
                heart.classList.add('floating-heart');

                const randomIcon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
                heart.innerHTML = randomIcon;

                const posX = Math.random() * 100;
                const scale = 0.5 + Math.random() * 1.5;
                const duration = 5 + Math.random() * 10;

                heart.style.left = `${posX}%`;
                heart.style.fontSize = `${scale}rem`;
                heart.style.animationDuration = `${duration}s`;

                heartContainer.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 1000); // Lebih jarang muncul
        }

        // Perbarui lebih jarang
        setInterval(createFloatingHearts, 3000);
    }

    // Notification function
    function showNotification(message, duration) {
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'var(--romantic-red)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '30px';
        notification.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        // Add notification to body
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }

    // Add click event for photo frames (to show larger image)
    const photoFrames = document.querySelectorAll('.photo-frame');
    
    photoFrames.forEach(frame => {
        frame.addEventListener('click', function() {
            const img = frame.querySelector('img');
            if (img) {
                // Create modal to show larger image
                const modal = document.createElement('div');
                modal.classList.add('photo-modal');
                
                // Style the modal
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '999999';
                modal.style.opacity = '0';
                modal.style.transition = 'opacity 0.3s ease';
                
                // Create larger image
                const largeImg = document.createElement('img');
                largeImg.src = img.src;
                largeImg.alt = img.alt;
                largeImg.style.maxWidth = '90%';
                largeImg.style.maxHeight = '90%';
                largeImg.style.borderRadius = '10px';
                largeImg.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2)';
                
                // Create close button
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '&times;';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '20px';
                closeBtn.style.right = '20px';
                closeBtn.style.backgroundColor = 'var(--romantic-red)';
                closeBtn.style.color = 'white';
                closeBtn.style.border = 'none';
                closeBtn.style.borderRadius = '50%';
                closeBtn.style.width = '40px';
                closeBtn.style.height = '40px';
                closeBtn.style.fontSize = '1.5rem';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.display = 'flex';
                closeBtn.style.justifyContent = 'center';
                closeBtn.style.alignItems = 'center';
                closeBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                
                // Add closing functionality
                closeBtn.addEventListener('click', function() {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                });
                
                // Also close on modal click
                modal.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            modal.remove();
                        }, 300);
                    }
                });
                
                // Add the elements to the modal
                modal.appendChild(largeImg);
                modal.appendChild(closeBtn);
                
                // Add the modal to the page
                document.body.appendChild(modal);
                
                // Fade in the modal
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
        });
    });

    // Add heart pulse effect on hover for specific elements
    const loveElements = document.querySelectorAll('.love-fact, .love-letter, .quote-container');
    
    loveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add pulse effect class
            element.classList.add('animate__animated', 'animate__pulse');
        });
        
        element.addEventListener('animationend', function() {
            // Remove animation classes after animation completes
            element.classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // Add special hover effects for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add heart icon in the background
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'absolute';
            heart.style.top = '50%';
            heart.style.left = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.fontSize = '5rem';
            heart.style.color = 'var(--romantic-red)';
            heart.style.opacity = '0';
            heart.style.zIndex = '1';
            heart.style.transition = 'opacity 0.5s ease';
            
            item.appendChild(heart);
            
            setTimeout(() => {
                heart.style.opacity = '0.2';
            }, 10);
        });
        
        item.addEventListener('mouseleave', function() {
            // Remove heart icon
            const heart = item.querySelector('.fa-heart').parentNode;
            heart.style.opacity = '0';
            
            setTimeout(() => {
                if (heart.parentNode === item) {
                    item.removeChild(heart);
                }
            }, 500);
        });
    });
});