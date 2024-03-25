import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: props => <h1 {...props} className="text-3xl font-bold" />,
    h2: props => <h2 {...props} className="text-2xl font-bold pl-2" />,
    h3: props => <h3 {...props} className="text-xl font-bold pl-4" />,
    ul: props => <ul {...props} className="list-disc pl-4" />,
    ol: props => <ol {...props} className="list-decimal pl-4" />,
    a: props => <a {...props} target="_blank" className="underline" />,
    p: props => <p {...props} className="text-lg pl-6" />,
    img: ({ alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt ?? ""} {...props} className="max-w-full" />
    ),
    ...components,
  };
}
