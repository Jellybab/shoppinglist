using System;
using System.Net.Sockets;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Components.Routing;

namespace backend
{
    public class InMemoryItemListService : IItemListService
    {
        private readonly List<Item> _tescoItems = [];
        private readonly List<Item> _asdaItems = [];
        private int _lastItemId = 1;

        public Item? GetItemByID(int id, bool isTesco)
        {
            return GetLocation(isTesco).SingleOrDefault(i => id == i.Id);
        }

        public List<Item> GetItems(bool isTesco)
        {
            return isTesco == true ? _tescoItems : _asdaItems;
        }

        public void DeleteItemById(int id, bool isTesco)
        {
            GetLocation(isTesco).RemoveAll(i => id == i.Id);
        }

        public Item AddItem(Item item, bool isTesco)
        {
            Item newItem = new(
                _lastItemId,
                item.Name,
                item.Amount,
                false);
            GetLocation(isTesco).Add(newItem);
            _lastItemId++;
            return newItem;
        }

        public Item? UpdateItem(Item updatedItem, bool isTesco)
        {
            foreach (Item item in isTesco ? _tescoItems : _asdaItems)
            {
                if(item.Id == updatedItem.Id)
                {
                    item.Name = updatedItem.Name;
                    item.Amount = updatedItem.Amount;
                    item.HasObtained = updatedItem.HasObtained;
                    return item;
                }
            }
            return null;
        }

        private List<Item> GetLocation(bool isTesco)
        {
            return isTesco ? _tescoItems : _asdaItems;
        }
    }
}
