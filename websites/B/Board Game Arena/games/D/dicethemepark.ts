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

const dicethemepark: GamePresence = {
	logo: "https://i.imgur.com/mQL5e47.png",
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
				case "InitialSetup":
					data.state = "Setting up game";
					break;
				case "InitialAttraction":
					data.state = "Selecting attraction tiles";
					break;
				case "Plan":
					data.state = "Playing Staff cards";
					break;
				case "Welcome":
					data.state = "Selecting Monorail card";
					break;
				case "WelcomeConcierge":
					data.state = "Using Concierge ability";
					break;
				case "Expand":
					data.state = "Expanding park";
					break;
				case "SetDiceValue":
					data.state = "Setting guest dice value";
					break;
				case "DrawGuestDice":
					data.state = "Drawing guest dice";
					break;
				case "BuildFreeAttraction":
					data.state = "Building free attraction";
					break;
				case "RecruitMascot":
					data.state = "Recruiting a mascot";
					break;
				case "Improve":
					data.state = "Improving park";
					break;
				case "Operate":
					data.state = "Operating park";
					break;
				case "TicketAgent":
					data.state = "Using Ticket Agent ability";
					break;
				case "PlanAdmin":
					data.state = "Reducing Staff card value";
					break;
				case "UpkeepAdmin":
					data.state = "Swapping cards";
					break;
				case "WelcomeAdmin":
					data.state = "Selecting Monorail die";
					break;
				case "AdministratorTicketAgent":
					data.state = "Using Admin Ticket Agent ability";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default dicethemepark;
