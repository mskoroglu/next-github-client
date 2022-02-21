import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  const destination = !!session ? "/profile" : "/api/auth/login";
  return { redirect: { destination, permanent: false } };
};

export default function Index() {}
