const presence = new Presence({
		clientId: "808762696023146578",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector(
			".vp-video-wrapper .vp-video video"
		),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/OJunR7n.png",
		};

	if (document.location.pathname === "/") presenceData.details = "Browsing...";
	else if (video && !isNaN(video.duration)) {
		const title = document.querySelector("._1fHNK").textContent,
			uploader = document.querySelector(".js-user_link").textContent;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		presenceData.details = title;
		presenceData.state = uploader;
		presenceData.largeImageKey = "https://i.imgur.com/OJunR7n.png";
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (title && uploader) presence.setActivity(presenceData, !video.paused);
	} else {
		presenceData.details = "Browsing...";

		presence.setActivity(presenceData);
	}
});
