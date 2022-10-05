import styles from "./styles.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { CardSkeleton } from "../components/Skeleton";
import { PostsT } from "../types/posts.t";
import { UserT } from "../types/users.t";

export function Home() {
  const { userId } = useParams();

  const { data: posts, isFetching: isFetchingPosts } = useQuery<PostsT[]>(
    "posts",
    async () => {
      const response = await axios.get(
        " https://jsonplaceholder.typicode.com/posts"
      );

      return response.data;
    }
  );


  const { data: user } = useQuery<UserT[]>(
    "user",
    async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );

      return response.data;
    }
  );

  return (
    <div className={styles.home}>
      <div className={styles.banner}>
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
        />
        <h1>Write Up</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.posts}>
          {posts && posts.map((post) => {
            return (
              <>
                {
                !isFetchingPosts ? 
                <div className={styles.card}>
                <header>
                  {/* <h3>
                    <BiUserCircle />
                  </h3> */}
                  <h1>{post?.title}</h1>
                </header>
                <div className={styles.container}>
                  <p>{post?.body}</p>
                  <Link to={`/comments/${post.id}/comments`}>
                    <button>Read more</button>
                  </Link>
                </div>
              </div>
              : 
              <CardSkeleton/>
              }
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
