/**
 * Represents a node of the PostHTML tree model.
 */
export type PostHTMLTreeNode = string | IPostHTMLTagNode;

/**
 * Represents a HTML tag node of the PostHTML tree model.
 */
export interface IPostHTMLTagNode {
  attrs?: { [key: string]: string };
  content?: PostHTMLTreeNode[];
  tag: boolean | string;
}

/**
 * Represents a matcher to traverse the PostHTML tree model.
 */
export interface IPostHTMLTreeMatcher {
  match(
    matcher: { tag: string },
    callback: (node: IPostHTMLTagNode) => PostHTMLTreeNode
  ): PostHTMLTreeNode;
}
