// importing some libraries and images

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import img1 from "../assets/images/image-1.webp";
import img2 from "../assets/images/image-2.webp";
import img3 from "../assets/images/image-3.webp";
import img4 from "../assets/images/image-4.webp";
import img5 from "../assets/images/image-5.webp";
import img6 from "../assets/images/image-6.webp";
import img7 from "../assets/images/image-7.webp";
import img8 from "../assets/images/image-8.webp";
import img9 from "../assets/images/image-9.webp";
import img10 from "../assets/images/image-10.jpeg";
import img11 from "../assets/images/image-11.jpeg";

const ImageGallery = () => {
  //checked file state
  const [selectedFiles, setSelectedFiles] = useState([]);

  //images state
  const [images, setImages] = useState([
    { id: "big-image", src: img11,  featured: true },
    { id: "image1", src: img1 },
    { id: "image2", src: img2 },
    { id: "image3", src: img3 },
    { id: "image4", src: img4 },
    { id: "image5", src: img5 },
    { id: "image6", src: img6 },
    { id: "image7", src: img7 },
    { id: "image8", src: img8 },
    { id: "image9", src: img9 },
    { id: "image10", src: img10 },
  ]);

  //This part defines when someone clicks on a checkbox (those check boxes we can check or uncheck) associated with an image.
  const handleCheckboxChange = (event, id) => {
    //When a checkbox is clicked, we update the list of selected images. If you check a box, we add the image to the list, and if you uncheck it, we remove the image from the list.
    setSelectedFiles((prevSelected) => {
      if (event.target.checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((fileId) => fileId !== id);
      }
    });

    //This part updates the gallery to show that an image has been selected or unselected. It's like putting a mark on the photos you've selected to remember which ones you like.
    setImages((prevImages) =>
      prevImages.map((image) => {
        if (image.id === id) {
          return { ...image, selected: event.target.checked };
        }
        return image;
      })
    );
  };

  //This function helps remove checked images from the gallery.
  const handleDelete = () => {
    //Here I make a copy of the current images and the list of selected images. It's like making a backup copy before I start removing pictures.
    let newImages = [...images];
    let newSelectedFiles = [...selectedFiles];

    //Here I go through all the images and remove the ones that are on the list of selected images. It's like taking out the pictures user no longer want in their gallery.
    newImages = newImages.filter((image) => !selectedFiles.includes(image.id));
    newSelectedFiles = []; //I empty the list of selected images because I've removed the ones I wanted to delete.

    //Here, I find the images that are still selected in the gallery after deleting some.
    const remainingSelectedImages = newImages.filter((image) => image.selected);

    //If there are still some selected images left, I have updated the list of selected images to match the remaining ones. It's like updating the list of selected images to match the ones that are still in the gallery.
    if (remainingSelectedImages.length > 0) {
      newSelectedFiles = remainingSelectedImages.map((image) => image.id);
    }

    //Finally, I've update the gallery with the changes I've made. That means I'm rearranging my photos on the wall and updating the list.
    setImages(newImages);
    setSelectedFiles(newSelectedFiles);
  };

  //This function does drag-and-drop operation in the image gallery.
  const handleDragEnd = (event) => {
    //Here active represents the image that was being dragged, and over represents the image over which the active image was dropped.
    const { active, over } = event;

    //Here I've checked whether the active image and the over image are not the same. If they are the same, it means that the image was dropped on itself, and I don't need to do anything. I only want to do something when an image is dropped onto a different image.
    if (active.id !== over.id) {
      setImages((prevImages) => {
        //This line finds the image in the prevImages array (the previous state of the images in the gallery) that matches the active image's id. This helps us get the src of the image that was actively dragged.
        const activeImage = prevImages.find((img) => img.id === active.id);

        //Similarly, but the active image was dropped here.
        const overImage = prevImages.find((img) => img.id === over.id);

  
        return prevImages.map((img) => {
          if (img.id === active.id) return { ...img, src: overImage.src }; //For the active image (the one that was being dragged), we update its src to be the same as the overImage's src. This means that the dragged image takes on the source of the image it was dropped onto.

          if (img.id === over.id) return { ...img, src: activeImage.src }; // For the over image (the one on which the active image was dropped), we update its src to be the same as the activeImage's src. This means that the image the active image was dropped onto takes on the source of the dragged image.
          return img;
        });
      });
    }
  };

    // Find the featured image based on the "featured" property or position.
    const featuredImage = images.find((image) => image.featured) || images[0];

    // Apply a distinct class to the featured image.
    const isFeatured = (image) => image.id === featuredImage.id;

  // Design Parts of image gallery 
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h1 className="text-center font-bold my-10 text-2xl">
          This is the image gallery
        </h1>

        <section className="max-w-5xl mx-auto my-10">
          <div className="flex justify-between">
            <div className="flex gap-3">
            {/* If there are selected files, it displays a checkbox, and the checkbox is checked. */}
              {selectedFiles.length > 0 && (
                <input
                  type="checkbox"
                  name="check"
                  checked={selectedFiles.length > 0}
                />
              )}
              {/* This code conditionally displays a text message depending on whether there are selected files.  */}
              {selectedFiles.length > 0 ? (
                <span className="text-xl font-semibold">
                  {selectedFiles.length} files selected
                </span>
              ) : (
                <span className="text-xl font-semibold">Gallery</span>
              )}
            </div>
            {selectedFiles.length > 0 && (
              <button
                className="text-xl font-medium text-red-600 hover:underline"
                onClick={handleDelete}
              >
                Delete Files
              </button>
            )}
          </div>
          <hr className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
          {/*If image.id is "big-image," it adds col-span-2 and row-span-2 classes, For other images, it doesn't apply any additional classes. */}
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative group ${
                  image.id === "big-image" ? "col-span-2 row-span-2" : ""
                } ${isFeatured(image) ? 'featured' : ''}`}
              >
                <Droppable id={image.id}>
                  <Draggable id={image.id}>
                    <img
                      src={image.src}
                      alt=""
                      className="border rounded-lg hover:brightness-50 cursor-pointer"
                    />
                  </Draggable>
                </Droppable>
                <div>
                  <input
                    type="checkbox"
                    name="check"
                    className={`absolute top-2 left-2 ${
                      image.selected ? "flex" : "hidden"
                    } group-hover:flex`}
                    checked={image.selected}
                    onChange={(event) => handleCheckboxChange(event, image.id)}
                  />
                </div>
              </div>
            ))}
            <div className="border-dashed border border-black flex justify-center items-center rounded-lg h-48 md:h-44 lg:h-44">
              <div>
                <img
                  className="ml-5 h-10 w-10"
                  src="https://i.ibb.co/ZhCrsSj/download.png"
                  alt=""
                />
                <h4 className="">Add images</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DndContext>
  );
};

export default ImageGallery;
