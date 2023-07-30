import { useState, useEffect } from "react";
import { View, Grid, Collection } from "@aws-amplify/ui-react";
import { DataStore, Predicates, SortDirection, Auth } from "aws-amplify";
import { Message } from "@/models";
import { MessageBox } from "../../components/MessageBox";
import MessageBubble from "../../components/MessageBubble";
import Sidebar from "../../components/Sidebar";
import styles from "../styles/messages.module.css";

const Discussions = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function getMessages() {
      const authUser = await Auth.currentAuthenticatedUser();
      if (authUser) {
        try {
          const dbMessages = await DataStore.query(Message, Predicates.ALL, {
            sort: (post) => post.createdAt(SortDirection.DESCENDING),
          });
          setMessage(dbMessages);
        } catch (error) {
          console.log("Error retrieving messages", error);
        }
      }
    }

    getMessages();

    DataStore.observe(Message).subscribe((updatedDbMessages) => {
      if (
        updatedDbMessages.opType === "UPDATE" ||
        updatedDbMessages.opType === "CREATE" ||
        updatedDbMessages.opType === "DELETE"
      ) {
        getMessages();
      }
    });
  }, []);

  return (
    <Grid templateColumns="1fr 2fr 0.5fr">
      <View className={styles.sidebar}>
        <Sidebar />
      </View>
      <View className={styles.discussionCenter}>
        <MessageBox />
        <Collection
          items={message}
          width="600px"
          justifyContent="center"
          gap="small"
          marginTop="20px"
        >
          {(item, index) => (
            <MessageBubble key={index} {...item}></MessageBubble>
          )}
        </Collection>
      </View>
    </Grid>
  );
};

export default Discussions;
