import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indecision component", () => {
  let wrapper;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
  });

  test("debe hacer match con la SnapShot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("No debe ejecutarse el getAnswer si el input no tiene un símbolo de interrogación (?)", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");

    await input.setValue("¿Seré millonario");
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test("Debe ejecutarse el getAnswer si el input tiene un símbolo de interrogación (?)", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");

    await input.setValue("¿Seré millonario?");
    expect(getAnswerSpy).toHaveReturnedTimes(1);
  });

  test("Debe validar el Fetch API", async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find("img");

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("YES");
  });

  test("Debe validar un fallo de la fetch API", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("Error API!"));

    await wrapper.vm.getAnswer();
    const img = wrapper.find('img');

    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("Fallo en al API");
  })
});
