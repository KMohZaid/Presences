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

const welcometo: GamePresence = {
	logo: "https://i.imgur.com/D9H5wJ4.png",
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
				case "chooseCards":
					data.state = "Picking a pair of construction cards";
					break;
				case "applyTurns":
					data.state = "Viewing player actions";
					break;
				case "writeNumber":
					data.state = "Writing a house number";
					break;
				case "actionSurveyor":
					data.state = "Building a fence";
					break;
				case "actionEstate":
					data.state = "Increasing the value of an estate";
					break;
				case "actionBis":
					data.state = "Duplicating a house number";
					break;
				case "actionPark":
					data.state = "Building a park";
					break;
				case "actionPool":
					data.state = "Building a pool";
					break;
				case "actionTemp":
					data.state = "Crossing off a box from the temp agency";
					break;
				case "choosePlan":
				case "validatePlan":
					data.state = "Validating a plan";
					break;
				case "askReshuffle":
					data.state = "Reshuffling the deck";
					break;
				case "confirmTurn":
					data.state = "Confirming turn";
					break;
				case "waitOthers":
					data.state = "Waiting for other players";
					break;
				case "buildRoundabout":
					data.state = "Building a roundabout";
					break;
				case "iceCream":
					data.state = "Moving an ice cream truck";
					break;
				case "computeScores":
					data.state = "Computing scores";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default welcometo;
