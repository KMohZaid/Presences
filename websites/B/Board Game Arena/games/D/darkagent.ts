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

const darkagent: GamePresence = {
	logo: "https://i.imgur.com/2Xjzqj0.png",
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
				case "NATIONPhase":
					data.state = "Choosing a nation";
					break;
				case "PlaceSat":
					data.state = "Placing a satellite";
					break;
				case "COLORPhase":
					data.state = "Choosing a color";
					break;
				case "OnOwnSatClick":
				case "OnOwnSatClick2":
				case "ClickOnSecondSat":
				case "ClickOnSecondSat2":
					data.state = "Interacting with a satellite";
					break;
				case "TDOACtion":
					data.state = "Choosing an action for satellites";
					break;
				case "MediaAction":
					data.state = "Choosing cards for media action";
					break;
				case "MediaAction2":
					data.state = "Placing cards for media action";
					break;
				case "onAimLOKClick":
					data.state = "Choosing an aim to lock";
					break;
				case "ONUPhase":
					data.state = "Voting for U.N. Peace decision";
					break;
				case "ChooseSatToUpgrade":
					data.state = "Upgrading a satellite";
					break;
				case "onEQPRIFClick":
					data.state = "Choosing a target for RIFLE";
					break;
				case "onChooseDBL":
					data.state = "Choosing a double agent";
					break;
				case "onEQPJETClick":
				case "onKAMKAZClick":
					data.state = "Choosing a spy";
					break;
				case "JETPhase2":
					data.state = "Choosing a sentinel";
					break;
				case "onEQPBINClick":
					data.state = "Choosing an aim";
					break;
				case "onEQPBOTClick":
					data.state = "Choosing an empty square";
					break;
				case "ChooseSPY":
					data.state = "Moving a spy";
					break;
				case "onEQPSATClick":
					data.state = "Choosing an opponent satellite";
					break;
				case "onAIMXCG":
					data.state = "Exchanging cards";
					break;
				case "onCARNAVAL":
					data.state = "Choosing a direction and a line for CARNAVAL";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default darkagent;
