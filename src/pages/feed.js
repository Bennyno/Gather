import { View, Collection, Grid } from "@aws-amplify/ui-react";
import Post from "../../components/Post";
import { SocialPosts } from "@/models";
import { DataStore, Predicates, SortDirection, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CreatePost from "../../components/CreatePost";
import styles from "../../src/styles/feed.module.css";

export default function Feed() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const authUser = await Auth.currentAuthenticatedUser();
      if (authUser) {
        try {
          const posts = await DataStore.query(SocialPosts, Predicates.ALL, {
            sort: (post) => post.createdAt(SortDirection.DESCENDING),
          });
          setPost(posts);
          console.log(
            "Posts retrieved successfully!",
            JSON.stringify(posts, null, 2)
          );
        } catch (error) {
          console.log("Error retrieving posts", error);
        }
      }
    }

    getPosts();

    DataStore.observe(SocialPosts).subscribe((dbPosts) => {
      if (
        dbPosts.opType === "UPDATE" ||
        dbPosts.opType === "CREATE" ||
        dbPosts.opType === "DELETE"
      ) {
        getPosts();
      }
    });
  }, []);

  return (
    <>
      <Grid templateColumns="1fr 3fr" className={styles.feedBody}>
        <View className={styles.sidebar}>
          <Sidebar />
        </View>
        <View className={styles.feedCenter}>
          <View display="flex" justifyContent="center">
            <CreatePost />
          </View>
          <Collection
            items={post}
            maxWidth="600px"
            margin="0 auto"
            justifyContent="center"
            gap="small"
            marginTop="20px"
          >
            {(item, index) => <Post key={index} {...item}></Post>}
          </Collection>
        </View>
      </Grid>
    </>
  );
}
