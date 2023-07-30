import { useState } from "react";
import {
  Flex,
  Icon,
  Text,
  Divider,
  Image,
  TextField,
  Button,
} from "@aws-amplify/ui-react";
import { Storage, DataStore, Auth } from "aws-amplify";
import { FileUploader } from "@aws-amplify/ui-react";
import { Users } from "@/models";
import { useRouter } from "next/navigation";
import "@aws-amplify/ui-react/styles.css";
import styles from "../src/styles/profile.module.css";

export default function ProfileCard() {
  const [imageKeys, setImageKeys] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const fetchImages = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const userId = authUser.attributes.sub;
    const authEmail = authUser.attributes.email;
    const original = await DataStore.query(Users);

    if (authUser) {
      const { results } = await Storage.list("", { level: "private" });

      const sortedResults = results.sort(
        (a, b) => a.lastModified - b.lastModified
      );

      setImageKeys(results);
      const s3Images = await Promise.all(
        sortedResults.map(
          async (image) => await Storage.get(image.key, { level: "private" })
        )
      );

      const s3Image = s3Images[s3Images.length - 1];
      setImage(s3Image);

      original.map((item) => {
        if (authEmail === item.email) {
          if (item.image !== s3Image) {
            setImage(s3Image);
          }
        }
      });
    }
  };

  const createOrUpdateDBUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const authEmail = authUser.attributes.email;

    if (authUser) {
      const users = await DataStore.query(Users);
      const user = users.find((user) => user.email === authEmail);
      const index = users.indexOf(user);
      // console.log("user", user.email);

      if (user) {
        const updateUser = await DataStore.save(
          Users.copyOf(users[index], (updated) => {
            updated.name = name;
            updated.username = username;
            updated.image = image;
          })
        );
        setUser(updateUser);
      } else {
        const newUser = await DataStore.save(
          new Users({
            name: name,
            username: username,
            email: email,
            image: image,
          })
        );
        setUser(newUser);
      }
    }

    router.push("/feed");
  };

  return (
    <Flex
      gap="24px"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="24px 24px 24px 24px"
      backgroundColor="white"
      className={styles.profileCardBody}
    >
      <Flex
        gap="16px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      >
        <Flex
          width="24px"
          height="24px"
          overflow="hidden"
          shrink="0"
          position="relative"
        >
          <Icon
            width="14px"
            height="14px"
            viewBox={{ minX: 0, minY: 0, width: 14, height: 14 }}
            paths={[
              {
                d: "M 14 1.4099998474121094 L 12.59000015258789 0 L 7 5.590000152587891 L 1.4099998474121094 0 L 0 1.4099998474121094 L 5.590000152587891 7 L 0 12.59000015258789 L 1.4099998474121094 14 L 7 8.40999984741211 L 12.59000015258789 14 L 14 12.59000015258789 L 8.40999984741211 7 L 14 1.4099998474121094 Z",
                fillRule: "nonzero",
              },
              {
                d: "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z",
                fill: "rgba(13,26,38,1)",
                fillRule: "nonzero",
              },
            ]}
            display="block"
            position="absolute"
            top="20.83%"
            bottom="20.83%"
            left="20.83%"
            right="20.83%"
          />
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(13,26,38,1)"
          lineHeight="20px"
          textAlign="left"
          display="block"
          shrink="0"
          position="relative"
          whiteSpace="pre-wrap"
        >
          Edit Profile
        </Text>
      </Flex>
      <Divider
        height="1px"
        shrink="0"
        alignSelf="stretch"
        size="small"
        orientation="horizontal"
      />
      <Flex
        gap="16px"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      >
        <Image
          width="100px"
          height="100px"
          display="block"
          shrink="0"
          position="relative"
          borderRadius="160px"
          objectFit="cover"
          alt=""
          src={image}
        />
        <Flex direction="column" alignItems="center">
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="22px"
            textAlign="left"
            display="block"
            textDecoration="underline"
            shrink="0"
            position="relative"
            whiteSpace="pre-wrap"
          >
            Upload New Image
          </Text>
          <FileUploader
            acceptedFileTypes={["image/*"]}
            accessLevel="private"
            onSuccess={fetchImages}
          />
        </Flex>
      </Flex>
      <Flex
        gap="16px"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      >
        <TextField
          label="Name"
          placeholder="John Doe"
          shrink="0"
          alignSelf="stretch"
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Username"
          placeholder="Username"
          shrink="0"
          alignSelf="stretch"
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          placeholder="john.doe@awsamplify.com"
          shrink="0"
          alignSelf="stretch"
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Flex>
      <Divider
        height="1px"
        shrink="0"
        alignSelf="stretch"
        size="small"
        orientation="horizontal"
      />
      <Button
        shrink="0"
        size="default"
        isDisabled={false}
        variation="primary"
        onClick={createOrUpdateDBUser}
      >
        Save
      </Button>
    </Flex>
  );
}
