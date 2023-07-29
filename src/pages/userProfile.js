import { View, Flex } from "@aws-amplify/ui-react";
import ProfileCard from "../../components/ProfileCard";
import Sidebar from "../../components/Sidebar";
import styles from "../styles/profile.module.css";

export default function UserProfile() {
  return (
    <>
      <Flex direction="row">
        <Flex justifyContent="flex-start" className={styles.sidebar}>
          <Sidebar />
        </Flex>
        <View className={styles.profileCard}>
          <ProfileCard />
        </View>
      </Flex>
    </>
  );
}
