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

const santorini: GamePresence = {
	logo: "https://i.imgur.com/DP2fdnk.png",
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
				case "playerPlaceWorker":
					data.details = "Placing a worker";
					break;
				case "playerMove":
					data.details = "Moving";
					break;
				case "playerBuild":
					data.details = "Building";
					break;
				case "buildOffer":
					data.details = "Offering powers";
					break;
				case "powersPlayerChoose":
					data.details = "Choosing a power";
					break;
				case "playerUsePower":
					data.details = "Using a power";
					break;
				case "chooseFirstPlayer":
					data.details = "Choosing first player";
					break;
				case "playerPlaceSetup":
					data.state = "Performing power setup";
					break;
				case "playerPlaceRam":
					data.state = "Placing the Ram figure";
					break;
				case "chooseNyxNightPower":
					data.state = "Choosing Nyx's night power";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default santorini;
