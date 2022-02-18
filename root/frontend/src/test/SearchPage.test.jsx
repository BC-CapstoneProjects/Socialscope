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

test("test platform checked box ", () => {
    render(<TestWrapper><SearchPage/></TestWrapper>);
    const twitterCheckbox = screen.getByRole("checkbox", {name: "twitter"});
    expect(twitterCheckbox).not.toBeChecked();
})