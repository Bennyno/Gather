import { useEffect, useState } from "react";
import { Auth, Storage, DataStore } from "aws-amplify";
import { Flex, View } from "@aws-amplify/ui-react";
import { Input, Avatar } from "@nextui-org/react";
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import { EmojiIcon } from "./EmojiIcon";
import { EmojiButton } from "./EmojiButton";
import EmojiPicker from "emoji-picker-react";
import { Users, Message } from "@/models";
import styles from "../src/styles/messages.module.css";

export const MessageBox = () => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [imageKeys, setImageKeys] = useState(null);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userId = authUser.attributes.sub;
      console.log(userId);
      const authEmail = authUser.attributes.email;
      const original = await DataStore.query(Users);

      if (authUser) {
        const { results } = await Storage.list("", { level: "private" });

        const sortedResults = results.sort(
          (a, b) => a.lastModified - b.lastModified
        );

        console.log(results);
        setImageKeys(results);
        const s3Images = await Promise.all(
          sortedResults.map(
            async (image) => await Storage.get(image.key, { level: "private" })
          )
        );
        console.log("image", s3Images);
        const s3Image = s3Images[s3Images.length - 1];
        setImage(s3Image);
      }
    };
    fetchImages();
  }, []);

  const createNewMessage = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const authEmail = authUser.attributes.email;
    const users = await DataStore.query(Users);

    const date = new Date().toISOString().substring(0, 10);
    const time = new Date().toISOString().substring(11, 16);

    const user = users.find((user) => user.email === authEmail);

    if (user) {
      setUsername(user.username);
    }

    if (messageText === "") return;

    await DataStore.save(
      new Message({
        name: username,
        message: messageText,
        messageTime: time,
        messageDate: date,
      })
    );

    setMessageText("");
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const emojiArray = [];
    sym.forEach((el) => emojiArray.push("0x" + el));
    let emoji = String.fromCodePoint(...emojiArray);
    setMessageText(messageText + emoji);
  };

  return (
    <View>
      <Input
        className={styles.messageBox}
        size="xl"
        width="600px"
        clearable
        contentRightStyling={false}
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createNewMessage();
            console.log("Enter pressed");
          }
        }}
        contentLeft={
          <Avatar size="md" src={image} color="primary" bordered zoomed />
        }
        contentRight={
          <Flex gap="0px">
            <EmojiButton onClick={() => setPickerOpen(!pickerOpen)}>
              <EmojiIcon />
            </EmojiButton>
            <SendButton onClick={createNewMessage}>
              <SendIcon />
            </SendButton>
          </Flex>
        }
      />
      <View className={styles.emojiPicker}>
        {pickerOpen && <EmojiPicker onEmojiClick={addEmoji} />}
      </View>
    </View>
  );
};
