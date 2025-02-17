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

const streets: GamePresence = {
	logo: "https://i.imgur.com/yK9SVEh.png",
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
				case "stateSetupGrifter":
					data.state = "Selecting a character";
					break;
				case "stateAbandon":
					data.state = "Abandoning a building";
					break;
				case "statePlaceTile":
					data.state = "Placing a building";
					break;
				case "stateScoreStreet":
					data.state = "Selecting a street to score";
					break;
				case "stateBusinessGain":
					data.state = "Selecting a business token";
					break;
				case "stateGrifterBusinessGain":
					data.state = "Selecting a business token for the Grifter";
					break;
				case "stateEntrepreneurScore":
					data.state = "Selecting a building for the Entrepreneur ability";
					break;
				case "stateMovePeople":
					data.state = "Moving people";
					break;
				case "stateGrifterPlaceTile":
					data.state = "Placing a building for the Grifter";
					break;
				case "stateGrifterMovePeople":
					data.state = "Moving people for the Grifter";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default streets;
