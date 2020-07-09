import React from "react";
import { SmileOutlined } from "@ant-design/icons";

export const customRenderEmpty = () => (
  <div style={{ textAlign: "center" }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p> DATA EMPTY</p>
  </div>
);
