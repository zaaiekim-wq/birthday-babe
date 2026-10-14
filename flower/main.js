onload = () => {
    document.body.classList.remove("container");

    const audio = document.getElementById("flowerAudio");
    const musicBtn = document.getElementById("flowerMusicBtn");
    const musicLabel = document.getElementById("flowerMusicLabel");

    if (audio && musicBtn) {
        audio.play().then(() => {
            if (musicLabel) musicLabel.textContent = "MUSIC ON";
            musicBtn.style.color = "#f4a8c0";
        }).catch(() => {
            if (musicLabel) musicLabel.textContent = "MUSIC OFF";
            musicBtn.style.color = "#aaa";
        });

        musicBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                if (musicLabel) musicLabel.textContent = "MUSIC ON";
                musicBtn.style.color = "#f4a8c0";
            } else {
                audio.pause();
                if (musicLabel) musicLabel.textContent = "MUSIC OFF";
                musicBtn.style.color = "#aaa";
            }
        });
    }
};
