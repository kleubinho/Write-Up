import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { PostsT } from "../../types/posts.t";
import { UserT } from "../../types/users.t";
import styles from "./styles.module.scss";

export function User() {
  const { userId } = useParams();

  const { data: user } = useQuery<UserT>("user", async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId?.toString()}`
    );

    return response.data;
  });

  const { data: posts } = useQuery<PostsT[]>("posts", async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );

    return response.data;
  });

  console.log(posts);

  return (
    <div className={styles.user}>
      <div className={styles.content}>
        <div className={styles.posts}>
          <div className={styles.leave}>
            <BsArrowLeft title="Voltar" />
            <Link to={"/"}>Back</Link>
          </div>
          <h1>All Posts: {user?.username}</h1>
          {posts &&
            posts.map((post) => {
              return (
                <>
                  {post?.userId === user?.id ? (
                    <article className={styles.post}>
                      <header>
                        <div className={styles.author}>
                          <div className={styles.authorInfo}>
                            <strong>{post.title}</strong>
                          </div>
                        </div>
                      </header>

                      <div className={styles.container}>
                        <p>{post?.body}</p>
                        <Link to={`/comments/${post?.id}/comments`}>
                          <button>Read more</button>
                        </Link>
                      </div>
                    </article>
                  ) : null}
                </>
              );
            })}
        </div>

        <div className={styles.dataUser}>
          <h1>
            <BiUserCircle />
            {user?.name}
          </h1>
          <p>email: {user?.email}</p>
          <p>website: {user?.website}</p>
          <p>phone: {user?.phone}</p>
        </div>
      </div>
    </div>
  );
}
