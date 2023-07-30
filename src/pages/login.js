import { useEffect } from "react";
import { Auth, DataStore } from "aws-amplify";
import {
  Flex,
  View,
  Authenticator,
  useAuthenticator,
  Image,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { Users } from "@/models";
import styles from "../styles/login.module.css";

const formFields = {
  signUp: {
    email: {
      order: 1,
    },
    password: {
      order: 3,
    },
    confirm_password: {
      order: 4,
    },
  },
};

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const authEmail = authUser.attributes.email;
      const users = await DataStore.query(Users);
      const user = users.find((user) => user.email === authEmail);
      if (route === "authenticated" && user) {
        router.push("/feed");
      } else if (route === "authenticated" && !user) {
        router.push("/userProfile");
      }
    };
    getUser();
  }, [route, router]);

  return (
    <View className={styles.login}>
      <Flex direction="column" height="100%">
        <Image
          margin="0 auto"
          height="150px"
          width="300px"
          display="block"
          alignSelf="stretch"
          objectFit="cover"
          shrink="0"
          position="relative"
          src="/welcomeToGather.png"
        />
        <View marginTop="5rem">
          <Authenticator formFields={formFields}></Authenticator>
        </View>
      </Flex>
    </View>
  );
}
