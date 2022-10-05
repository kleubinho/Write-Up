// import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
// import { Avatar } from "./Avatar";
import styles from "./styles.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

export function Comment({ comment }: any) {
  const [likeCount, setLikeCount] = useState(0);

  // function handleDeleteComment() {
  //   onDeleteComment(content)
  // }

  console.log(comment);

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  console.log(comment);

  return (
    <div className={styles.comment}>
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.author}>
              <BiUserCircle />
              <p>{comment?.name}</p>
            </div>
          </header>

          <p>{comment.body}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <AiOutlineLike />
            Like <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
