const OptionRepository = require('../repositories/option.repository');
const ItemRepository = require('../repositories/item.repository');
class OptionSerivce {
  optionRepository = new OptionRepository();
  itemRepository = new ItemRepository();

  registerOption = async (itemId, optionName, optionPrice) => {
    try {
      if (!optionName || !optionPrice) throw new Error('옵련이름과 가격을 입력하세요');
      const exItem = await this.itemRepository.getItemById(itemId);
      if (!exItem) throw new Error('존재하지 않는 상품입니다.');
      const exOption = await this.optionRepository.getOptionByName(optionName);
      if (exOption) throw new Error('이미 존재하는 옵션입니다.');

      await this.optionRepository.registerOption(itemId, optionName, optionPrice);
      return { code: 200, message: '옵션 추가가 완료되었습니다.' };
    } catch (error) {
      throw error;
    }
  };

  getAllOptions = async (itemId) => {
    try {
      const exItem = await this.itemRepository.getItemById(itemId);
      if (!exItem) throw new Error('존재하지 않는 상품입니다.');

      const allOptionData = await this.optionRepository.getAllOptions(itemId);
      return { code: 200, data: allOptionData };
    } catch (error) {
      throw error;
    }
  };
}
module.exports = OptionSerivce;
