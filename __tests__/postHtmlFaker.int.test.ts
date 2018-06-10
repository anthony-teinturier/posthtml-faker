import faker from "faker";
import posthtml from "posthtml";

import { postHtmlFaker } from "../src/postHtmlFaker";

describe("Generating fake data from HTML", () => {
  const fakerInput = "{{image.animals}}";
  const fakerOutput = faker.fake(fakerInput);

  let engine;

  beforeAll(() => {
    engine = posthtml([postHtmlFaker()]);
  });

  test("When a fake element is empty should return an empty string", async () => {
    const input = "<fake></fake>";
    const output = await engine.process(input);
    return expect(output.html).toEqual("");
  });

  test("When a fake element has a child element should return the child element", async () => {
    const input = "<fake><em>foo</em></fake>";
    const output = await engine.process(input);
    return expect(output.html).toEqual("<em>foo</em>");
  });

  test("When a fake element has a non formatted string should return the non formatted string", async () => {
    const input = "<fake>foo</fake>";
    const output = await engine.process(input);
    return expect(output.html).toEqual("foo");
  });

  test("When a fake element has a formatted string should return an interpolated string", async () => {
    const input = `<fake>${fakerInput}</fake>`;
    const output = await engine.process(input);
    return expect(output.html).toEqual(fakerOutput);
  });

  test("When a fake element has a formatted string as the content of a child element should return the child element with its content interpolated", async () => {
    const input = `<fake><a href="#">${fakerInput}</a></fake>`;
    const output = await engine.process(input);
    return expect(output.html).toEqual(`<a href="#">${fakerOutput}</a>`);
  });

  test("When a fake element has a formatted string as a parameter of a child element should return the child element with the parameter interpolated", async () => {
    const input = `<fake><a href="${fakerInput}"></a></fake>`;
    const output = await engine.process(input);
    return expect(output.html).toEqual(`<a href="${fakerOutput}"></a>`);
  });

  test("When a fake element include inner fake elements should return an interpolated string", async () => {
    const input = `<fake>{<fake>[<fake>${fakerInput}</fake>]</fake>}</fake>`;
    const output = await engine.process(input);
    return expect(output.html).toEqual(`{[${fakerOutput}]}`);
  });
});

describe("Generating fake data from HTML with user configuration", () => {
  let engine;

  beforeAll(() => {
    engine = posthtml([postHtmlFaker({ locale: "fr" })]);
  });

  test("When a user configuration defines a locale should return a interpolated string in the defined locale", async () => {
    const input = "<fake>{{address.zipCode}}</fake>";
    const output = await engine.process(input);
    return expect(output.html).toHaveLength(5);
  });
});
