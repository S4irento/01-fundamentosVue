import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter';

describe('Counter Component', () => {
  test('Debe hacer match con la snapshot', () =>{
    const wrapper = shallowMount(Counter);

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Debe recibir Counter en la etiqueta p', () =>{
    const wrapper = shallowMount(Counter);

    const p = wrapper.find('h3');

    expect(p.text()).toBe('Counter');
  })
})