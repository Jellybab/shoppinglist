import ItemList from "../jsx/ItemList.jsx";

export default function Tesco() {
  return (
    <div className="Tesco">
      <header className="Tesco-header">
        <ItemList apiUrl="/api/tesco" />
      </header>
    </div>
  );
}