import {screen, render, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';

import SearchPage from "../pages/SearchPage";
import TestWrapper from "./TestWrapper";
import userEvent from "@testing-library/user-event";

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
test("check the query value", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const checkInput = screen.getByRole("textbox", {name: "query"})
    fireEvent.change(checkInput, {target: {value: "hello"}})
    expect(checkInput).toHaveValue("hello")
})
test("check the max value", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const checkInput = screen.getByRole("textbox", {name: "maxResults"})
    fireEvent.change(checkInput, {target: {value: "100"}})
    expect(checkInput).toHaveValue("100")
})
test("check twitter check box state", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const twitterCheckbox = screen.getByRole("checkbox", {name: "twitter"});
    userEvent.click(twitterCheckbox)
    expect(twitterCheckbox).toBeChecked()
})
test("check youtube check box state", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const youtubeCheckbox = screen.getByRole("checkbox", {name: "youtube"});
    userEvent.click(youtubeCheckbox)
    expect(youtubeCheckbox).toBeChecked()
})
test("check reddit check box state", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const redditCheckbox = screen.getByRole("checkbox", {name: "reddit"});
    userEvent.click(redditCheckbox)
    expect(redditCheckbox).toBeChecked()
})
test("check start date initial value", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const start = screen.getByLabelText('startDate');
    expect(start).toHaveValue("")
})
test("check end date initial value", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const end = screen.getByLabelText('endDate');
    expect(end).toHaveValue("")
})
