import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, Session } from "@auth0/nextjs-auth0";

type PropsSupplier<P> = (
  session: Session,
  context: GetServerSidePropsContext
) => Promise<P>;

export default function propsWithSession<P>(
  propsSupplier: PropsSupplier<P>
): GetServerSideProps<P> {
  return async function (context) {
    const session = getSession(context.req, context.res);

    if (!session) {
      return { redirect: { destination: "/api/auth/login", permanent: false } };
    }

    return { props: await propsSupplier(session, context) };
  };
}
