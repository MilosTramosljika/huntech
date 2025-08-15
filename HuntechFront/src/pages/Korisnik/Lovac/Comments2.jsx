import React, { useState } from "react";
import styles from "./Comments2.module.css";

const Comments2 = () => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Komentar poslat:", commentText);
    // TODO: slanje komentara ka backendu
    setCommentText("");
    setShowCommentBox(false);
  };

  return (
    <div className={styles.objava}>
      <h4>Postavljanje hranilica</h4>
      <p>Danas smo postavili 4 hranilice soli u šumi.</p>

      <div className={styles.akcije}>
        <span>
          👍 <strong>9</strong>
        </span>
        <span>
          👎 <strong>1</strong>
        </span>
        <span>
          💬 <strong>3</strong>
        </span>

        <div className={styles.dugmad}>
          <button onClick={() => setShowCommentBox(true)}>💬 Komentar</button>
          <button>👍 Like</button>
          <button>👎 Dislike</button>
        </div>
      </div>

      {showCommentBox && (
        <div className={styles.komentarBox}>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="objavaId" value="OBJ021" />
            <textarea
              name="tekstKomentara"
              rows="3"
              placeholder="Upiši komentar..."
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className={styles.dugmadKomentar}>
              <input type="submit" value="Pošalji komentar" />
              <button type="button" onClick={() => setShowCommentBox(false)}>
                Otkaži
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments2;
