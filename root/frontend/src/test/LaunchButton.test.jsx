import {screen, render, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
import LaunchButton from "../components/LandingIntro/LaunchButton";
import TestWrapper from "./TestWrapper";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () =>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:() => ({
        navigate: mockNavigate,
    })
}));

test("test start here button ", () => {
    render(<TestWrapper><LaunchButton/></TestWrapper>);
    const startHere = screen.getByText("Start Here")
    expect(startHere).toBeEnabled()
})