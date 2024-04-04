using System.Text.Json;
using backend;
using Microsoft.AspNetCore.Http.HttpResults;

bool tesco = true;
bool asda = false;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IItemListService>(new InMemoryItemListService());
var app = builder.Build();

//get all
app.MapGet("/api/tesco", (IItemListService service) => service.GetItems(tesco));
app.MapGet("/api/asda", (IItemListService service) => service.GetItems(asda));

//get by id
app.MapGet("/api/tesco/{id}", Results<Ok<Item>, NotFound> (int id, IItemListService service) =>
{
  var targetItem = service.GetItemByID(id, tesco);
  return targetItem is null
    ? TypedResults.NotFound()
    : TypedResults.Ok(targetItem);
});

app.MapGet("/api/asda/{id}", Results<Ok<Item>, NotFound> (int id, IItemListService service) =>
{
  var targetItem = service.GetItemByID(id, asda);
  return targetItem is null
    ? TypedResults.NotFound()
    : TypedResults.Ok(targetItem);
});

//update item
app.MapPut("/api/tesco/", async (Item updatedItem, IItemListService service) =>
{
  var targetItem = await Task.Run(() => service.UpdateItem(updatedItem, true));
  return targetItem is null
    ? Results.NotFound()
    : Results.Ok(targetItem);
});

app.MapPut("/api/asda/", async (Item updatedItem, IItemListService service) =>
{
  var targetItem = await Task.Run(() => service.UpdateItem(updatedItem, false));
  return targetItem is null
    ? Results.NotFound()
    : Results.Ok(targetItem);
});

//post item

app.MapPost("/api/tesco", (Item item, IItemListService service) =>
{
  item = service.AddItem(item, tesco);
  return TypedResults.Created($"/api/tesco/{item.Id}", item);
});

app.MapPost("/api/asda", (Item item, IItemListService service) =>
{
  item = service.AddItem(item, asda);
  return TypedResults.Created($"/api/asda/{item.Id}", item);
});

//delete item
app.MapDelete("/api/tesco/{id}", (int id, IItemListService service) => 
{
  service.DeleteItemById(id, tesco);
  return TypedResults.NoContent();
});

app.MapDelete("/api/asda/{id}", (int id, IItemListService service) => 
{
  service.DeleteItemById(id, asda);
  return TypedResults.NoContent();
});

app.Run();
