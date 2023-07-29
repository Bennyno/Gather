import { Heading, Grid, Card, Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Navbar() {
  const { route } = useAuthenticator((context) => [context.route]);
  const router = useRouter();
  const { signOut } = useAuthenticator();

  const logOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <Grid>
      {route === "authenticated" ? (
        <Card columnStart="1">
          <Heading color="black" level={1} display="inline-block">
            Welcome to the Future of Social Media
          </Heading>
          <Button style={{ float: "right" }} onClick={logOut}>
            Log out
          </Button>
        </Card>
      ) : (
        <Card columnStart="1">
          <Heading
            color="black"
            level={1}
            display="flex"
            justifyContent="center"
          >
            Welcome to the Future of Social Media
          </Heading>
        </Card>
      )}
    </Grid>
  );
}
