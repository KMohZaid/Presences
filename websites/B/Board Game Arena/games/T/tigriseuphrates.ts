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

const tigriseuphrates: GamePresence = {
	logo: "https://i.imgur.com/d36KASx.png",
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
					data.state = "Taking actions";
					break;
				case "supportWar":
					data.state = "Sending war support";
					break;
				case "supportRevolt":
					data.state = "Sending revolt support";
					break;
				case "warLeader":
					data.state = "Selecting war leader";
					break;
				case "multiMonument":
				case "buildMonument":
					data.state = "Building monument";
					break;
				case "pickTreasure":
					data.state = "Taking treasure";
					break;
				case "buildCivilizationBuilding":
					data.state = "Building civilization building";
					break;
				case "multiWonder":
					data.state = "Selecting wonder center";
					break;
				case "wonderScore":
					data.state = "Picking point color from wonder";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default tigriseuphrates;
