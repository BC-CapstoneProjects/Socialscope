import {screen, render} from "@testing-library/react";
import '@testing-library/jest-dom';

import SearchPage from "../pages/SearchPage";
import TestWrapper from "./TestWrapper";

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () =>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:() => ({
        navigate: mockNavigate,
    })
}));

test("test platform twitter checked box ", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const twitterCheckbox = screen.getByRole("checkbox", {name: "twitter"});
    expect(twitterCheckbox).not.toBeChecked();
})
test("test platform youtube checked box ", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const twitterCheckbox = screen.getByRole("checkbox", {name: "youtube"});
    expect(twitterCheckbox).not.toBeChecked();
})
test("test platform reddit checked box ", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const twitterCheckbox = screen.getByRole("checkbox", {name: "reddit"});
    expect(twitterCheckbox).not.toBeChecked();
})
test("test results", () => {
    // const maxResult = "10";
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const value = screen.getByRole("textbox", {name: "maxResults"})
    expect(value).toHaveValue("")
});
test("test query", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const value = screen.getByRole("textbox", {name: "query"})
    expect(value).toHaveValue("")
});
test("test launch button", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const launchButton = screen.getByRole('button', { name: /Launch Search/i });
    expect(launchButton).toBeEnabled()
});
test("test reset button", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const resetButton = screen.getByRole('button', { name: /Reset Filters/i });
    expect(resetButton).toBeEnabled()
});