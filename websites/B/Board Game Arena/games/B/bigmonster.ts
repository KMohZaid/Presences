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

const bigmonster: GamePresence = {
	logo: "https://i.imgur.com/f7F07rq.png",
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
				case "teamSelection":
					data.state = "Choosing a team";
					break;
				case "explorerSelection":
					data.state = "Selecting an explorer";
					break;
				case "tileSelection":
					data.state = "Selecting a tile";
					break;
				case "var_placeTile":
				case "placeTile":
					data.state = "Placing a tile";
					break;
				case "bmExploTileSelection":
					data.state = "Selecting a tile from the discard pile";
					break;
				case "bmExploTilePlacement":
					data.state = "Placing a tile from the discard pile";
					break;
				case "var_tileSelection":
					data.state = "Selecting a tile to play/discard";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default bigmonster;
