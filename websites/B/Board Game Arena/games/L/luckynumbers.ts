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

const luckynumbers: GamePresence = {
	logo: "https://i.imgur.com/KvAF4ua.png",
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
				case "simpleSetup":
				case "gameSetup":
				case "allPlayersDrawATile":
					data.state = "Setting up the game";
					break;
				case "playersInitialTurns":
					data.state = "Placing initial clover";
					break;
				case "playerDrawsOrPlaysFromTable":
					data.state = "Drawing or picking up a clover";
					break;
				case "placeOnBoardOrTable":
					data.state = "Placing a clover";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default luckynumbers;
