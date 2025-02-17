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

const gizmos: GamePresence = {
	logo: "https://i.imgur.com/aEsi4Xz.png",
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
					data.state = "Taking an action";
					break;
				case "cardSelected":
				case "researchedCardSelected":
					data.state = "Building/Filing a Gizmo";
					break;
				case "triggerSphereSelect":
				case "triggerSelect":
				case "triggerDraw":
					data.state = "Triggering an action";
					break;
				case "research":
					data.state = "Building/Filing a researched Gizmo";
					break;
				case "deckSelected":
				case "triggerResearch":
					data.state = "Researching a Gizmo";
					break;
				case "buildLevel1For0":
					data.state = "Building a Gizmo for free";
					break;
				case "triggerFile":
					data.state = "Filing a Gizmo";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default gizmos;
