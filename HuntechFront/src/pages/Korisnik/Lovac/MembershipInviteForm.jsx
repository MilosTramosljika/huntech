import React from 'react';
import styles from './MembershipInvite.module.css';

const MembershipInviteForm = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📜 Detalji poziva za učlanjenje</h2>
      <form action="/obradi-poziv-uclanjenje" method="post" className={styles.form}>
        <label>ID poziva:</label>
        <input type="text" value="INV024" readOnly />

        <label>Lovačko udruženje:</label>
        <input type="text" value="LD 'Zelengora'" readOnly />

        <label>Poziv poslao:</label>
        <input type="text" value="admin_ld_zelengora" readOnly />

        <label>Datum poziva:</label>
        <input type="date" value="2025-07-12" readOnly />

        <label>Opis:</label>
        <textarea rows="4" readOnly>
Pozvani ste da se pridružite udruženju LD "Zelengora" kao aktivni član na osnovu vaših dosadašnjih rezultata i preporuka članova.
        </textarea>

        <div className={styles.actions}>
          <button type="submit" name="akcija" value="Prihvati">✅ Prihvati</button>
          <button type="submit" name="akcija" value="Odbij">❌ Odbij</button>
          <button type="submit" name="akcija" value="Povratak">🔙 Povratak</button>
        </div>
      </form>
    </div>
  );
};

export default MembershipInviteForm;