import { PlatoonInfo } from "../interface/interface";
import { hasAdvantage, parseInput } from "../helpers/helper";

function calculateBattleOutcome(yourPlatoon: PlatoonInfo, opponentPlatoon: PlatoonInfo): 'win' | 'lose' | 'draw' {
    const advantage = hasAdvantage(yourPlatoon.platoonType, opponentPlatoon.platoonType);
    const yourEffectiveStrength = advantage ? yourPlatoon.platoonCount * 2 : yourPlatoon.platoonCount;
    const opponentEffectiveStrength = opponentPlatoon.platoonCount;

    if (yourEffectiveStrength > opponentEffectiveStrength) return 'win';
    if (yourEffectiveStrength < opponentEffectiveStrength) return 'lose';
    return 'draw';
}

function arrangePlatoons(yourPlatoons: PlatoonInfo[], enemyPlatoons: PlatoonInfo[]): string {
    let wins = 0;
    let arrangedPlatoons: PlatoonInfo[] = [];

    yourPlatoons.forEach(yourPlatoon => {
        let isMatched = false;
        for (let enemyPlatoon of enemyPlatoons) {
            if (calculateBattleOutcome(yourPlatoon, enemyPlatoon) === 'win') {
                wins++;
                arrangedPlatoons.push(yourPlatoon);
                enemyPlatoons = enemyPlatoons.filter(p => p !== enemyPlatoon);
                isMatched = true;
                break;
            }
        }
        if (!isMatched) {
            arrangedPlatoons.push(yourPlatoon);
        }
    });

    return wins >= 3 ? 
        arrangedPlatoons.map(p => `${p.platoonType}#${p.platoonCount}`).join(';') :
        "There is no chance of winning";
}

const ourTroops = "Spearmen#10;Militia#30;FootArcher#20;LightCavalry#1000;HeavyCavalry#120";
const opponentTroops = "Militia#10;Spearmen#10;FootArcher#1000;LightCavalry#120;CavalryArcher#100";

const yourPlatoons = parseInput(ourTroops);
const enemyPlatoons = parseInput(opponentTroops);

const platoonOrder = arrangePlatoons(yourPlatoons, enemyPlatoons);
console.log(platoonOrder);