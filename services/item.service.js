const ItemRepository = require("../repositories/item.repository");

class ItemService {
  itemRepository = new ItemRepository();

  registerItem = async (name, price, type) => {
    try {
      if (!name || !price) {
        throw new Error("이름과 가격을 입력하세요");
        // express 에러객체 오류추적 가능
        // 코드는 커스텀에러를 만들어야하낟
      }
      if (!["snack", "drink", "food"].includes(type)) {
        throw new Error("타입을 snack, drink, food 중 고르세요");
        //타입을 어떻게 오류처리할지 생각해보자
      }
      const exItem = await this.itemRepository.findExItem(name);
      if (exItem) {
        throw new Error("이미 존재하는 이름입니다.");
      }

      await this.itemRepository.registerItem(name, price, type);
      return { code: 200, message: "상품 추가가 완료되었습니다." };
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllItems = async () => {
    try {
      const allItemData = await this.itemRepository.getAllItems();
      return { code: 200, data: allItemData };
    } catch (error) {
      throw new Error(error);
    }
  };
}
// 레포지토리단에서 에러
// 비동기에러 try catch or 다른 모듈을 써야 한다
// 결과적으로 서비스에서도 try catch문을 써야합니다

module.exports = ItemService;