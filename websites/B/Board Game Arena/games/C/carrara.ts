import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getCurrentGameStateType,
	getPlayerAvatar,
	getPlayerData,
	getPlayerScore,
	getUserPlayerId,
} from "../../util";

const carrara: GamePresence = {
	logo: "https://i.imgur.com/vUHhHnN.png",
	async getData(presence: Presence) {
		const gameState = await getCurrentGameState(presence),
			activePlayer = await getActivePlayerId(presence),
			gameStateType = await getCurrentGameStateType(presence),
			userPlayer = await getUserPlayerId(presence),
			activePlayerData = await getPlayerData(presence, activePlayer),
			data: PresenceData = {
				smallImageKey: getPlayerAvatar(userPlayer),
				smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
			};
		if (activePlayer === userPlayer || gameStateType !== "activeplayer") {
			switch (gameState) {
				case "buyBlocks":
					data.state = "Buying blocks";
					break;
				case "payBlocks":
					data.state = "Paying using blocks";
					break;
				case "chooseAction":
					data.state = "Choosing an action";
					break;
				case "chooseLocation":
					data.state = "Choosing where to build";
					break;
				case "chooseUpgrade":
					data.state = "Choosing an upgrade";
					break;
				case "buyObject":
					data.state = "Buying an object";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default carrara;
