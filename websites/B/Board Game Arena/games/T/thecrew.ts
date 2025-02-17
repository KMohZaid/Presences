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

const thecrew: GamePresence = {
	logo: "https://i.imgur.com/da54P79.png",
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
					data.state = "Playing a card";
					break;
				case "pickTask":
					data.state = "Choosing a task";
					break;
				case "endMission":
					data.state = "Ending mission";
					break;
				case "comm":
					data.state = "Communicating";
					break;
				case "distressSetup":
					data.state = "Using the distress signal";
					break;
				case "distress":
					data.state = "Choosing a card to pass";
					break;
				case "question":
					data.state = "Answering a question";
					break;
				case "pickCrew":
					data.state = "Choosing a crew member";
					break;
				case "moveTile":
					data.state = "Moving a task token";
					break;
				case "giveTask":
				case "giveTaskConfirmation":
					data.state = "Giving a task to another player";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default thecrew;
