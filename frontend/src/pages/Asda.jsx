import ItemList from "../jsx/ItemList.jsx";

export default function Tesco() {
  return (
    <div className="Asda">
      <header className="Asda-header">
        <ItemList apiUrl="/api/asda" />
      </header>
    </div>
  );
}