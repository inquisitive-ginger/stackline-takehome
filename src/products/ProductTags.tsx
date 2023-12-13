type Props = {
  tags: string[];
};

const ProductTags = ({ tags }: Props) => {
  return (
    <div className="md:border-y border-gray-200 w-full mt-2 p-4 flex flex-row flex-wrap content-center gap-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="border border-gray-200 rounded-md px-4 py-1 text-sm text-gray-500"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ProductTags;
