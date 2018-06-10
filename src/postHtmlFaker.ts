import {
  IPostHtmlTagNode,
  IPostHtmlTreeMatcher,
  PostHtmlTreeNode
} from "./api/postHtml";
import { patchFake } from "./patch/faker";

/**
 * The HTML tag name to be matched by the plugin.
 */
const FAKE_TAGNAME = "fake";

/**
 * The plugin default configuration.
 */
const PLUGIN_DEFAULTS = {
  locale: "en"
};

/**
 * Creates a plugin for the PostHtml API, which replaces any HTML `<fake>` tags
 * with the generated fake data.
 *
 * @param config The plugin configuration.
 * @returns The PostHtml plugin.
 */
export function postHtmlFaker(
  config = {}
): (tree: IPostHtmlTreeMatcher) => void {
  const userConfig = Object.assign(PLUGIN_DEFAULTS, config);
  const faker = require(`faker/locale/${userConfig.locale}`);
  const fake = patchFake(faker);

  return (tree: IPostHtmlTreeMatcher) => {
    tree.match({ tag: FAKE_TAGNAME }, (node: IPostHtmlTagNode) => {
      const tagNode: IPostHtmlTagNode = {
        content: generateContent(fake, node),
        tag: false
      };

      return tagNode;
    });
  };
}

/**
 * Given a `<fake>` node, it generates the fake data.
 *
 * @param fake The fake data generator.
 * @param node The `<fake>` node.
 * @returns The generated data.
 */
function generateContent(
  fake: (str: string) => string,
  node: IPostHtmlTagNode
): PostHtmlTreeNode[] {
  if (Array.isArray(node.content)) {
    return node.content.map(generateNodeContent.bind(null, fake));
  }

  return [""];
}

/**
 * Given a PostHtml node, it generates the fake data.
 *
 * @param fake The fake data generator.
 * @param node The PostHtml node.
 * @returns The generated data.
 */
function generateNodeContent(
  fake: (str: string) => string,
  node: PostHtmlTreeNode
): string | PostHtmlTreeNode {
  if (typeof node === "string") {
    return fake(node);
  }

  if (node.tag === FAKE_TAGNAME) {
    return node;
  }

  const treeNode: IPostHtmlTagNode = {
    tag: node.tag
  };

  if (node.attrs) {
    treeNode.attrs = Object.entries(node.attrs).reduce(
      (acc, [key, value]) => {
        acc[key] = fake(value);
        return acc;
      },
      {} as { [key: string]: string }
    );
  }

  if (Array.isArray(node.content)) {
    treeNode.content = node.content.map(generateNodeContent.bind(null, fake));
  }

  return treeNode;
}
