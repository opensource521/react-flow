import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import {
  setModalOpen,
  setPropertiesValues,
  setSelectedElement,
} from "../../store/actions";
import {
  selectModalType,
  selectProperties,
  selectPropertiesValues,
} from "../../store/selectors";

const ModalContent: React.FC = () => {
  const [fields, setFields] = useState<any>({});

  const modalType = useSelector(selectModalType);
  const propertiesValues = useSelector(selectPropertiesValues);
  const properties = useSelector(selectProperties);

  const dispatch = useDispatch();

  const setFieldValues = (evt: any, property: string) => {
    if (modalType === "edit") {
      dispatch(
        setPropertiesValues({
          ...propertiesValues,
          [property]: evt.target.value,
        })
      );
    } else {
      setFields({ ...fields, [property]: evt.target.value });
    }
  };

  const setPropertiesValue = () => {
    const newProperties = properties.map((prop: any) => ({
      ...prop,
      value: fields[prop.property],
    }));
    dispatch(setPropertiesValues(fields));
    dispatch(setSelectedElement(newProperties));
    dispatch(setModalOpen(false));
  };

  const setPropertiesEditValue = () => {
    const newProperties = properties.map((prop: any) => ({
      ...prop,
      value: propertiesValues[prop.property],
    }));
    dispatch(setPropertiesValues(propertiesValues));
    dispatch(setSelectedElement(newProperties));
    dispatch(setModalOpen(false));
  };

  return (
    <div className="properties">
      {properties &&
        properties.map((prop: any, index: number) => (
          <Fragment key={index}>
            {prop.forceLinebreak && prop.forceLinebreak && (
              <div className="break" />
            )}
            <div
              className={classNames("property", {
                half: prop.width === "half",
                full: prop.width === "full" || !prop.width,
                quarter: prop.width === "quarter",
              })}
            >
              <label className="label">{prop.title}</label>
              <br />

              <input
                type="text"
                className="form-input full"
                defaultValue={prop.value ?? ""}
                onChange={(evt) => setFieldValues(evt, prop.property)}
              />
            </div>
          </Fragment>
        ))}
      <button
        className="btn-save"
        onClick={
          modalType === "edit" ? setPropertiesEditValue : setPropertiesValue
        }
      >
        Save
      </button>
    </div>
  );
};

export default ModalContent;
