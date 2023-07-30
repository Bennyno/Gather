import { useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Flex, Text, Button } from "@aws-amplify/ui-react";
import { Users, Message } from "@/models";
import MyIcon from "./MyIcon";
import styles from "../src/styles/messages.module.css";

const MessageBubble = ({ id, name, message, messageTime, messageDate }) => {
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  const openDelete = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const authEmail = authUser.attributes.email;
    const users = await DataStore.query(Users);
    let dbUsername;

    const user = users.find((user) => user.email === authEmail);

    if (user) {
      dbUsername = user.username;
    }

    if (name === dbUsername) {
      setDeleteButtonClicked(!deleteButtonClicked);
    }
  };

  const deletePost = async () => {
    const toDelete = await DataStore.query(Message, id);
    DataStore.delete(toDelete);
    setDeleteButtonClicked(false);
  };

  return (
    <Flex
      gap="16px"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="16px 16px 16px 16px"
      borderRadius="30px"
      className={styles.discussionBubble}
    >
      <Flex
        gap="16px"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      ></Flex>
      <Flex
        gap="16px"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      >
        <Flex
          gap="8px"
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
        >
          <Flex
            gap="16px"
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
          >
            <Flex
              gap="16px"
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              shrink="0"
              position="relative"
            >
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="700"
                fontStyle="italic"
                color="white"
                lineHeight="24px"
                textAlign="left"
                display="block"
                letterSpacing="0.01px"
                shrink="0"
                position="relative"
                whiteSpace="pre-wrap"
              >
                {name}
              </Text>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="white"
                lineHeight="24px"
                textAlign="left"
                display="block"
                letterSpacing="0.01px"
                shrink="0"
                position="relative"
                whiteSpace="pre-wrap"
              >
                {messageTime}
              </Text>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="white"
                lineHeight="24px"
                textAlign="left"
                display="block"
                letterSpacing="0.01px"
                shrink="0"
                position="relative"
                whiteSpace="pre-wrap"
              >
                {messageDate}
              </Text>
            </Flex>
            {deleteButtonClicked ? (
              <>
                <Flex
                  gap="0"
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  grow="1"
                  shrink="1"
                  basis="0"
                  position="relative"
                  className={styles.messageIcon}
                >
                  <MyIcon type="more_horiz" onClick={openDelete} />
                </Flex>
                <Button onClick={deletePost} className={styles.deleteButton}>
                  Delete
                </Button>
              </>
            ) : (
              <Flex
                title="Your Post Options"
                gap="0"
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
                grow="1"
                shrink="1"
                basis="0"
                position="relative"
                className={styles.messageIcon}
              >
                <MyIcon type="more_horiz" onClick={openDelete} />
              </Flex>
            )}
          </Flex>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="white"
            lineHeight="24px"
            textAlign="left"
            display="block"
            letterSpacing="0.01px"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            whiteSpace="pre-wrap"
          >
            {message}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MessageBubble;
