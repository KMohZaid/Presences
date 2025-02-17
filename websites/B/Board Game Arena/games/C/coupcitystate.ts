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

const coupcitystate: GamePresence = {
	logo: "https://i.imgur.com/H9wBEHT.png",
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
				case "playerBegin":
					data.state = "Taking an action";
					break;
				case "ask":
				case "askBlock":
				case "secondChance":
					if (activePlayer === userPlayer) data.state = "Stopping an action";
					else data.state = "Waiting for players to respond";
					break;
				case "askChooseCard":
					data.state = "Choosing a card";
					break;
				case "askDiscard":
					data.state = "Discarding cards";
					break;
				case "askExamine":
					data.state = "Acting on a card";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default coupcitystate;
