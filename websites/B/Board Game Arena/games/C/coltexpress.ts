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

const coltexpress: GamePresence = {
	logo: "https://i.imgur.com/Duz9hqt.png",
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
				case "randomGangsters":
					data.state = "Setup: Randomizing gangsters";
					break;
				case "chooseGangsters":
					data.state = "Choosing a character";
					break;
				case "playCard":
					data.state = "Playing a card";
					break;
				case "chooseCar":
					data.state = "Moving their character";
					break;
				case "chooseCarMarshal":
					data.state = "Choosing where the Marshal moves";
					break;
				case "chooseTargetShoot":
					data.state = "Choosing a target to shoot";
					break;
				case "chooseLoot":
					data.state = "Choosing which loot to take";
					break;
				case "chooseTargetPunch":
					data.state = "Choosing who to punch";
					break;
				case "discard":
					data.state = "Choosing which cards to discard";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default coltexpress;
