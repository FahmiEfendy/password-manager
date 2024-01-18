import React from "react";

import { RouterProvider } from "react-router-dom";

function App({ router }) {
  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>
    </React.Fragment>
  );
}

export default App;
