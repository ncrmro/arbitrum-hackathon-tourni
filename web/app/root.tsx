import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { ReactElement, useEffect } from "react";
import styles from "~/styles/global.css";
import componentStyles from "~/styles/components.css";
import { json } from "@remix-run/node";

import React from "react";

type LoaderData = {
  gaTrackingId: string | undefined;
  hotjarEnabled: boolean;
  stripePublicKey: string;
  graphqlURI: string;
};

// Load the GA tracking id from the .env
// export const loader: LoaderFunction = async () => {
//   if (!process.env.STRIPE_PUBLISHABLE_KEY)
//     throw new Error("Stripe publishable key was not defined");
//   if (!process.env.WEB_CLIENT_GRAPHQL_URI && !process.env.BACKEND_PORT)
//     throw new Error(
//       "Either the WEB_CLIENT_GRAPHQL_URI or BACKEND PORT should be defined"
//     );
//   return json<LoaderData>({
//     gaTrackingId: process.env.GA_TRACKING_ID,
//     hotjarEnabled: process.env.FF_HOTJAR === "1",
//     stripePublicKey: process.env.STRIPE_PUBLISHABLE_KEY,
//     graphqlURI:
//       process.env.WEB_CLIENT_GRAPHQL_URI ||
//       `http://localhost:${process.env.BACKEND_PORT}/graphql`,
//   });
// };

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Tourni",
  viewport: "width=device-width,initial-scale=1",
  description: "Tournig",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const Layout = (props: { children: ReactElement }) => {
  // const { viewer, loading } = useViewer();
  return (
    <>
      <nav id="navbar">
        <div>
          <Link to="/">Tourni</Link>
        </div>
        <div>
          <Link to="/parts">Tournaments</Link>
          {/*{loading ? (*/}
          {/*    <></>*/}
          {/*) : viewer ? (*/}
          {/*    <>*/}
          {/*      {viewer.isAdmin && <Link to="/admin">Admin</Link>}*/}
          {/*      <Link to="/account">Account</Link>*/}
          {/*    </>*/}
          {/*) : (*/}
          {/*    <>*/}
          {/*      <Link to="/login">Login</Link>*/}
          {/*      <Link to="/register">Register</Link>*/}
          {/*    </>*/}
          {/*)}*/}
        </div>
      </nav>
      <div id="container" className="flex-col items-center">
        <div id="outlet" className="flex-col items-center">
          {props.children}
        </div>
        <footer>
          <p>
            Copyright @ 2022 Tourni All rights reserved{" "}
            <Link to="/help">Need Help?</Link>
          </p>
        </footer>
      </div>
    </>
  );
};

export default function App(): ReactElement {
  const env = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <React.StrictMode>
        <body>
          <Layout>
            <Outlet />
          </Layout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </React.StrictMode>
    </html>
  );
}
