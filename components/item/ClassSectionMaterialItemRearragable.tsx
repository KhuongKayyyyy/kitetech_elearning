import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Trash,
  FileText,
  Link,
  Video,
  Image,
  Megaphone,
  Upload,
} from "lucide-react";

interface ClassSectionMaterialItemRearrangableProps {
  material: {
    id: number;
    classSectionId: number;
    material: string;
    type: string;
    content: string;
  };
  index: number;
  isGhost?: boolean;
  onRemove?: () => void;
}

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case "link":
      return <Link className='h-4 w-4 sm:h-5 sm:w-5 text-blue-500' />;
    case "video":
      return <Video className='h-4 w-4 sm:h-5 sm:w-5 text-red-500' />;
    case "image":
      return <Image className='h-4 w-4 sm:h-5 sm:w-5 text-green-500' />;
    case "announcement":
      return <Megaphone className='h-4 w-4 sm:h-5 sm:w-5 text-orange-500' />;
    case "submission":
      return <Upload className='h-4 w-4 sm:h-5 sm:w-5 text-purple-500' />;
    default:
      return <FileText className='h-4 w-4 sm:h-5 sm:w-5 text-gray-500' />;
  }
};

export default class ClassSectionMaterialItemRearrangable extends React.Component<ClassSectionMaterialItemRearrangableProps> {
  render() {
    const { id, material, type, content, classSectionId } = this.props.material;

    return (
      <Draggable draggableId={id.toString()} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`mx-2 sm:mx-5 group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 sm:p-4 hover:border-black hover:border-3 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 cursor-grab active:cursor-grabbing ${
              snapshot.isDragging
                ? "bg-primary/5 border-primary/30 shadow-lg scale-[1.02]"
                : ""
            } ${this.props.isGhost ? "opacity-50" : "opacity-100"}`}>
            <div className='flex items-start sm:items-center gap-2 sm:gap-3'>
              <div className='flex-shrink-0 mt-0.5 sm:mt-0'>
                {getIconForType(type)}
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 sm:truncate transition-colors'>
                  {material}
                </h3>
                <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 sm:mt-2'>
                  <span className='inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded w-fit'>
                    {type}
                  </span>
                  {type === "link" && (
                    <span className='text-xs text-neutral-500 dark:text-neutral-400 truncate block sm:inline'>
                      {content}
                    </span>
                  )}
                </div>
              </div>

              {this.props.onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    this.props.onRemove?.();
                  }}
                  className='flex-shrink-0 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400'
                  aria-label='Remove material'>
                  <Trash className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
