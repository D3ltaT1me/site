function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
  
document.querySelectorAll('[data-audio-player]').forEach(player => {
    const audio = player.querySelector('audio');
    const playPauseBtn = player.querySelector('.playPause');
    const progressBar = player.querySelector('.progressBar');
    const timer = player.querySelector('.timer');

    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
          // Pause all other audios
          document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== audio) {
              otherAudio.pause();
              otherAudio.closest('.audio-player').querySelector('.playPause').textContent = 'Play';
            }
          });
          audio.play();
          playPauseBtn.textContent = 'Pause';
      } else {
          audio.pause();
          playPauseBtn.textContent = 'Play';
      }
    });

    audio.addEventListener('timeupdate', () => {
      progressBar.value = audio.currentTime;
      progressBar.max = audio.duration;
      timer.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });

    // Reset play button when audio ends
    audio.addEventListener('ended', () => {
        playPauseBtn.textContent = 'Play';
    });

    document.querySelectorAll('.translucent_black').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          document.querySelectorAll('audio').forEach(otherAudio => {
              otherAudio.pause();
              otherAudio.closest('.audio-player').querySelector('.playPause').textContent = 'Play';
          });
        }
      });
    });

    document.querySelectorAll('.closeModal').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          document.querySelectorAll('audio').forEach(otherAudio => {
              otherAudio.pause();
              otherAudio.closest('.audio-player').querySelector('.playPause').textContent = 'Play';
          });
        }
      });
    });
});