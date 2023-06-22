import React from 'react'
import renderer from 'react-test-renderer'
import AnimauxForm from '../../app/AnimauxForm'
import {render, fireEvent} from '@testing-library/react-native'
import { Text } from '../Themed';

test('renders correctly', () => {
    const instance = renderer.create(<AnimauxForm />).root;
    expect(instance).toMatchSnapshot();
});

test('Compare text getByType', () => {
    const instance = renderer.create(<AnimauxForm />).root;
    const text = "Animaux form";
    const instance2 = renderer.create(<Text>{text}</Text>).root;
    const element = instance.findByType(Text);
    const element2 = instance2.findByType(Text);
    expect(element.props.children).toEqual(element2.props.children);
});

test('Check input write', () => {
    const instance = render(<AnimauxForm />);
    const element = instance.getByTestId('inputid');
    fireEvent.changeText(element, 'test');
    expect(element.props.value).toBe('test');   
});

test('Check button tap', () => {
    const instance = render(<AnimauxForm />);
    const element = instance.getByTestId('boutonid');
    fireEvent.press(element);
});
