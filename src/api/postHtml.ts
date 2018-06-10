/**
 * Represents a node of the PostHtml tree model.
 */
export type PostHtmlTreeNode = string | IPostHtmlTagNode;

/**
 * Represents a HTML tag node of the PostHtml tree model.
 */
export interface IPostHtmlTagNode {
  attrs?: { [key: string]: string };
  content?: PostHtmlTreeNode[];
  tag: boolean | string;
}

/**
 * Represents a matcher to traverse the PostHtml tree model.
 */
export interface IPostHtmlTreeMatcher {
  match(
    matcher: { tag: string },
    callback: (node: IPostHtmlTagNode) => PostHtmlTreeNode
  ): PostHtmlTreeNode;
}
