import { render, screen } from "@testing-library/react";
import React from "react";
import { Header } from "./Header";

// テスト対象のReactコンポーネント

test("ページ中に「test」が表示される。", () => {
	render(<Header />);
	expect(screen.getByText("test")).toBeVisible();
});
