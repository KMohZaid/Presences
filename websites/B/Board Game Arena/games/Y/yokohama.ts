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

const yokohama: GamePresence = {
	logo: "https://i.imgur.com/dXoEHR3.png",
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
				case "initialOrder":
					data.state = "Selecting initial Order card";
					break;
				case "placeAssistantsStep":
					data.state = "Placing assistants";
					break;
				case "placeAdjacentAssistant":
					data.state = "Placing an additional assistant";
					break;
				case "payForAssistant":
					data.state = "Deciding if paying for presence of other presidents";
					break;
				case "movePresidentStep":
					data.state = "Moving president";
					break;
				case "removeAssistants":
					data.state = "Removing assistants";
					break;
				case "payForPresident":
					data.state = "Paying for moving president";
					break;
				case "sellImports":
					data.state = "Selling imports";
					break;
				case "complementFaith":
					data.state = "Adding faith";
					break;
				case "selectResource":
					data.state = "Selecting resource";
					break;
				case "tradeResource":
					data.state = "Trading resource";
					break;
				case "warehouseOut":
					data.state = "Taking items out of warehouse";
					break;
				case "completePhase":
					data.state = "Completing order";
					break;
				case "claimPhase":
					data.state = "Claiming achievement";
					break;
				case "agentPhase":
					data.state = "Selecting tile for Agent";
					break;
				case "selectOrder":
				case "selectOrder2":
					data.state = "Acquiring an order";
					break;
				case "selectTech":
					data.state = "Selecting a technology";
					break;
				case "placeStation":
					data.state = "Placing a station";
					break;
				case "moveAssistant":
				case "moveAssistantTo":
					data.state = "Moving an assistant";
					break;
				case "selectConstruct":
					data.state = "Selecting a construction";
					break;
				case "placePresidentStep":
					data.state = "Placing president";
					break;
				case "leaveAssistant":
					data.state = "Leaving an assistant behind";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default yokohama;
