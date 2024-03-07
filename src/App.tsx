import React, { useRef, useState } from "react";
import Sheet, { SheetRef } from "./lib";
import { Routes, Route} from "react-router-dom";
import FirstSolution from "./worst"
import SecondSolution from "./child-componets"
import LazyLoading from "./lazyloading"
import ContextSolution from "./context"
const createData = () => {
  const val: any[][] = [];
  for (let i = 0; i < (2000) ; i++) {
    val.push(
      Array.from({ length: 60 }, () => ({
        value: Math.floor(Math.random() * 10),
      }))
    );
  }
  return val;
};
function App() {
  const [state] = useState<any[][]>(createData());
  const childRef = useRef<SheetRef>(null);
  const onChange = (i: number, j: number, value: string) => {
    //Do not try to update state with this action, it will slow down your application
    console.log(`Value Updated at ${i}, ${j}`, value);
  };
  const getData = () => {
    console.log("Updated Data", childRef?.current?.getData()); //Data will be printed in console
  };
  const exportCSV = () => {
    childRef?.current?.exportCsv("myCsvFile");
  };
  return (
    <div>
      <div>
        <button data-testid="get-updated-data" onClick={getData}>
          Get Updated data
        </button>{" "}
        <button data-testid="csv-export" onClick={exportCSV}>
          Export CSV data
        </button>
      </div>
      <br />
      <div>
        <Routes>
          <Route
            path="worst"
            element={
              <FirstSolution data={state} onChange={onChange} ref={childRef} />
            }
          />
          <Route
            path="child-components"
            element={
              <SecondSolution data={state} onChange={onChange} ref={childRef} />
            }
          />
          <Route
            path="lazy-loading"
            element={
              <LazyLoading data={state} onChange={onChange} ref={childRef} />
            }
          />
          <Route
            path="context"
            element={
              <ContextSolution
                data={state}
                onChange={onChange}
                ref={childRef}
              />
            }
          />
          <Route
            path="/best"
            element={<Sheet data={state} onChange={onChange} ref={childRef} />}
          />
        </Routes>{" "}
      </div>
    </div>
  );
}

export default App;
