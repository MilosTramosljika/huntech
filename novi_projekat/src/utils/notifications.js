import { supabase } from "../supabaseClient";

export const sendNotification = async (userId, message, link = null) => {
  try {
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      message,
      link,
    });

    if (error) {
      console.error("Greška pri slanju obaveštenja:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Greška pri slanju obaveštenja:", error);
    return false;
  }
};
