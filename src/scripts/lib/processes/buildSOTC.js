const dotenv = require("dotenv");
dotenv.config();

const { Porkmeat } = require('../classes/porkmeat');
const { Poultry } = require('../classes/poultry');
const { Swine } = require('../classes/swine');

const buildPorkmeat = async(meat, action) => {
    const porkmeat = new Porkmeat();
    porkmeat.meat = meat;
    porkmeat.action = action;
    await porkmeat.clearSOTCPickupDataSheet();
    const result = await porkmeat.buildSOTC();
    if (result.isProcessed) porkmeat.log();
    return result;
}

const buildPoultry = async(meat, action) => {
    const poultry = new Poultry();
    poultry.meat = meat;
    poultry.action = action;
    await poultry.clearSOTCPickupDataSheet();
    const result = await poultry.buildSOTC();
    if (result.isProcessed) poultry.log();
    return result;
}

const buildSwine = async(meat, action) => {
    const swine = new Swine();
    swine.meat = meat;
    swine.action = action;
    const isCleared = await swine.clearSOTCPickupDataSheet();
    if (isCleared) {
        const result = await swine.buildSOTC();
        if (result.isProcessed) swine.log();
        return result;
    }
}

module.exports = { buildPorkmeat, buildPoultry, buildSwine }