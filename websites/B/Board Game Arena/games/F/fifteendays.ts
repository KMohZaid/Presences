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

const fifteendays: GamePresence = {
	logo: "https://i.imgur.com/funEhU9.png",
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
				case "play_action":
					data.state = "Taking an action";
					break;
				case "draw_hidden_cards":
					data.state = "Drawing hidden cards";
					break;
				case "take_faceup_cards":
					data.state = "Taking displayed cards";
					break;
				case "discard_exceeding_cards":
					data.state = "Discarding cards";
					break;
				case "refill_column":
					data.state = "Refilling a column";
					break;
				case "place_cards":
					data.state = "Placing cards";
					break;
				case "pay_cards":
					data.state = "Paying cards";
					break;
				case "take_wildcard":
					data.state = "Taking a wildcard";
					break;
				case "place_wildcard":
					data.state = "Placing a wildcard";
					break;
				case "game_end_bonus":
					data.state = "Placing a wildcard (game end bonus)";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default fifteendays;
