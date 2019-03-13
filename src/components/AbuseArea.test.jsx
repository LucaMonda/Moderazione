import React from 'react';
import {shallow} from 'enzyme';
import AbuseArea from "./AbuseArea";


describe("AbuseArea", () => {
    let props = {
        disable:null,
        sendSentence:  () => {
             jest.fn()},
        changeDisable : () => {
            jest.fn()},
        indicators: []
        }
        ;
    const enzyme = require("enzyme");
    const Adapter = require("enzyme-adapter-react-16");
    enzyme.configure({ adapter: new Adapter() });

    it("changes value of a checkbox in handleClickItem", () =>{
        let wrapper = shallow(<AbuseArea {...props}/>);
        wrapper.instance().state.items =
            [
                {
                    value: 0,
                    title: 'OSCENO',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    imageGrey: "../images/osceno/grey.svg",
                    checked: false
                },
                {
                    value: 1,
                    title: 'MINACCIA',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    imageGrey: "../images/minaccia/grey.svg",
                    checked: false
                },
                {
                    value: 2,
                    title: 'INSULTO',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    imageGrey: "../images/insulto/grey.svg",
                    checked: false
                },
                {
                    value: 3,
                    title: 'RAZZIALE',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    imageGrey: "../images/razziale/grey.svg",
                    checked: false
                }
            ];
        wrapper.setProps({ disable: false });
        wrapper.instance().handleClickItem(1);
        expect(wrapper.instance().state.items[1].checked).toEqual(true)
        wrapper.setProps({ disable: true });
        wrapper.instance().handleClickItem(2);
        expect(wrapper.instance().state.items[2].checked).toEqual(false)
        });

    it("uncheck all selected divs after click on button",() =>{
        let wrapper = shallow(<AbuseArea {...props}/>);
        wrapper.instance().state.items =
            [
                {
                    value: 0,
                    title: 'OSCENO',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    imageGrey: "../images/osceno/grey.svg",
                    checked: true
                },
                {
                    value: 1,
                    title: 'MINACCIA',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    imageGrey: "../images/minaccia/grey.svg",
                    checked: true
                },
                {
                    value: 2,
                    title: 'INSULTO',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    imageGrey: "../images/insulto/grey.svg",
                    checked: true
                },
                {
                    value: 3,
                    title: 'RAZZIALE',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    imageGrey: "../images/razziale/grey.svg",
                    checked: true
                }
            ];
        let items = wrapper.instance().sendCategories();
        items.map((item) => expect(item.checked).toEqual(false));
    });

    it("renders button correctly", () =>{
        let wrapper = shallow(<AbuseArea {...props}/>);
        wrapper.setProps({disable:true});
        expect(wrapper.find(".send-info-button").text()).toEqual("AVANTI");
        expect(wrapper.find(".send-info-button").getElement().props.disabled).toEqual(true);
        wrapper.setProps({disable:false});
        expect(wrapper.find(".send-info-button").getElement().props.disabled).toEqual(false);
    })

    it("handleKeyboardEvent",() =>{
        let wrapper = shallow(<AbuseArea {...props}/>);
        let key=1;
        let spy = spyOn(wrapper.instance(),"handleClickItem");
        let spy2 = spyOn(wrapper.instance(),"sendCategories");
        wrapper.instance().handleKeyboardEvent(key);
        expect(spy).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
        spy.calls.reset();
        key="enter";
        wrapper.instance().handleKeyboardEvent(key);
        expect(spy).not.toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    })
});
