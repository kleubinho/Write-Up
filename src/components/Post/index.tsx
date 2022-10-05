// import { formatDistanceToNow } from "date-fns";
// import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Comment } from "../Comment/Comment";

import styles from "./styles.module.scss";

export function Post({ comment }: any) {
  const [comments, setComments] = useState(["Post Muito Bacana!"]);

  const [newCommentText, setNewCommentText] = useState("");

  console.log(newCommentText);

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault(); //evitar o comportamento de redirecionar o usuario

    setComments([
      ...comments /* copia os valores que já existem*/,
      newCommentText,
    ]);
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          {/* <Avatar src={author.avatarUrl} /> */}
          <div className={styles.authorInfo}>
            <strong>{comment.name}</strong>
            {/* <span>{comment.role}</span> */}
          </div>
        </div>

        {/* <time title="" dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time> */}
      </header>

      <div className={styles.content}>
        <p>{comment?.body}</p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
