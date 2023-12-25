import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) =>
      props.href == undefined || props.href?.startsWith("http") ? (
        <a {...props} />
      ) : (
        <Link {...props} />
      ),
    ...components,
  };
}
