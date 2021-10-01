import {
  SET_MODULES,
  SET_SELECTED_ELEMENT,
  SET_MODAL_OPEN,
  SET_PROPERTIES_VALUES,
  SET_MODAL_TYPE,
  SET_DROP_MODULE,
  SET_DROPPED_MODULE,
} from "../actions";
import { ModuleState, Action } from "../../types";

const initialState: ModuleState = {
  modules: [],
  lookups: [],
  selectedModuleProperties: [],
  propertiesValues: [],
  modalOpen: false,
  modalType: "",
  draggedModule: {},
  droppedModule: {},
};

export function reducer(
  state: ModuleState = initialState,
  { type, payload }: Action
): ModuleState {
  switch (type) {
    case SET_MODULES:
      return {
        ...state,
        ...payload,
      };
    case SET_SELECTED_ELEMENT:
      return {
        ...state,
        selectedModuleProperties: payload,
      };
    case SET_PROPERTIES_VALUES:
      return {
        ...state,
        propertiesValues: payload,
      };
    case SET_MODAL_OPEN:
      return {
        ...state,
        modalOpen: payload,
      };
    case SET_MODAL_TYPE:
      return {
        ...state,
        modalType: payload,
      };
    case SET_DROP_MODULE:
      return {
        ...state,
        draggedModule: payload,
      };
    case SET_DROPPED_MODULE:
      return {
        ...state,
        droppedModule: payload,
      };
    default:
      return state;
  }
}
