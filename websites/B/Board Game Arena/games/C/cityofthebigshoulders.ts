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

const cityofthebigshoulders: GamePresence = {
	logo: "https://i.imgur.com/zGlAzZd.png",
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
				case "playerStartFirstCompany":
				case "gameStartFirstCompany":
					data.state = "Starting a company";
					break;
				case "playerSellPhase":
					data.state = "Selling certificates to the bank";
					break;
				case "playerBuildingPhase":
					data.state = "Playing a building";
					break;
				case "playerBuyPhase":
				case "playerSkipSellBuyPhase":
					data.state = "Buying a certificate or starting a company";
					break;
				case "playerActionPhase":
					data.state = "Choosing an action";
					break;
				case "playerBuyResourcesPhase":
					data.state = "Buying resources";
					break;
				case "playerProduceGoodsPhase":
					data.state = "Producing goods";
					break;
				case "managerBonusResources":
					data.state = "Choosing resources to gain from Haymarket Square";
					break;
				case "playerDistributeGoodsPhase":
					data.state = "Distributing goods";
					break;
				case "playerDividendsPhase":
					data.state = "Paying dividends";
					break;
				case "playerAssetWorkerBonus":
					data.state = "Hiring a worker";
					break;
				case "playerAssetAutomationBonus":
					data.state = "Automating a factory";
					break;
				case "playerFreeActionPhase":
					data.state = "Trading with Haymarket Square or using Capital Assets";
					break;
				case "playerAssetAppealBonus":
				case "playerActionAppealBonus":
				case "playerBuyResourceAppealBonus":
				case "playerProduceGoodsAppealBonus":
				case "playerDistributeAppealBonus":
				case "playerDividendsAppealBonus":
				case "managerBonusAppeal":
				case "playerFreeActionAppealBonus":
				case "playerUseAssetsAppealBonus":
					data.state = "Gaining or forfeiting appeal bonus";
					break;
				case "playerEmergencyFundraise":
					data.state = "Performing Emergency Fundraising";
					break;
				case "playerUseAssetsPhase":
					data.state = "Using unexhausted assets";
					break;
				case "playerconfirmDirectorship":
					data.state = "Confirming directorship change";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default cityofthebigshoulders;
