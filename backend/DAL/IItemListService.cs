using System;

namespace backend
{
    interface IItemListService
    {
        Item? GetItemByID(int id, bool isTesco);
        List<Item> GetItems(bool isTesco);
        void DeleteItemById(int id, bool isTesco);
        Item AddItem(Item item, bool isTesco);
        Item? UpdateItem(Item updatedItem, bool isTesco);
    }
}
