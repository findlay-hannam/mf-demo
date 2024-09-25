import { useEffect } from 'react'
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";
import './App.css'

const reducer = {
  secretState: () => ({ foo: 'bar' }),
};
const store = configureStore({ reducer });
type RootState = ReturnType<typeof store["getState"]>;

function BaseComponent() {
  const foo = useSelector((state: RootState) => state.secretState.foo);
  return (
    <div>
      <h1>This is the base component. This hosts the actual business logic and connects to my private store.</h1>
      Behold!!! {foo}
    </div>
  );
}

function bootstrapBaseComponent() {
  const element = document.getElementById("main-component");
  if (!element) {
    console.error("Element not found");
    return;
  }
  const root = createRoot(element);
  root.render(
    <Provider store={store}>
      <BaseComponent />
    </Provider>,
  );
}

function importScriptFromStaticAssets() {
  // All code before this point will be transpiled into a bundle and imported with a <script> tag.
  // This function simulates the loading of said bundle.
  window.bootstrapBaseComponent = bootstrapBaseComponent;
}

importScriptFromStaticAssets();

function Wrapper() {
  useEffect(() => {
    window.bootstrapBaseComponent();
  });

  return (
    <div id="main-component" />
  );
}

export default Wrapper
