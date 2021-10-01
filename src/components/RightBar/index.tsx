import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalOpen,
  setModalType,
  setSelectedElement,
} from "../../store/actions";
import {
  selectProperties,
  selectPropertiesValues,
} from "../../store/selectors";

const RightBar: React.FC = () => {
  const properties = useSelector(selectProperties);
  const propertiesValues = useSelector(selectPropertiesValues);

  const dispatch = useDispatch();

  const setValues = () => {
    dispatch(setModalType("edit"));
    dispatch(setModalOpen(true));

    const newProperties = properties.map((prop: any) => ({
      ...prop,
      value: propertiesValues[prop.property],
    }));

    dispatch(setSelectedElement(newProperties));
  };

  return (
    <div className="right-bar">
      <div className="right-bar-heading">
        <h3>Properties</h3>
      </div>
      <br />
      {properties && Object.keys(properties).length > 0 && (
        <div className="section-btn-show">
          <button onClick={() => setValues()} className="btn-show">
            Edit
          </button>
        </div>
      )}
      <br />
      <div className="property-section">
        {properties && Object.keys(properties).length > 0 ? (
          properties.map((prop: any, index: number) => (
            <div className="property-block" key={index}>
              <div className="left-block">
                <h3>{prop.title}</h3>
              </div>
              <div className="right-block">
                <h3>{prop.value ? prop.value.substring(0, 15) : null}</h3>
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ textAlign: "center" }}>No properties here</h3>
        )}
      </div>
    </div>
  );
};

export default RightBar;
