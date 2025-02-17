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

const lookatthestars: GamePresence = {
	logo: "https://i.imgur.com/nsSXJwO.png",
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
				case "playCard":
				case "placeShape":
					data.state = "Placing a shape";
					break;
				case "placePlanet":
					data.state = "Placing a planet on a star";
					break;
				case "placeLine":
					data.state = "Placing a line between two stars";
					break;
				case "placeStar":
					data.state = "Placing a new star";
					break;
				case "placeBlackHole":
					data.state = "Placing a black hole";
					break;
				case "placeCrescentMoon":
					data.state = "Placing a crescent moon";
					break;
				case "placeLuminousAura":
					data.state = "Placing a luminous aura";
					break;
				case "placeGalaxy":
					data.state = "Placing a galaxy";
					break;
				case "placeNova":
					data.state = "Placing a nova";
					break;
				case "placeTwinklingStar":
					data.state = "Placing a twinkling star";
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
export default lookatthestars;
