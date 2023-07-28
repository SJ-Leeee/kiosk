const OptionService = require('../services/option.service');
class OptionController {
  optionService = new OptionService();

  registerOption = async (req, res) => {
    try {
      const { itemId } = req.params;
      const { optionName, optionPrice } = req.body;

      const result = await this.optionService.registerOption(itemId, optionName, optionPrice);
      if (result.data) return res.status(result.code).json({ data: result.data });
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  getAllOptions = async (req, res) => {
    try {
      const { itemId } = req.params;
      const result = await this.optionService.getAllOptions(itemId);
      if (result.data) return res.status(result.code).json({ data: result.data });
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  updateOption = async (req, res) => {
    try {
      const { optionId } = req.params;
      const { optionName, optionPrice } = req.body;
      const result = await this.optionService.updateOption(optionId, optionName, optionPrice);
      if (result.data) return res.status(result.code).json({ data: result.data });
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };
}
module.exports = OptionController;
