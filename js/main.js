// ================================
// 初期化
// ================================
document.getElementById("draw-btn").addEventListener("click", () => {
	revivalAudio.muted = true;

	revivalAudio.play().then(() => {
		revivalAudio.pause();
		revivalAudio.currentTime = 0;
		revivalAudio.muted = false;
	});
}, { once: true });
revivalAudio.load();
createProbabilityTable();