import { useState, useEffect } from "react";
import { DataStore, Storage, Auth } from "aws-amplify";
import { SocialPosts, Users } from "@/models";
import { Flex, Button, View } from "@aws-amplify/ui-react";
import { Loading, Textarea } from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";
import { EmojiButton } from "./EmojiButton";
import { EmojiIcon } from "./EmojiIcon";
import styles from "../src/styles/createPost.module.css";

export default function CreatePost() {
  const [PickerOpen, setPickerOpen] = useState(false);
  const [post, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  const createNewPost = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const authEmail = authUser.attributes.email;
    const users = await DataStore.query(Users);

    const date = new Date().toISOString().substring(0, 10);
    const time = new Date().toISOString().substring(11, 16);

    const user = users.find((user) => user.email === authEmail);

    if (user) {
      setAuthor(user.username);

      const { results } = await Storage.list("", { level: "private" });
      const sortedResults = results.sort(
        (a, b) => a.lastModified - b.lastModified
      );

      const s3Images = await Promise.all(
        sortedResults.map(
          async (image) => await Storage.get(image.key, { level: "private" })
        )
      );
      const s3Image = s3Images[s3Images.length - 1];
      setImage(s3Image);
    }

    if (message === "") return;

    await DataStore.save(
      new SocialPosts({
        profilePic: image,
        author: author,
        message: message,
        postTime: time,
        postDate: date,
        likesCount: 0,
        sharesCount: 0,
        crosspostCount: 0,
        likedBy: [],
      })
    );
    setMessage("");
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const emojiArray = [];
    sym.forEach((el) => emojiArray.push("0x" + el));
    let emoji = String.fromCodePoint(...emojiArray);
    setMessage(message + emoji);
  };

  return (
    <Flex>
      <Flex direction="column" className={styles.createPostContainer}>
        <Flex className={styles.createPostTextArea}>
          <Textarea
            placeholder="Express whats on your mind in 400 words or less...GO!"
            width="590px"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="true"
            maxLength={400}
          />
        </Flex>
        <Flex justifyContent="flex-end" marginBottom="10px">
          <Flex alignItems="center">
            <EmojiButton onClick={() => setPickerOpen(!PickerOpen)}>
              <EmojiIcon />
            </EmojiButton>
          </Flex>
          <Button className={styles.postButton} onClick={createNewPost}>
            Share
          </Button>
        </Flex>
      </Flex>
      {PickerOpen && (
        <View className={styles.emojiPicker}>
          <EmojiPicker onEmojiClick={addEmoji} />
        </View>
      )}
    </Flex>
  );
}
