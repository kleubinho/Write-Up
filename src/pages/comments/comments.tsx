import { useQuery } from "react-query";
import { PostsT } from "../../types/posts.t";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Comment } from "../../components/Comment/Comment";
import { CommentsT } from "../../types/comments.t";
import { BsArrowLeft } from "react-icons/bs";

export function Comments() {
  const { id } = useParams();

  const [newCommentText, setNewCommentText] = useState("");

  const { data: post } = useQuery<PostsT>("post", async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id?.toString()}`
    );

    return response.data;
  });

  const { data: comments } = useQuery<CommentsT[]>("comments", async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id?.toString()}/comments`
    );

    return response.data;
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <div className={styles.comments}>
      <div className={styles.content}>
        <article className={styles.post}>
          <header>
            <div className={styles.leave}>
              <BsArrowLeft title="Voltar" />
              <Link to={"/"}>Back</Link>
            </div>

            <div className={styles.author}>
              <BiUserCircle />
              <Link to={`/user/${post?.userId}`}>
                <strong>{post?.title}</strong>
              </Link>
            </div>
          </header>

          <div className={styles.container}>
            <p>{post?.body}</p>
          </div>

          <form
            onSubmit={(e: any) => e.preventDefault(e)}
            className={styles.commentForm}
          >
            <strong>Leave your feedBack</strong>

            <textarea
              name="comment"
              placeholder="Deixe um comentário"
              onChange={handleNewCommentChange}
              value={newCommentText}
              // onInvalid={handleNewCommentInvalid}
              required
            />

            <footer>
              <button type="submit" disabled={isNewCommentEmpty}>
                Publicar
              </button>
            </footer>
          </form>

          <div className={styles.commentList}>
            {comments &&
              comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
          </div>
        </article>
      </div>
    </div>
  );
}
