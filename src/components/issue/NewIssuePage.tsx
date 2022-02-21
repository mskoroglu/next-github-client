import Repository from "@lib/github/Repository";
import Layout from "@components/layout/Layout";
import PageData from "@components/PageData";
import React, { FormEvent } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export interface NewIssuePageData extends PageData {
  repository: Repository;
}

export default function NewIssuePage({
  repository,
  ...pageData
}: NewIssuePageData) {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  async function submitIssue(event: FormEvent) {
    event.preventDefault();

    const response = await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify({ repository: repository.full_name, title, body }),
    });

    if (response.status !== 201) {
      const responseBody = await response.json();
      console.error(
        "An error occurred when submitting the issue",
        responseBody
      );
      return alert(
        "An error occurred when submitting the issue. Please check the console messages."
      );
    }

    const resourceLocation = response.headers.get("Location");
    await router.push(resourceLocation!);
  }

  return (
    <Layout {...pageData}>
      <h1 className="my-4 text-4xl font-mono font-bold text-zinc-800">
        {pageData.title}
      </h1>

      <form onSubmit={submitIssue}>
        <div className="mt-6">
          <label htmlFor="title" className="block mb-2 font-bold text-zinc-900">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="border border-zinc-300 text-zinc-900 text-sm rounded block w-full p-2.5"
            placeholder="Title"
            required
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="body" className="block mb-2 font-bold text-zinc-900">
            Body
          </label>

          <div>
            <MDEditor
              id="body"
              value={body}
              onChange={(value) => setBody(value!)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            className={
              "bg-zinc-100 rounded-lg px-4 py-2 transition font-medium hover:bg-zinc-200"
            }
          >
            Submit new issue
          </button>
        </div>
      </form>
    </Layout>
  );
}
