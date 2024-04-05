import type { MDXComponents } from "mdx/types";
import { cn } from "./lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1 {...props} className={cn("pl-0 text-3xl", className)} />
    ),
    h2: ({ className, ...props }) => (
      <h2 {...props} className={cn("pl-1 text-2xl", className)} />
    ),
    h3: ({ className, ...props }) => (
      <h3 {...props} className={cn("pl-2 text-xl", className)} />
    ),
    ul: props => <ul {...props} className="ml-4 list-disc" />,
    ol: props => <ol {...props} className="list-decimal pl-4" />,
    a: props => (
      <a {...props} target="_blank" className="underline text-blue-800" />
    ),
    p: props => <p {...props} className="pl-6 leading-normal" />,
    img: ({ alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt ?? ""} {...props} className="max-w-full" />
    ),
    ...components,
  };
}
