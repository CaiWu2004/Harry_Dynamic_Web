//recieve data as a prop here and map through time
import ImageItem from "./ImageItem";

const ImageList = (props) => {
  const { images } = props;
  console.log(images);

  const renderedImages = images.map((img) => (
    <ImageItem image={img} key={img.id} />
  ));
  return (
    <div>
      {/* MAP THROUGH IMAGES and return IMAGE ITEM EACH */}
      {renderedImages}
    </div>
  );
};

export default ImageList;
