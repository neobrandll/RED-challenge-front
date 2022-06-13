import React from "react";
import { render } from "@testing-library/react";
import Modal from ".";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { IModalProps } from "./modal-types";
import { Provider } from "react-redux";
import store from "../../store/store";

const defaultProps: IModalProps = {
  modal: {
    open: false,
    title: "",
  },
};

const renderComponent = (props: IModalProps) =>
  render(
    <Provider store={store}>
      <Modal {...defaultProps} {...props} />
    </Provider>
  );

describe("modal component", () => {
  it("Renders component", () => {
    const { container } = renderComponent({
      modal: { open: true, title: "Delete" },
    });
    expect(container.querySelector("#transition-modal-title")).toBeTruthy();
  });
  it("Renders title", () => {
    const { container } = renderComponent({
      modal: { open: true, title: "Delete" },
    });
    expect(container.querySelector("h2")).toHaveTextContent("Delete");
  });
  it("Renders Buttons", () => {
    const { container } = renderComponent({
      modal: { open: true, title: "Delete" },
    });
    expect(container.querySelectorAll("button")).toHaveLength(2);
  });
  it("Should hide Modal", () => {
    const { container } = renderComponent({
      modal: { open: true, title: "Delete" },
    });
    userEvent.click(container.querySelector("button") as HTMLButtonElement);
    expect(container).toBeFalsy();
  });
});
