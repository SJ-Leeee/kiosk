const { Option } = require('../models');
class OptionRepository {
  registerOption = async (itemId, optionName, optionPrice) => {
    await Option.create({ item_id: itemId, option_name: optionName, option_price: optionPrice });
    return;
  };
  getOptionByName = async (itemId, optionName) => {
    return await Option.findOne({ where: { item_id: itemId, option_name: optionName } });
  };

  getAllOptions = async (itemId) => {
    return await Option.findAll({ where: { item_id: itemId } });
  };

  getOptionById = async (optionId) => {
    return await Option.findOne({ where: { id: optionId } });
  };

  updateOption = async (optionId, optionName, optionPrice) => {
    await Option.update({ option_name: optionName, option_price: optionPrice }, { where: { id: optionId } });
    return;
  };

  deleteOption = async (optionId) => {
    await Option.destroy({ where: { id: optionId } });
    return;
  };
}
module.exports = OptionRepository;
