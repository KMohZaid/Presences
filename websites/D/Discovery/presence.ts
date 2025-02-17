const presence = new Presence({
		clientId: "1034382710589898882",
	}),
	browingTimestamp = Math.floor(Date.now() / 1000);
async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			buttonWatchVideo: "general.buttonWatchVideo",
			paused: "general.paused",
			play: "general.playing",
			search: "general.searchFor",
			viewCategory: "general.viewCategory",
			viewHome: "general.viewHome",
			viewShow: "general.viewShow",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
async function capitalizeFirstLetter(string: string) {
	const stringTrimmed = string.trim();
	return stringTrimmed.charAt(0).toUpperCase() + stringTrimmed.slice(1);
}
const enum Assets {
	Loading = "https://i.imgur.com/uh6vSQm.gif",
	LogoDiscoveryPlus = "https://i.imgur.com/BQ1MBwk.png",
	LogoDiscovery = "https://i.imgur.com/ir2Ysr1.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.LogoDiscovery,
			startTimestamp: browingTimestamp,
		},
		video = document.querySelector<HTMLVideoElement>("video"),
		search = document.querySelector<HTMLInputElement>('input[type="text"]'),
		{ hostname, href, pathname } = document.location,
		[newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		hostnameReplaced = hostname.replace("www.", ""),
		current = document.querySelector('[aria-current="true"]')?.textContent,
		titleSplit: string | string[] = document
			.querySelector('[property="og:title"]')
			?.getAttribute("content")
			.toLowerCase()
			?.replace(
				document
					.querySelector('[aria-current="true"]')
					?.textContent?.toLowerCase() ?? "",
				""
			)
			.split("|"),
		titleSplit2 = [];
	if (titleSplit) {
		for (const element of titleSplit)
			if (element !== " " && element !== "  ") titleSplit2.push(element.trim());
	}
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	if (search?.value || pathname.includes("search")) {
		presenceData.details = strings.search;
		presenceData.state = search?.value || "Nothing";
		presenceData.smallImageKey = Assets.Search;
	} else {
		switch (hostnameReplaced) {
			case "go.discovery.com": {
				presenceData.largeImageKey = Assets.LogoDiscovery;
				switch (pathname.split("/")[1]) {
					case "": {
						presenceData.details = strings.viewHome;
						break;
					}
					case "my-list": {
						presenceData.details = `Viewing ${
							document
								.querySelector('li[class*="selected-"]')
								?.textContent?.trim()
								.toLowerCase() ?? ""
						}`;
						break;
					}
					case "shows": {
						presenceData.details = `Viewing all ${
							document
								.querySelector('[class*="selected-"]')
								?.getAttribute("id")
								.split("tab-")[1]
								?.replace("All", "")
								.toLowerCase() ?? ""
						} shows`;
						presenceData.state = `Sorted by ${
							document
								.querySelector('li[class*="selected-"]')
								?.textContent?.toLowerCase() ?? ""
						}`;
						presenceData.buttons = [
							{
								label: "View Shows",
								url: href,
							},
						];
						break;
					}
					case "show": {
						presenceData.details = `${strings.viewShow} ${
							document.querySelector("title")?.textContent?.split("-")[0]
						}`;
						presenceData.state = document.querySelector(
							'[aria-controls="season-dropdown"]'
						)?.textContent;
						presenceData.largeImageKey =
							document
								.querySelector('[class*="showLogo-"]')
								?.getAttribute("src")
								.split("?")[0] ?? Assets.LogoDiscovery;
						presenceData.buttons = [
							{
								label: "View Show",
								url: href,
							},
						];
						break;
					}
					case "video": {
						delete presenceData.startTimestamp;
						presenceData.details = document
							.querySelector("title")
							?.textContent.split("-")[0];
						presenceData.state = document.querySelector(
							'[class*="seasonEpisode"]'
						)?.textContent;
						presenceData.largeImageKey = document
							.querySelector('[class*="RemoteSenderBackgroundContainer"]')
							.querySelector("img")
							?.getAttribute("src");
						if (video && !isNaN(video.duration)) {
							presenceData.smallImageKey = video.paused
								? Assets.Pause
								: Assets.Play;
							presenceData.smallImageText = video.paused
								? strings.paused
								: strings.play;
							presenceData.buttons = [
								{
									label: strings.buttonWatchVideo,
									url: href,
								},
							];
							if (
								document
									.querySelector('[class*="PlayPauseButtonS"]')
									?.innerHTML.includes("<circle")
							) {
								presenceData.smallImageText = strings.paused;
								presenceData.smallImageKey = Assets.Loading;
							} else if (
								document
									.querySelector('[class*="AdsContainer"]')
									?.querySelector('[class*="TimeIndicator"]')?.textContent !==
								"00:00"
							)
								presenceData.state = "Watching an ad";
							else if (!video.paused) {
								[, presenceData.endTimestamp] = presence.getTimestamps(
									presence.timestampFromFormat(
										document.querySelectorAll('[class*="TimeViewFontStyle"]')[0]
											?.textContent
									),
									presence.timestampFromFormat(
										document.querySelectorAll('[class*="TimeViewFontStyle"]')[1]
											?.textContent
									)
								);
							}
						} else {
							presenceData.buttons = [
								{
									label: "View Show",
									url: href,
								},
							];
						}
						break;
					}
				}
				break;
			}
			case "discoveryplus.com": {
				presenceData.largeImageKey = Assets.LogoDiscoveryPlus;
				if (
					pathname === "" ||
					pathname ===
						`/${document
							.querySelector("[data-language]")
							.getAttribute("data-language")}` ||
					pathname ===
						`/${document
							.querySelector("[data-language]")
							.getAttribute("data-language")}/`
				)
					presenceData.details = `Homepage - ${current}`;
				else {
					switch (pathname.split("/")[2]) {
						case "show": {
							presenceData.details = `${
								strings.viewShow
							} ${await capitalizeFirstLetter(titleSplit2[0])}`;
							presenceData.state = `${current} - ${
								current ===
								document.querySelector('[id="tab-generic-show-episodes"]')
									?.textContent
									? document.querySelector('[data-testid*="selected-"]')
											?.textContent
									: "  "
							}`
								.replace("-  ", "")
								.replace("- undefined", "")
								.trim();
							presenceData.buttons = [
								{
									label: "View Show",
									url: href,
								},
							];
							break;
						}
						case "video": {
							delete presenceData.startTimestamp;
							presenceData.state = await capitalizeFirstLetter(titleSplit2[0]);
							presenceData.details = await capitalizeFirstLetter(
								titleSplit2[1]
							);
							if (video && !isNaN(video.duration)) {
								if (
									document
										.querySelector('[class*="PlayPauseButtonS"]')
										?.innerHTML.includes("<circle")
								) {
									presenceData.smallImageText = strings.paused;
									presenceData.smallImageKey = Assets.Loading;
								} else {
									presenceData.smallImageKey = video.paused
										? Assets.Pause
										: Assets.Play;
									presenceData.smallImageText = video.paused
										? strings.paused
										: strings.play;
									if (!video.paused) {
										[, presenceData.endTimestamp] =
											presence.getTimestampsfromMedia(video);
									}
								}
								presenceData.buttons = [
									{
										label: strings.buttonWatchVideo,
										url: href,
									},
								];
							} else {
								presenceData.buttons = [
									{
										label: "View Show",
										url: href,
									},
								];
							}
							break;
						}
						case "browse": {
							const category = document.querySelectorAll(
								'[aria-checked="true"]'
							);
							presenceData.details = strings.browse;
							presenceData.state = `${
								category[1]?.textContent === ""
									? href.split("?network=")[1].toUpperCase()
									: category[1]?.textContent
							} Shows - Sorted by ${category[2]?.textContent}`;
							break;
						}
						case "sports": {
							presenceData.details = strings.browse;
							presenceData.state = `Sports - ${current}`;
							break;
						}
						case "epg": {
							presenceData.details = `Viewing schedule for ${
								document.querySelector(
									'[data-testid="epgDayButtonActive visible"]'
								)?.textContent
							}`;
							presenceData.buttons = [
								{
									label: "View Schedule",
									url: href,
								},
							];
							break;
						}
						case "my-list": {
							presenceData.details = "Viewing my list";
							break;
						}
						default: {
							presenceData.details = strings.browse;
							break;
						}
					}
				}

				break;
			}
		}
	}

	if (
		hostnameReplaced === "go.discovery.com" &&
		!covers &&
		presenceData.largeImageKey !== Assets.LogoDiscovery
	)
		presenceData.largeImageKey = Assets.LogoDiscovery;
	else if (
		hostnameReplaced === "discoveryplus.com" &&
		!covers &&
		presenceData.largeImageKey !== Assets.LogoDiscoveryPlus
	)
		presenceData.largeImageKey = Assets.LogoDiscoveryPlus;

	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
