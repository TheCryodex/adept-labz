import { Platoon } from "../types/platoons"
import {PlatoonInfo} from "../interface/interface"

export const advantages: Record<Platoon, Platoon[]> = {
    [Platoon.Militia]: [Platoon.Spearmen, Platoon.LightCavalry],
    [Platoon.Spearmen]: [Platoon.LightCavalry, Platoon.HeavyCavalry],
    [Platoon.LightCavalry]: [Platoon.FootArcher, Platoon.CavalryArcher],
    [Platoon.HeavyCavalry]: [Platoon.Militia, Platoon.FootArcher, Platoon.LightCavalry],
    [Platoon.CavalryArcher]: [Platoon.Spearmen, Platoon.HeavyCavalry],
    [Platoon.FootArcher]: [Platoon.Militia, Platoon.CavalryArcher]
};

export const hasAdvantage = (platoon1: Platoon, platoon2: Platoon): boolean => {
    return advantages[platoon1].includes(platoon2)
}

export const parseInput = (input: string) : PlatoonInfo[] => {
    const splitPlatoons: string[] = input.split(";")

    return splitPlatoons.map((units)=>{
        const [platoonTypeStr, platoonCountStr] = units.split("#");
        const platoonType = platoonTypeStr as Platoon
        const platoonCount = parseInt(platoonCountStr)
        return {
            platoonType,
            platoonCount
        }
    })

}