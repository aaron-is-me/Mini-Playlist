const audioTag = new Audio();
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementsByClassName("progress-bar")[0];
const currentTimeTag = document.getElementsByClassName("current-time")[0];
const totalTimeTag = document.getElementsByClassName("total-time")[0];
const trackTitleTag = document.getElementsByClassName("track-title")[0];
const coverImageTag = document.getElementsByClassName("cover-image")[0];
const volumeSlider = document.getElementById("volume-slider");
const productContainer = document.getElementsByClassName("productContainer")[0]; 

const tracks = [
    { trackId: "./music/Taylor Swift - Love Story [ ezmp3.cc ].mp3", title: "Love Story", imageUrl: "https://i.pinimg.com/564x/57/84/33/578433de031a42f2e451a643f9f6921c.jpg" },
    { trackId: "./music/Taylor Swift - You Belong With Me [ ezmp3.cc ].mp3", title: "You Belong With Me", imageUrl: "https://i.pinimg.com/564x/c7/6d/04/c76d045642d13df1114b5a42512f1953.jpg" },
    { trackId: "./music/Taylor Swift - Blank Space (Lyrics) [ ezmp3.cc ].mp3", title: "Blank Space", imageUrl: "https://i.pinimg.com/474x/4f/70/7a/4f707aaf5ca607b022bfaac7bb410d2f.jpg" },
    { trackId: "./music/Taylor Swift - Look What You Made Me Do [ ezmp3.cc ].mp3", title: "Look What You Made Me", imageUrl: "https://i.pinimg.com/736x/05/f8/98/05f898216c08a55fe084b111832ed993.jpg" },
    { trackId: "./music/Taylor Swift - Shake It Off (Taylor's Version) (Lyric Video) [ ezmp3.cc ].mp3", title: "Shake It Off", imageUrl: "https://i.pinimg.com/736x/56/60/96/5660960ff8baa062a89f0c7db7870f7d.jpg" },
];

let currentTrackIndex = 0;
let durationText = "00:00";

function loadTrack(index) {
    const track = tracks[index];
    audioTag.src = track.trackId;
    trackTitleTag.textContent = track.title;
    coverImageTag.src = track.imageUrl;
    audioTag.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function updateProgress() {
    const duration = audioTag.duration;
    const currentTime = audioTag.currentTime;
    const progressPercent = (currentTime / (duration || 1)) * 100;

    // Update progress bar width
    progressBar.querySelector('.progress').style.width = `${progressPercent}%`;

    // Update time display
    currentTimeTag.textContent = formatTime(currentTime);
    totalTimeTag.textContent = durationText;
    
    // Update productContainer display
    productContainer.innerHTML = `${formatTime(currentTime)} / ${durationText}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

playPauseBtn.addEventListener("click", () => {
    if (audioTag.paused) {
        audioTag.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioTag.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

audioTag.addEventListener("loadeddata", () => {
    const duration = audioTag.duration;
    durationText = formatTime(duration);
    totalTimeTag.textContent = durationText;
    updateProgress(); 
});

audioTag.addEventListener("timeupdate", (updateProgress) => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = formatTime(currentTime);
    const currentTimeAndDurationText = currentTimeText + " / " + durationText;
    productContainer.textContent = currentTimeAndDurationText;
});
audioTag.addEventListener("ended", () => nextBtn.click());
volumeSlider.addEventListener("input", (e) => audioTag.volume = e.target.value / 100


);

prevBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
});

nextBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
});

window.onload = () => loadTrack(currentTrackIndex);
