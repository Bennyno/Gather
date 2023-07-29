import "@/styles/globals.css";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
Amplify.configure(awsExports);
import "@aws-amplify/ui-react/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <Authenticator.Provider>
      <Component {...pageProps} />
    </Authenticator.Provider>
  );
}
