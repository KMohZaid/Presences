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

const castlesofburgundy: GamePresence = {
	logo: "https://i.imgur.com/EzznvhJ.png",
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
				case "setupChoices":
					data.state = "Choosing starting positions";
					break;
				case "playerAction":
					data.state = "Choosing an action";
					break;
				case "advPlaceTile":
					data.state = "Town Hall Advantage: Placing a tile";
					break;
				case "chooseDepot":
					data.state = "Taking goods from a depot";
					break;
				case "chooseGoods":
					data.state = "Choosing goods to take";
					break;
				case "advTakeTile":
					data.state = "Advantage: Taking a tile from main board";
					break;
				case "advSellGoods":
					data.state = "Warehouse advantage: Selling goods";
					break;
				case "castleAdvAction":
					data.state = "Castle advantage: Choosing an action";
					break;
				case "confirmTurn":
					data.state = "Confirming turn";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default castlesofburgundy;
