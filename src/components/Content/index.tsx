import React, { useEffect, useRef, useState } from "react";
import ReactFlow, { addEdge } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import {
  setDroppedModule,
  setFlowElement,
  setModalOpen,
  setSelectedElement,
} from "../../store/actions";
import {
  selectDraggedModule,
  selectDroppedModule,
  selectModalOpen,
  selectModules,
  selectPropertiesValues,
} from "../../store/selectors";

const LINE_STYLE = { stroke: "#dee", strokeWidth: 2 };

const Content: React.FC = () => {
  const targetRef = useRef<any>();
  const [elements, setElements] = useState<any>([]);
  const [lineSetup, setLineSetup] = useState(false);

  const modules = useSelector(selectModules);
  const modalOpen = useSelector(selectModalOpen);
  const draggedModule = useSelector(selectDraggedModule);
  const droppedModule = useSelector(selectDroppedModule);
  const propertiesValues = useSelector(selectPropertiesValues);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!lineSetup)
      setElements((currentElements: any) => {
        const newElements = [...currentElements];
        const hasDuplicate =
          newElements.filter(
            (currentElement: any) =>
              currentElement.data.label === droppedModule.name
          ).length > 0;

        if (!hasDuplicate && Object.keys(droppedModule).length > 0) {
          return newElements.concat({
            id: (newElements.length + 1).toString(),
            data: {
              label: droppedModule.name,
              id: droppedModule.id,
            },
            position: {
              x: Math.random() * targetRef.current.offsetWidth,
              y: Math.random() * targetRef.current.offsetHeight,
            },
          });
        }

        return newElements;
      });
  }, [droppedModule, lineSetup]);

  useEffect(() => {
    dispatch(setFlowElement(elements));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onDragOver = (event: any) => {
    event.preventDefault();
  };

  const onDrop = (event: any) => {
    event.preventDefault();
    dispatch(setDroppedModule(draggedModule));
  };

  const onElementClick = (_: any, element: any) => {
    modules.forEach((module: any) => {
      if (module.id === element.data.id) {
        if (module.properties) {
          const newProperties = module.properties.map((prop: any) => ({
            ...prop,
            value: propertiesValues[prop.property],
          }));
          dispatch(setSelectedElement(newProperties));
        } else {
          dispatch(setSelectedElement([]));
        }

        if (module.properties && module.properties.length > 0) {
          dispatch(setModalOpen(true));
        }
      }
    });
  };

  const onConnect = (params: any) => {
    const source = elements.find((elem: any) => elem.id === params.source);
    const target = elements.find((elem: any) => elem.id === params.target);

    const sourceModule = modules.find(
      (module: any) => module.id === source.data.id
    );
    const targetModule = modules.find(
      (module: any) => module.id === target.data.id
    );

    if (
      sourceModule.hasOwnProperty("inputs") ||
      sourceModule.hasOwnProperty("outputs")
    ) {
      if (
        (sourceModule.inputs &&
          sourceModule.inputs.includes(targetModule.id)) ||
        (sourceModule.outputs && sourceModule.outputs.includes(targetModule.id))
      ) {
        setElements((e: any) => addEdge(params, e));
        setLineSetup(true);
      }
    } else if (
      targetModule.hasOwnProperty("inputs") ||
      targetModule.hasOwnProperty("outputs")
    ) {
      if (
        (targetModule.inputs &&
          targetModule.inputs.includes(sourceModule.id)) ||
        (targetModule.outputs && targetModule.outputs.includes(sourceModule.id))
      ) {
        setElements((e: any) => addEdge(params, e));
        setLineSetup(true);
      }
    }
  };

  return (
    <div
      className={modalOpen ? "content hidden" : "content"}
      ref={targetRef}
      style={{ height: "80vh" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {elements.length > 0 && (
        <ReactFlow
          elements={elements}
          connectionLineStyle={LINE_STYLE}
          snapGrid={[20, 20]}
          snapToGrid
          onConnect={onConnect}
          onElementClick={onElementClick}
        />
      )}
    </div>
  );
};

export default Content;
