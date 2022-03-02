import {screen, render, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
import TestWrapper from "./TestWrapper";
import TitleSection from "../components/LandingIntro/TitleSection";

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () =>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:() => ({
        navigate: mockNavigate,
    })
}));
test("test title on Landing Page ", () => {
    render(<TestWrapper><TitleSection/></TestWrapper>);
    const title = screen.getByText("Head Title");
    expect(title).toHaveTextContent("Head Title");
})
test("test subtitle on Landing Page ", () => {
    render(<TestWrapper><TitleSection/></TestWrapper>);
    const title = screen.getByText("Subheading tagline that is a bit longer");
    expect(title).toHaveTextContent("Subheading tagline that is a bit longer");
})