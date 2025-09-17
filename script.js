document.addEventListener('DOMContentLoaded', () => {

    // --- 1. COUNTDOWN TIMER ---
    const countDownDate = new Date("Oct 4, 2025 17:00:00").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "The celebration has begun!";
        }
    }, 1000);

    // --- 2. SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- 3. MUSIC PLAYER ---
    const music = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');

    playPauseBtn.addEventListener('click', () => {
        const isPlaying = !music.paused;
        if (isPlaying) {
            music.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            music.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
    });
    
    // Most browsers prevent autoplay until user interaction.
    // We can try to play it once the user scrolls.
    window.addEventListener('scroll', () => {
        if (music.paused) {
            music.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }).catch(e => {
                // Autoplay was prevented. User must click the button.
            });
        }
    }, { once: true }); // This listener will only run once.
});