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

const one: GamePresence = {
	logo: "https://i.imgur.com/AYLDizD.png",
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
				case "playerTurnPlace":
				case "confirmTurnPlace":
					data.state = "Placing a stone";
					break;
				case "playerTurnPlaceOrCapture":
				case "confirmTurnPlaceOrCapture":
					data.state = "Placing a stone or capturing an opponent's stone";
					break;
				case "selectFirstCapture":
				case "selectCaptureVariant":
					data.state = "Capturing an opponent's stone";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default one;
