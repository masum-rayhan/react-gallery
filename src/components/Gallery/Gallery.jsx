import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const Gallery = ({ images, setImages, selectedImages, onImageClick }) => {
  const [showSquareIcon, setShowSquareIcon] = useState(false);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing.

    const items = [...images];
    const [reorderedItem] = items.splice(result.source.index, 1); // Remove item from the source index
    items.splice(result.destination.index, 0, reorderedItem); // Insert the item at the destination index

    setImages(items);
  };
  // }
  return (
    <>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <div
                className="gallery"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map(({ id, src }, index) => {
                  const isSelected = selectedImages.includes(id);
                  return (
                    <Draggable
                      key={id}
                      draggableId={id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`image-container ${
                            index === 0 ? "featured-image" : ""
                          } ${isSelected ? "selected" : ""}`}
                          onMouseEnter={() => setShowSquareIcon(true)}
                          onMouseLeave={() => setShowSquareIcon(false)}
                        >
                          <div className="image-wrapper">
                            <img src={src} alt={`${id}`} className="image" />
                            <div
                              className="selection-overlay"
                              onClick={() => onImageClick(id)}
                            >
                              {/* Toggle between square and checkmark icon based on selection */}
                              <FontAwesomeIcon
                                icon={isSelected ? faCheckSquare : faSquare}
                                className="selection-box"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </>
  );
};

export default Gallery;
