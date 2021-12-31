import React, { useEffect, useState } from "react";

import styled from "styled-components";

const TestComponent = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
`;

const Parent = () => {
  const [mounted, setMounted] = useState(true);
  return (
    <div>
      Parent:
      <button onClick={() => setMounted(!mounted)}>
        {mounted ? "Unmount" : "Mount"} Child
      </button>
      {mounted && <Child />}
      <p>
        Unmount Child, while it is still loading. It won't set state later on,
        so no error is triggered.
      </p>
    </div>
  );
};

const Child = () => {
  const [state, setState] = useState("loading (4 sec)...");
  useEffect(() => {
    let isMounted = true;
    fetchData();
    return () => {
      isMounted = false;
    };

    // simulate some Web API fetching
    function fetchData() {
      setTimeout(() => {
        // drop "if (isMounted)" to trigger error again
        // (take IDE, doesn't work with stack snippet)
        if (isMounted) setState("data fetched");
        else console.log("aborted setState on unmounted component");
      }, 4000);
    }
  }, []);

  return <div>Child: {state}</div>;
};

const CodePlayground = () => {
  return (
    <div>
        <TestComponent>
          <Parent></Parent>
        </TestComponent>
        <TestComponent>
          <h1>Test</h1>
        </TestComponent>
    </div>
  );
};

export default CodePlayground;
