
namespace backend
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public bool HasObtained { get; set; }

        public Item(int id, string name, int amount, bool hasObtained)
        {
            Id = id;
            Name = name;
            Amount = amount;
            HasObtained = hasObtained;
        }
    }
}
