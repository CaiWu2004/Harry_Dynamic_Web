// an individual image with a div wrapped around for styling purposes
// receives an individual image as props
// const ImageItem = (props) => {
//   const { image } = props;
//   return (
//     <div className="p-4">
//       <img
// src={image.urls.small}
// alt={image.alt_description}
// />
//       <p className="text-sm text-gray-600">
//         Photo by{" "}
//         <a
//           href={image.user.links.html}
//           target="_blank"
//           rel="noreferrer"
//           className="underline"
//         >
//           {image.user.name}
//         </a>
//       </p>
//     </div>
//   );
// };

// export default ImageItem;

const ImageItem = (props) => {
  const { image } = props;

  return (
    <div className="p-4">
      <img src={image.urls.small} alt={image.alt_description} />
      {/* add the authors name */}
      <p className="text-sm text-gray-600">
        Photo by{" "}
        <a
          href={image.user.links.html}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          {image.user.name}
        </a>
      </p>
    </div>
  );
};

export default ImageItem;
