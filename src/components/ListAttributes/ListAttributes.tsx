import "./ListAttributes.css";

const ListAtributes = () => {
  return (
    <div className="list_attributes_container">
      <p className="name_atribute">Name</p>
      <div className="extra_atributes">
        <p>Rarity</p>
        <p>Buy Now</p>
        <p>Last Sale</p>
        <p>Top Bid</p>
        <p>Owner</p>
      </div>
    </div>
  );
};
export default ListAtributes;
