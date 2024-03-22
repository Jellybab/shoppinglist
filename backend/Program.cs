using backend;
using Microsoft.AspNetCore.Http.HttpResults;

bool tesco = true;
bool asda = false;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IItemListService>(new InMemoryItemListService());
var app = builder.Build();

//get all
app.MapGet("/tesco", (IItemListService service) => service.GetItems(tesco));
app.MapGet("/asda", (IItemListService service) => service.GetItems(asda));

//get by id
app.MapGet("/tesco/{id}", Results<Ok<Item>, NotFound> (int id, IItemListService service) =>
{
  var targetItem = service.GetItemByID(id, tesco);
  return targetItem is null
    ? TypedResults.NotFound()
    : TypedResults.Ok(targetItem);
});

app.MapGet("/asda/{id}", Results<Ok<Item>, NotFound> (int id, IItemListService service) =>
{
  var targetItem = service.GetItemByID(id, asda);
  return targetItem is null
    ? TypedResults.NotFound()
    : TypedResults.Ok(targetItem);
});

//post item

app.MapPost("/tesco", (Item item, IItemListService service) =>
{
  service.AddItem(item, tesco);
  return TypedResults.Created("/tesco/{id}", item);
});

app.MapPost("/asda", (Item item, IItemListService service) =>
{
  service.AddItem(item, asda);
  return TypedResults.Created("/asda/{id}", item);
});

//delete item
app.MapDelete("/tesco/{id}", (int id, IItemListService service) => 
{
  service.DeleteItemById(id, tesco);
  return TypedResults.NoContent();
});

app.MapDelete("/asda/{id}", (int id, IItemListService service) => 
{
  service.DeleteItemById(id, asda);
  return TypedResults.NoContent();
});

app.Run();
