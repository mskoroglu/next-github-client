import htmlContentStyles from "@components/ui/HtmlContent.module.css";
import React from "react";

export default function HtmlContent(props: { html: string }) {
  return (
    <div
      className={htmlContentStyles.htmlContent}
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
}
