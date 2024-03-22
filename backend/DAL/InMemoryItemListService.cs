using System;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Components.Routing;

namespace backend
{
    public class InMemoryItemListService : IItemListService
    {
        private readonly List<Item> _tescoItems = [];
        private readonly List<Item> _asdaItems = [];

        public Item? GetItemByID(int id, bool isTesco)
        {
            return GetLocation(isTesco).SingleOrDefault(i => id == i.Id);
        }

        public List<Item> GetItems(bool isTesco)
        {
            return isTesco ==  true ?  _tescoItems :  _asdaItems;
        }

        public void DeleteItemById(int id, bool isTesco)
        {
            GetLocation(isTesco).RemoveAll(i => id == i.Id);
        }

        public Item AddItem(Item item, bool isTesco)
        {
            GetLocation(isTesco).Add(item);
            return item;
        }

        private List<Item> GetLocation(bool isTesco)
        {
            return isTesco ? _tescoItems : _asdaItems;
        }
    }
}
