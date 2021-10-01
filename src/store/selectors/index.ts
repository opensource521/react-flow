import { get } from "lodash";
import { ModuleState } from "../../types";

export const selectModules = (state: ModuleState) =>
  get(state, "modules.modules");

export const selectProperties = (state: ModuleState) =>
  get(state, "modules.selectedModuleProperties");

export const selectPropertiesValues = (state: ModuleState) =>
  get(state, "modules.propertiesValues");

export const selectModalOpen = (state: ModuleState) =>
  get(state, "modules.modalOpen");

export const selectModalType = (state: ModuleState) =>
  get(state, "modules.modalType");

export const selectDraggedModule = (state: ModuleState) =>
  get(state, "modules.draggedModule");

export const selectDroppedModule = (state: ModuleState) =>
  get(state, "modules.droppedModule");
