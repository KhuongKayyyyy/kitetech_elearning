import { ClassAssignmentEnum } from "../enum/ClassAssignmentEnum";
import { classSectionMaterialRepository } from "../respository/classSectionMaterialRepository";


export const classSectionMaterialService = {
  getClassSectionMaterials: async (id: string) => {
    try {
      const response = await classSectionMaterialRepository.getClassSectionMaterials(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching class section materials:", error);
      throw error;
    }
  },

  createClassSectionMaterial: async (
    classroomId: string,
    materialData: {
      title: string;
      description?: string;
      file?: File;
      link?: string;
      deadline?: string;
      type: ClassAssignmentEnum;
      classSectionId: string;
    }
  ) => {
    try {
      const formData = new FormData();
      // API expects classroom in path and classSectionId in body
      formData.append("classSectionId", materialData.classSectionId);
      formData.append("material", materialData.title);
      formData.append("type", materialData.type);
      // 'content' carries either link URL (for link) or description text
      if (materialData.type === ClassAssignmentEnum.LINK && materialData.link) {
        formData.append("content", materialData.link);
      } else if (materialData.description) {
        formData.append("content", materialData.description);
      }
      if (materialData.deadline) formData.append("deadline", materialData.deadline);
      if (materialData.file) formData.append("file", materialData.file);

      const response =
        await classSectionMaterialRepository.createClassSectionMaterial(
          classroomId,
          formData
        );

      return response.data;
    } catch (error) {
      console.error("Error creating class section material:", error);
      throw error;
    }
  },

  getClassSectionFiles: async (id: string) => {
    try {
      const response = await classSectionMaterialRepository.getClassSectionFiles(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching class section files:", error);
      throw error;
    }
  },
};