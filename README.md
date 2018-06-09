# PostHTML-Faker

[PostHTML-Faker] is a plugin for [PostHTML] that let you use [Faker.js] features to generate fake data in your HTML documents.

## Usage

Fake data must be delimited by the custom `<fake>` and `</fake>` tags. Within those tags a generator method is used for combining the [Faker.js API] methods using a _mustache formatted string_.

```html
<fake>Hello {{name.firstName}}!</fake>
```

Within the `<fake>` tags, _any mustache formatted strings_ will be interpolated.

```html
<fake>{{name.firstName}} - {{name.lastName}}</fake>
```

Mustache formatted strings can be defined _anywhere_ within the `<fake>` and `</fake>` tags.

```html
<fake>
  <img src="{{image.avatar}}">
  <a href="#">{{name.firstName}}-{{name.lastName}}</a>
</fake>
```

### Mustache Formatted Strings Validation

**All function arguments** within a _mustache formatted strings_ **must be defined** as valid [JSON data types] (e.g., strings and object keys must be written in double quotes).

```html
<p>
  <fake>{{lorem.paragraphs(3, "</p><p>")}}</fake>
</p>
```

JSON data types can be one of the following types:

- The `null` literal.
- A `boolean` literal.
- A `number` literal, integer or decimal.
- A double quoted `string` literal.
- An `array` literal as `[ value ... ]`.
- A JSON `object` literal as `{ "key": value ... }`.

## Install

Add [PostHTML] and [PostHTML-Faker] to your build tool:

```bash
npm install posthtml posthtml-faker --save-dev
```

Enable this plugin as a standard [PostHTML] plugin:

```js
posthtml([
  require("posthtml-faker")({
    /* options */
  })
]).process(...);
```

### Options

| Name     | Type     | Default | Description                |
| :------- | :------- | :------ | :------------------------- |
| `locale` | `string` | `'en'`  | The locale for [Faker.js]. |

## License

This [PostHTML] plugin is [MIT Licensed].

[posthtml-faker]: https://github.com/anthony-teinturier/posthtml-faker
[posthtml]: https://github.com/posthtml/posthtml
[faker.js]: https://github.com/marak/Faker.js
[json data types]: https://www.w3schools.com/js/js_json_datatypes.asp
[faker.js api]: http://marak.github.io/faker.js
[mit licensed]: https://github.com/anthony-teinturier/posthtml-faker/blob/master/LICENSE
