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

const marcopolo: GamePresence = {
	logo: "https://i.imgur.com/znkEcPD.png",
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
				case "playerBonus":
					data.state = "Collecting bonuses";
					break;
				case "playerDieCompensation":
					data.state = "Collecting dice compensation";
					break;
				case "playerTurn":
					data.state = "Taking an action";
					break;
				case "playerTravel":
					data.state = "Traveling";
					break;
				case "playerChooseResource":
					data.state = "Choosing resources";
					break;
				case "playerChooseCityCardAward":
					data.state = "Choosing city card award";
					break;
				case "playerPickContract":
					data.state = "Picking a contract";
					break;
				case "playerMoveTradingPost":
					data.state = "Moving a trading post";
					break;
				case "playerTriggerOtherCityBonus":
					data.state = "Activating another city bonus";
					break;
				case "pickCharacter":
					data.state = "Picking a character";
					break;
				case "pickGoals":
					data.state = "Picking goal cards";
					break;
				case "playerGunjBonus":
					data.state = "Choosing a good";
					break;
				case "gameover":
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default marcopolo;
