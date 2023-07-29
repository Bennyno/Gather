import { Flex, Button, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import styles from "../src/styles/sidebar.module.css";

export default function Settings() {
  const router = useRouter();
  const { signOut } = useAuthenticator();

  const logOut = () => {
    signOut();
    router.push("/login");
  };

  const goToUserProfile = () => {
    router.push("/userProfile");
  };

  return (
    <Flex
      gap="16px"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="16px 16px 16px 16px"
      backgroundColor="black"
      borderRadius="30px"
    >
      <Button className={styles.settingsOptions} onClick={goToUserProfile}>
        Profile
      </Button>

      <Flex
        gap="16px"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      >
        <Button className={styles.settingsOptions} onClick={logOut}>
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
}
