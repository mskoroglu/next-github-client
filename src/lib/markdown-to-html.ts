import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import { VFileCompatible } from "vfile";

export default async function markdownToHtml(markdown: VFileCompatible) {
  const result = await remark()
    .use(remarkHtml)
    .use(remarkGfm)
    .process(markdown);
  return result.toString();
}
