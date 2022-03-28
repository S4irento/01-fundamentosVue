import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter';

describe('Counter Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  })

  test('Debe hacer match con la snapshot', () =>{
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Debe recibir Counter en la etiqueta p', () =>{
    const p = wrapper.find('h3');
    expect(p.text()).toBe('Counter');
  })

  test('Debe incrementar en 1 el contador', async () => {
    const increaseBtn = wrapper.find('button')
    await increaseBtn.trigger('click');
    const value = wrapper.find('p').text();
    expect(value).toBe('1');
  })

  test('Debe decrementar en 1 el contador pero no puede quedar con numeros negativos', async() => {
    const decreaseBtn = wrapper.find('button:last-child');
    await decreaseBtn.trigger('click');
    const value = wrapper.find('p').text();
    expect(value).toBe('0');
  })

  test('Debe establecer un valor por defecto en 10 y probar que decremente en 9', async () => {
    const wrapper = shallowMount(Counter,{
      props: {
        start: 10
      }
    });
    const decreaseBtn = wrapper.find('button:last-child');
    await decreaseBtn.trigger('click');
    const value = wrapper.find('p').text();
    expect(value).toBe('9');
  })
})