import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type DroppableAreaType = "First" | "Second" | "Third";

type DraggableItemType = {
  id: string;
  status: DroppableAreaType;
  title: string;
};
const DraggableItem: DraggableItemType[] = [
  { id: "1", status: "Second", title: "Title 1" },
  { id: "2", status: "Second", title: "Title 2" },
  { id: "3", status: "Second", title: "Title 3" },
  { id: "4", status: "Second", title: "Title 4" },
];

export default function Board() {
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [kanban, setKanban] = useState<{
    [key in DroppableAreaType]: DraggableItemType[];
  }>({
    First: DraggableItem.filter((item) => item.status === "First"),
    Second: DraggableItem.filter((item) => item.status === "Second"),
    Third: DraggableItem.filter((item) => item.status === "Third"),
  });

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceAreaId = source.droppableId as DroppableAreaType;
    const destinationAreaId = destination.droppableId as DroppableAreaType;

    setKanban((prev) => {
      const newKanban = { ...prev };
      const [targetItem] = newKanban[sourceAreaId].splice(source.index, 1);

      newKanban[destinationAreaId].splice(
        destination.index,
        0,
        targetItem as DraggableItemType
      );

      return newKanban;
    });
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setAnimationEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setAnimationEnabled(false);
    };
  }, []);

  if (!animationEnabled) return null;
  //
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 10 }}>
        {Object.keys(kanban).map((key) => (
          <Droppable key={key} droppableId={key}>
            {(provided) => (
              <div
                className={key}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flexGrow: 1,
                  flexBasis: 0,
                  border: "1px solid #ccc",
                }}
              >
                {kanban[key as DroppableAreaType].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div style={{ border: "1px solid gray" }}>
                          {item.title}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
