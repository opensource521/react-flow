export interface ModuleState {
  modules: Array<any>;
  lookups: Array<any>;
  selectedModuleProperties: string[];
  propertiesValues: string[];
  modalOpen: boolean;
  modalType: string;
  draggedModule: any;
  droppedModule: any;
}

export interface Action {
  type: string;
  payload: any;
}
