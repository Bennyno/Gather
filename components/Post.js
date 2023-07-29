import { Flex, Text, Image, Button } from "@aws-amplify/ui-react";
import MyIcon from "./MyIcon";
import { DataStore, Auth, Predicates } from "aws-amplify";
import { SocialPosts, Users } from "@/models";
import { useState, useEffect } from "react";
import styles from "../src/styles/post.module.css";

export default function Post({
  id,
  message,
  author,
  profilePic,
  postTime,
  postDate,
  sharesCount,
  likesCount,
  crosspostCount,
  likedBy,
}) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [postIsCreated, setPostIsCreated] = useState(false);

  const updateLikes = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const authEmail = authUser.attributes.email;
    const original = await DataStore.query(SocialPosts, id);
    const users = await DataStore.query(Users);

    const user = users.find((user) => user.email === authEmail);

    const unlikedBy = likedBy.filter((item) => item !== user.username);

    DataStore.observe(SocialPosts).subscribe((dbPosts) => {
      if (dbPosts.opType === "CREATE") {
        setPostIsCreated(true);
      }
    });

    if (isLiked) {
      const oneLessLike = await DataStore.save(
        SocialPosts.copyOf(original, (updated) => {
          updated.likesCount = Math.max(original.likesCount - 1, 0);
          updated.likedBy = unlikedBy;
        })
      );

      setIsLiked(!isLiked);
    } else {
      const updatedLikedBy = [...likedBy, user.username];
      const oneMoreLike = await DataStore.save(
        SocialPosts.copyOf(original, (updated) => {
          updated.likesCount = Math.max(original.likesCount + 1, 0);
          updated.likedBy = updatedLikedBy;
        })
      );

      setIsLiked(!isLiked);
    }
  };

  const openDelete = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const authEmail = authUser.attributes.email;
    const users = await DataStore.query(Users);
    let dbUsername;

    const user = users.find((user) => user.email === authEmail);

    if (user) {
      dbUsername = user.username;
    }

    if (author === dbUsername) {
      setDeleteButtonClicked(!deleteButtonClicked);
    }
  };

  const deletePost = async () => {
    const toDelete = await DataStore.query(SocialPosts, id);
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
      className={styles.postBody}
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
          gap="9px"
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
        >
          <MyIcon type="favorite" />
          {likedBy.length > 5 ? (
            <Text
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="600"
              color="white"
              lineHeight="24px"
              textAlign="left"
              display="block"
              shrink="0"
              position="relative"
              whiteSpace="pre-wrap"
            >
              Liked By: {likedBy.slice(0, 5).join(", ")} and{" "}
              {likedBy.length - 5} others
            </Text>
          ) : (
            <Text
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="600"
              color="white"
              lineHeight="24px"
              textAlign="left"
              display="block"
              shrink="0"
              position="relative"
              whiteSpace="pre-wrap"
            >
              Liked By: {likedBy.slice(0, 5).join(", ")}
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex
        gap="16px"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      >
        <Image
          width="80px"
          height="80px"
          display="block"
          shrink="0"
          position="relative"
          borderRadius="64px"
          objectFit="cover"
          alt={id}
          src={profilePic}
        />
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
                {author}
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
                {postTime}
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
                {postDate}
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
                  className={styles.postIcons}
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
                className={styles.postIcons}
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
      <Flex
        gap="80px"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
      >
        <Flex
          title="Repost"
          gap="16px"
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          className={styles.postIcons}
        >
          <MyIcon type="reply" />
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
            {sharesCount}
          </Text>
        </Flex>
        <Flex
          title="Crosspost"
          gap="16px"
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          className={styles.postIcons}
        >
          <MyIcon type="shuffle" />
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
            {crosspostCount}
          </Text>
        </Flex>
        <Flex
          title="Likes"
          gap="16px"
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          className={styles.postIcons}
        >
          {isLiked ? (
            <MyIcon type="favorite" onClick={updateLikes} />
          ) : (
            <MyIcon type="favorite_border" onClick={updateLikes} />
          )}
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
            {likesCount}
          </Text>
        </Flex>
        <Flex title="Share">
          <MyIcon type="share" className={styles.postIcons} />
        </Flex>
      </Flex>
    </Flex>
  );
}
