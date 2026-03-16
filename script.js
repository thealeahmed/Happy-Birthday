document.addEventListener('DOMContentLoaded', function() {

// 🎉 Confetti Animation on Page Load
if (typeof confetti === "function") {
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });
}

// 🎂 Birthday Countdown (March 17)
// We met for the first time in the park on Friday, February 27, 2026, at 1:15 PM.
const countdownElement = document.getElementById('countdown');

function updateCountdown() {

    if (!countdownElement) return;

    const now = new Date();

    // Update birthday date
    const birthday = new Date('2026-03-17');

    // If birthday has passed this year → use next year
    if (now > birthday) {
        birthday = new Date(now.getFullYear() + 1, 2, 17, 0, 0, 0);
    }

    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML =
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

    if (distance <= 0) {
        countdownElement.innerHTML = "🎉 Happy Birthday Sameen! 🎉";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();


// --- Initialize AOS (Animate on Scroll) ---
AOS.init({
    duration: 800,
    once: true,
});


// --- Initialize LightGallery ---
const gallery = document.getElementById('lightgallery');
if (gallery) {
    lightGallery(gallery, {
        speed: 500,
        download: false
    });
}


// --- Hall of Fame Scroller ---
const scroller = document.getElementById('hall-of-fame-scroller');
const scrollLeftBtn = document.getElementById('scroll-left-btn');
const scrollRightBtn = document.getElementById('scroll-right-btn');

if (scroller && scrollLeftBtn && scrollRightBtn) {

    const card = scroller.querySelector('.snap-center');

    if (card) {
        const cardWidth = card.offsetWidth +
            parseInt(getComputedStyle(card.parentElement).gap);

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });

        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
    }
}


// --- Video Uploader ---
const videoUploadInput = document.getElementById('video-upload');
const videoPlayer = document.getElementById('video-player');
const videoUploadLabel = document.getElementById('video-upload-label');

if(videoUploadInput && videoPlayer && videoUploadLabel) {

    videoUploadLabel.addEventListener('click', () => {
        videoUploadInput.click();
    });

    videoUploadInput.addEventListener('change', (event) => {

        const file = event.target.files[0];

        if (file) {

            const videoURL = URL.createObjectURL(file);

            videoPlayer.src = videoURL;
            videoPlayer.classList.remove('hidden');
            videoUploadLabel.classList.add('hidden');

            videoPlayer.play();
        }

    });
}


// 🌸 Sakura Petal Animation
const canvas = document.getElementById('sakura-canvas');

if (canvas) {

    const ctx = canvas.getContext('2d');

    let petals = [];
    const numPetals = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function Petal() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.w = 25 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        this.opacity = this.w / 40;
        this.flip = Math.random();
        this.xSpeed = 1.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random();
        this.flipSpeed = Math.random() * 0.03;
    }

    Petal.prototype.draw = function() {

        if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -this.w;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
        }

        ctx.globalAlpha = this.opacity;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);

        ctx.bezierCurveTo(
            this.x + this.w / 2,
            this.y - this.h / 2,
            this.x + this.w,
            this.y,
            this.x + this.w / 2,
            this.y + this.h / 2
        );

        ctx.bezierCurveTo(
            this.x,
            this.y + this.h,
            this.x - this.w / 2,
            this.y,
            this.x,
            this.y
        );

        ctx.closePath();

        ctx.fillStyle = '#FFB7C5';
        ctx.fill();
    }

    Petal.prototype.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.flip += this.flipSpeed;
        this.draw();
    }

    function createPetals() {
        petals = [];
        for (let i = 0; i < numPetals; i++) {
            petals.push(new Petal());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => {
            petal.update();
        });
        requestAnimationFrame(animate);
    }

    createPetals();
    animate();
}


});
