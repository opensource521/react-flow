import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDropModule } from "../../store/actions";
import { selectModules } from "../../store/selectors";

const LeftBar: React.FC = () => {
  const modules = useSelector(selectModules);
  const dispatch = useDispatch();

  const dragStartProcess = (module: any) => {
    dispatch(setDropModule(module));
  };

  return (
    <div className="left-bar">
      <div className="left-bar-heading">
        <h3>Toolbox</h3>
      </div>
      <br />
      <div className="block-section">
        {modules.map((module: any) => (
          <div
            className="block"
            key={module.id}
            data-id="1"
            draggable
            onDragStart={() => dragStartProcess(module)}
          >
            <div className="block-heading">{module.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
