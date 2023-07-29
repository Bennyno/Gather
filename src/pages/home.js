import {
  Authenticator,
  Collection,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import PropertyCard from "../../components/PropertyCard";
import { useEffect, useState } from "react";
import { DataStore, Auth } from "aws-amplify";
import { Users } from "@/models";
import {
  View,
  Flex,
  Heading,
  Button,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [user, setUser] = useState([]);
  // const { signOut } = useAuthenticator();
  // const router = useRouter();

  useEffect(() => {
    async function getUsers() {
      try {
        const _users = await DataStore.query(Users);
        setUser(_users);
        console.log(
          "Posts retrieved successfully!",
          JSON.stringify(_users, null, 2)
        );
      } catch (error) {
        console.log("Error retrieving posts", error);
      }
    }
    getUsers();
  }, []);

  // const logOut = () => {
  //   signOut();
  //   router.push("/login");
  // };

  return (
    <>
      <Navbar />
      <Collection
        items={user}
        type="grid"
        maxWidth="1100px"
        margin="0 auto"
        justifyContent="center"
        templateColumns={{
          base: "minmax(0, 500px)",
          medium: "repeat(2, minmax(0, 1fr))",
          large: "repeat(3, minmax(0, 1fr))",
        }}
        gap="small"
        marginTop="20px"
      >
        {(item, index) => <PropertyCard key={index} {...item}></PropertyCard>}
      </Collection>
    </>
  );
}
