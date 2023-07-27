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

  getItemsByType = async (type) => {
    // getAllItems 로 둘다 처리할 수 있을 것 같으면 분리하는 것?
    try {
      if (!["snack", "drink", "food"].includes(type)) {
        throw new Error("타입을 snack, drink, food 중 고르세요");
      }
      const itemDataByType = await this.itemRepository.getItemsByType(type);
      return { code: 200, data: itemDataByType };
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteItem = async (itemId) => {
    try {
      const itemData = await this.itemRepository.getItemById(itemId);
      if (!itemData) throw new Error("상품이 존재하지 않습니다.");
      const remainAmount = itemData.amount;
      if (remainAmount > 0) {
        const confirmDelete = confirm("수량이 남아있습니다. 삭제하시겠습니까?"); // await??
        if (confirmDelete) {
          // 질문하자
          await this.itemRepository.deleteItem(itemId);
          return { code: 200, message: "삭제를 완료하였습니다." };
        } else {
          return { code: 202, message: "삭제를 취소하였습니다." };
        }
      }
      await this.itemRepository.deleteItem(itemId);
      return { code: 200, message: "삭제가 완료되었습니다." };
    } catch (error) {
      throw new Error(error);
    }
  };

  updateItem = async (itemId, name, price) => {
    try {
      if (!name || !price) throw new Error("이름과 가격을 입력하세요.");
      if (price < 0) throw new Error("가격을 음수로 설정할 수 없습니다.");
      const itemData = await this.itemRepository.getItemById(itemId);
      if (!itemData) throw new Error("상품이 존재하지 않습니다.");
      await this.itemRepository.updateItem(name, price, itemId);
      return { code: 200, message: "수정이 완료되었습니다." };
    } catch (error) {
      throw new Error(error);
    }
  };
}

// 레포지토리단에서 에러
// 비동기에러 try catch or 다른 모듈을 써야 한다
// 결과적으로 서비스에서도 try catch문을 써야합니다

module.exports = ItemService;
