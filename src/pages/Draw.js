import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import useGoJS from "./useGoJS";
import SelectToggle from "../components/SelectToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/Node";
import { useLocation } from "react-router-dom";

// 페이지
import useReadJSON from "./useReadJSON";
import Button from "./Button.js";
import Palette from "../components/Palette";
import "../styles/Draw.css";

function Draw() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop
    ? "palette-component"
    : "palette-component-small";
  const diagramClassName = isDesktopOrLaptop
    ? "diagram-component"
    : "diagram-component-small";

  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.

  const { initDiagram, diagram, showSelectToggle } =
    useGoJS(setSelectedNodeData);

  console.log("show", showSelectToggle.value);
  // Go to Draw page 완료
  const location = useLocation();
  //console.log("location_path",location.state);
  const file = location?.state;

  const handleNodeSelect = useCallback(
    (label) => {
      if (diagram) {
        const selectedNode = diagram.selection.first();
        if (selectedNode instanceof go.Node) {
          //const updatedData = { ...selectedNode.data, text: label };
          diagram.model.commit((model) => {
            model.set(selectedNode.data, "text", label);
          }, "updated text");
        }
      }
      setSelectedNodeData(label);
    },
    [diagram]
  );
  useReadJSON(file, diagram);

  return (
    <div>
      <div className="Draw">
        <div className="container">
          <Button diagram={diagram} />
          <div className="createspace">
            <div className="workspace">
              <div className="palette">
                <Palette
                  nodeDataArray={nodeDataArrayPalette}
                  divClassName={paletteClassName}
                />
              </div>

              <div className="diagram">
                {showSelectToggle.value && (
                  <SelectToggle
                    value={selectedNodeData}
                    uniquekey={showSelectToggle.key}
                    onToggleSelect={handleNodeSelect}
                    readOnly
                  />
                )}
                <ReactDiagram
                  initDiagram={initDiagram}
                  divClassName={diagramClassName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draw;
