const presence = new Presence({
		clientId: "1077743931460177972",
	}),
	slideshow = presence.createSlideshow(),
	watchingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const currentStreams = document.location.pathname
			.split("/")
			.filter(function (str) {
				return str !== "";
			}),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/gJBDsCE.png",
		};

	if (currentStreams.length === 0) {
		presenceData.details = "On the home screen";
		if (presence.getSetting("showButton")) {
			presenceData.buttons = [
				{
					label: "Open MultiTwitch",
					url: document.location.href,
				},
			];
		}
		presence.setActivity(presenceData);
	} else if (await presence.getSetting("showStreamers")) {
		for (const stream of currentStreams) {
			slideshow.addSlide(
				stream,
				{
					largeImageKey: "https://i.imgur.com/gJBDsCE.png",
					details: `Watching ${currentStreams.length} ${
						currentStreams.length > 1 ? "streams" : "stream"
					}`,
					state: stream,
				},
				5000
			);
		}
		if (await presence.getSetting("showButton")) {
			for (const slide of slideshow.getSlides()) {
				const pDat = slide.data;
				pDat.buttons = [
					{
						label: "Open MultiTwitch",
						url: document.location.href,
					},
				];
				slide.updateData(pDat);
			}
		}
		presence.setActivity(slideshow);
	} else {
		slideshow.deleteAllSlides();
		presenceData.details = `Watching ${currentStreams.length} ${
			currentStreams.length > 1 ? "streams" : "stream"
		}`;
		presenceData.startTimestamp = watchingTimestamp;
		presence.setActivity(presenceData);
	}
});
