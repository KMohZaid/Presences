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

const downforce: GamePresence = {
	logo: "https://i.imgur.com/gcZZvuD.png",
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
				case "auctionTurn":
				case "playerTurn":
					data.state = "Playing a card";
					break;
				case "prepareRace":
					data.state = "Keeping a power";
					break;
				case "moveCar":
					data.state = "Moving a car";
					break;
				case "chooseJokerColor":
					data.state = "Choosing the color of the next car to move";
					break;
				case "betTurn":
					data.state = "Placing a bet on a car";
					break;
				case "chooseColorToRemove":
					data.state = "Choosing a color to remove from a card";
					break;
				case "chooseMovementsOrder":
					data.state = "Inverting the movements order of the card";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default downforce;
