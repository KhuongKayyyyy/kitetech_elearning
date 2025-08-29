import { API_CONFIG } from "@/constants/api_config";
import axiosClient from "../client/axios_client";

export const classSectionMaterialRepository = {
  getClassSectionMaterials: (id: string) =>
    axiosClient.get(API_CONFIG.GET_CLASS_POST(id)),
  createClassSectionMaterial: (id: string, formData: FormData) =>
    axiosClient.post(API_CONFIG.CREATE_CLASS_SECTION_MATERIAL(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getClassSectionFiles: (id: string) =>
    axiosClient.get(API_CONFIG.GET_CLASS_FILES(id)),

  getMaterialDetail: (id: string, materialId: string) => {
    const url = API_CONFIG.GET_MATERIAL_DETAIL(id, materialId);
    console.log("🔗 getMaterialDetail URL:", url);
    return axiosClient.get(url);
  },
};
