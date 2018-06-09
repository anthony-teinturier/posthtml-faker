// Expose the Faker.js module as a map.
export interface IFaker {
  [key: string]: { [key: string]: () => any };
}
// Faker.js module methodes.
export function fake(str: string): string;
