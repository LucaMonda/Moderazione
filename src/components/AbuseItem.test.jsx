import React from 'react';
import {shallow} from 'enzyme';
import AbuseItem from "./AbuseItem";


describe("AbuseItem", () => {
    let props = {
        title: "insulto",
        desc: "descrizione"
    };
    const enzyme = require("enzyme");
    const Adapter = require("enzyme-adapter-react-16");
    enzyme.configure({ adapter: new Adapter() });

    it("renders different image based on selection", () =>{
        let wrapper = shallow(<AbuseItem {...props}/>);
        let image = wrapper.instance().getImageByCheckedValue(false);
        expect(image.default).toEqual("grey.svg")
        image = wrapper.instance().getImageByCheckedValue(true);
        expect(image.default).toEqual("blue.svg")
    });

    it("assigns correct value to component", () => {
        let wrapper = shallow(<AbuseItem {...props}/>);
        expect(wrapper.find(".title-label").text()).toEqual(props.title);
        expect(wrapper.find(".content-label").text()).toEqual(props.desc);

    })
});
