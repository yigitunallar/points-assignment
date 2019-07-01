import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from './Form'
configure({ adapter: new Adapter() });

describe("Form", () => {
    let wrapper;
    let mockSubmit;

    beforeEach(() => {
        mockSubmit = jest.fn();
        wrapper = shallow(<Form submit={mockSubmit} />);
    });

    it("should match the snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
})