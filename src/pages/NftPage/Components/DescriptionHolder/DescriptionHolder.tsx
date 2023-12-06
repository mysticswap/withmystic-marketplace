type Props = {
  description: string;
};

const DescriptionHolder = ({ description }: Props) => {
  return (
    <div>
      <p className="holder_title">Description</p>
      <p>{description}</p>
    </div>
  );
};

export default DescriptionHolder;
