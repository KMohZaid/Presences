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

const dungeonpetz: GamePresence = {
	logo: "https://i.imgur.com/EAg4yGy.png",
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
				case "playerTurn":
					data.state = "Going shopping";
					break;
				case "playerTurnGroup":
					data.state = "Going shopping in groups";
					break;
				case "playerTurnNeeds":
					data.state = "Dealing with pets needs";
					break;
				case "playerTurnEvaluate":
					data.state = "Caring for pets and showing off";
					break;
				case "playerTurnBusiness":
					data.state = "Selling pets";
					break;
				case "playerTurnJobs":
					data.state = "Assigning jobs to imps";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default dungeonpetz;
