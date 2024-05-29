const dotenv = require("dotenv");
dotenv.config();

const { Porkmeat } = require('../classes/porkmeat');
const { Poultry } = require('../classes/poultry');
const { Swine } = require('../classes/swine');

const generatePorkmeat = async(meat, action, sapFile) => {    
    const porkmeat = new Porkmeat();
    porkmeat.meat = meat;
    porkmeat.action = action;
    porkmeat.sapFile = sapFile;
    const result = await porkmeat.generateOutputData();
    if (result.isProcessed) porkmeat.log();
    return result;
}

const generatePoultry = async(meat, action, sapFile) => {    
    const poultry = new Poultry();
    poultry.meat = meat;
    poultry.action = action;
    poultry.sapFile = sapFile;
    const result = await poultry.generateOutputData();
    if (result.isProcessed) poultry.log();
    return result;
}

const generateSwine = async(meat, action, sapFile) => {    
    const swine = new Swine();
    swine.meat = meat;
    swine.action = action;
    swine.sapFile = sapFile;
    const result = await swine.generateOutputData();
    if (result.isProcessed) swine.log();
    return result;
}

module.exports = {
    generatePorkmeat,
    generatePoultry,
    generateSwine,
};