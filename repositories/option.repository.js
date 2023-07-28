const { Option } = require('../models');
class OptionRepository {
  registerOption = async (itemId, optionName, optionPrice) => {
    await Option.create({ item_id: itemId, option_name: optionName, option_price: optionPrice });
    return;
  };
  getOptionByName = async (optionName) => {
    return await Option.findOne({ where: { option_name: optionName } });
  };

  getAllOptions = async (itemId) => {
    return await Option.findAll({ where: { item_id: itemId } });
  };
}
module.exports = OptionRepository;
