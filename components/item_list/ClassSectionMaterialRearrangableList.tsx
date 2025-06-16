"use client";

import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  CirclePlus,
  Trash,
  FileText,
  Link,
  MessageSquare,
  Upload,
} from "lucide-react";
import styled from "styled-components";

// ------------------- Interfaces -------------------

interface Material {
  id: number;
  classSectionId: number;
  material: string;
  type: string;
  content: string;
}

interface ClassSectionMaterialRearrangableListProps {
  initialMaterials: Material[];
  onAddMaterial: () => void;
  onRemoveMaterial: (materialId: string) => void;
}

// ------------------- Styled Components -------------------

const MaterialList = styled.div`
  padding: 12px;
  background-color: white;
  flex-grow: 1;
  min-height: 150px;
  transition: background-color 0.2s ease;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const MaterialContainer = styled.div<{ isDragging: boolean }>`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  background-color: ${(props) => (props.isDragging ? "#e9f5e9" : "white")};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: grab;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const Content = styled.div`
  flex: 1;
`;

const MaterialName = styled.div`
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MaterialMeta = styled.div`
  font-size: 0.875rem;
  color: #666;
  display: flex;
  gap: 12px;
`;

const TypeBadge = styled.span<{ type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;

  ${({ type }) =>
    type === "link" &&
    `
    background-color: #dbeafe;
    color: #1e40af;
  `}
  ${({ type }) =>
    type === "announcement" &&
    `
    background-color: #fef3c7;
    color: #92400e;
  `}
  ${({ type }) =>
    type === "submission" &&
    `
    background-color: #d1fae5;
    color: #059669;
  `}
  ${({ type }) =>
    type === "file" &&
    `
    background-color: #e0e7ff;
    color: #3730a3;
  `}
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;
  margin-left: 8px;

  &:hover {
    color: #ff4d4f;
  }
`;

// ------------------- Utility -------------------

const getTypeIcon = (type: string) => {
  switch (type) {
    case "link":
      return <Link size={12} />;
    case "announcement":
      return <MessageSquare size={12} />;
    case "submission":
      return <Upload size={12} />;
    default:
      return <FileText size={12} />;
  }
};

// ------------------- Main Component -------------------

export default function ClassSectionMaterialRearrangableList({
  initialMaterials,
  onAddMaterial,
  onRemoveMaterial,
}: ClassSectionMaterialRearrangableListProps) {
  const [materials, setMaterials] = useState(initialMaterials);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(materials);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setMaterials(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='class-materials' type='material'>
        {(provided) => (
          <MaterialList ref={provided.innerRef} {...provided.droppableProps}>
            {materials.map((material, index) => (
              <Draggable
                key={material.id}
                draggableId={material.id.toString()}
                index={index}>
                {(provided, snapshot) => (
                  <MaterialContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}>
                    <Content>
                      <MaterialName>
                        {getTypeIcon(material.type)}
                        {material.material}
                      </MaterialName>
                      <MaterialMeta>
                        <TypeBadge type={material.type}>
                          {material.type}
                        </TypeBadge>
                        <span>Section ID: {material.classSectionId}</span>
                      </MaterialMeta>
                    </Content>

                    <RemoveButton
                      onClick={() => onRemoveMaterial(material.id.toString())}>
                      <Trash size={16} />
                    </RemoveButton>
                  </MaterialContainer>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </MaterialList>
        )}
      </Droppable>
    </DragDropContext>
  );
}
