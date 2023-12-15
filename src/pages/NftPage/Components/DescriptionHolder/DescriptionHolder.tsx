import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";

const DescriptionHolder = () => {
  const { collectionMetadata } = useGlobalContext();
  const description = collectionMetadata?.collections?.[0]?.description;
  return (
    <div>
      <p className="holder_title">Description</p>
      <p>{description}</p>
    </div>
  );
};

export default DescriptionHolder;
