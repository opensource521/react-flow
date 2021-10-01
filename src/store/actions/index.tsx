import { createAction } from "redux-actions";

/**
 * Constants
 */
export const SET_MODULES = "SET_MODULES";

export const SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT";

export const SET_FLOW_ELEMENT = "SET_FLOW_ELEMENT";

export const SET_PROPERTIES_VALUES = "SET_PROPERTIES_VALUES";

export const SET_MODAL_OPEN = "SET_MODAL_OPEN";

export const SET_MODAL_TYPE = "SET_MODAL_TYPE";

export const SET_DROP_MODULE = "SET_DROP_MODULE";

export const SET_DROPPED_MODULE = "SET_DROPPED_MODULE";

/**
 * Actions
 */
export const setModules = createAction(SET_MODULES);

export const setSelectedElement = createAction(SET_SELECTED_ELEMENT);

export const setFlowElement = createAction(SET_FLOW_ELEMENT);

export const setPropertiesValues = createAction(SET_PROPERTIES_VALUES);

export const setModalOpen = createAction(SET_MODAL_OPEN);

export const setModalType = createAction(SET_MODAL_TYPE);

export const setDropModule = createAction(SET_DROP_MODULE);

export const setDroppedModule = createAction(SET_DROPPED_MODULE);
