import faker from "faker";

import { patchFake } from "../../src/patch/faker";

describe("Parsing Faker.js namespace", () => {
  let fake;

  beforeAll(() => {
    fake = patchFake(faker);
  });

  test("When a namespace has no method should throw an error", () => {
    expect(() => {
      fake("{{namespaceWithNoMethod}}");
    }).toThrow(/namespaceWithNoMethod/);
  });

  test("When a namespace has an empty method name should throw an error", () => {
    expect(() => {
      fake("{{namespaceWithEmptyMethod.}}");
    }).toThrow(/namespaceWithEmptyMethod/);
  });

  test("When a namespace has a module not defined in Faker.js should throw an error", () => {
    expect(() => {
      fake("{{notDefinedModule.animals}}");
    }).toThrow(/notDefinedModule/);
  });

  test("When a namespace has a method not undefined in a Faker.js should throw an error", () => {
    expect(() => {
      fake("{{image.notDefinedMethod}}");
    }).toThrow(/notDefinedMethod/);
  });

  test("When a namespace is defined in Faker.js should return an interpolated string", () => {
    const input = "{{image.animals}}";
    expect(fake(input)).toEqual(faker.fake(input));
  });

  test("When more than one namespaces are defined should return an interpolated string", () => {
    const input = "{{image.animals}} and {{image.animals}}";
    expect(fake(input)).toEqual(faker.fake(input));
  });

  test("When a method is called with a single parameter should return an interpolated string", () => {
    const input = '{{helpers.replaceSymbolWithNumber("#-#")}}';
    expect(fake(input)).toMatch(/^\d-\d$/);
  });

  test("When a method is called with multiple parameters should return aninterpolated string", () => {
    const input = '{{helpers.replaceSymbolWithNumber("?-?", "?")}}';
    expect(fake(input)).toMatch(/^\d-\d$/);
  });
});

describe("Extending Faker.js namespace syntax", () => {
  let fake;
  let fakerOutput;

  beforeAll(() => {
    fake = patchFake(faker);
    fakerOutput = faker.fake("{{image.animals}}");
  });

  test("Parsing an empty string should return an empty string", () => {
    expect(fake("")).toEqual("");
  });

  test("Parsing a blank string should return an empty string", () => {
    expect(fake(" ")).toEqual("");
  });

  test("Parsing an empty formatted string should return an empty string", () => {
    expect(fake("{{}}")).toEqual("");
  });

  test("Parsing a blank formatted string should return an empty string", () => {
    expect(fake("{{ }}")).toEqual("");
  });

  test("Parsing a namespace with spaces should return an interpolated string", () => {
    expect(fake("{{image . animals}}")).toEqual(fakerOutput);
  });

  test("Parsing a namespace with spaces before the opening brace should return an interpolated string", () => {
    expect(fake("{{image.animals ()}}")).toEqual(fakerOutput);
  });

  test("Parsing a namespace with spaces after and before mustaches should return an interpolated string", () => {
    expect(fake("{{ image.animals }}")).toEqual(faker.fake(fakerOutput));
  });

  test("Parsing a namespace with line breaks should return an interpolated string", () => {
    expect(fake("{{\r\nimage\r\n.\r\nanimals\r\n(\r\n)\r\n}}")).toEqual(
      fakerOutput
    );
  });

  test("When a method is called with empty parameters should return an interpolated string", () => {
    expect(fake("{{image.animals()}}")).toEqual(fakerOutput);
  });
});
