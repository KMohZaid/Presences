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

const solarstorm: GamePresence = {
	logo: "https://i.imgur.com/BYlBhvm.png",
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
				case "playerMove":
					data.state = "Choosing a destination";
					break;
				case "playerScavenge":
					data.state = "Rolling the dice";
					break;
				case "playerScavengePickCards":
					data.state = "Choosing a resource card";
					break;
				case "playerShare":
					data.state = "Sharing resources";
					break;
				case "playerRepair":
					data.state = "Repairing using resources";
					break;
				case "playerDivert":
					data.state = "Diverting power";
					break;
				case "playerRoomCrewQuarter":
					data.state = "Moving a meeple";
					break;
				case "playerRoomCargoHold":
					data.state = "Reordering resource cards";
					break;
				case "playerRoomMessHall":
					data.state = "Taking, giving or swapping a resource card (Mess Hall)";
					break;
				case "playerRoomEngineRoom":
					data.state = "Swapping a resource card (Engine Room)";
					break;
				case "playerRoomRepairCentre":
					data.state = "Repairing a room";
					break;
				case "playerRoomArmoury":
					data.state = "Placing protection tokens (Armoury)";
					break;
				case "playerRoomBridge":
					data.state = "Reordering damage cards (Bridge)";
					break;
				case "pickResources":
					data.state = "Picking resource cards";
					break;
				case "playerAskActionTokensPlay":
					data.state = "Using action tokens";
					break;
				case "playerDiscardResources":
					data.state = "Discarding resource cards";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default solarstorm;
