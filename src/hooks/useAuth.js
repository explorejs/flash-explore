import { useEffect, useState } from "react";
import { auth, ref } from "../api/firebase";
import md5 from "md5";

export const useAuth = () => {
  const [state, setState] = useState({
    error: null,
    authChecked: false,
    user: { uid: null },
  });

  const { authChecked, error, user } = state;

  useEffect(() => {
    return auth.onAuthStateChanged((authUser) => {
      loadUser(authUser);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = (user) => {
    if (!user) {
      setState({ error: null, authChecked: true, user: { uid: null } });
      return;
    }
    const { uid } = user;
    const userRef = ref.child(`users/${uid}`);
    userRef.once("value", (snapshot) => {
      if (snapshot.exists()) {
        watchUser(userRef);
      }
    });
  };
  const watchUser = (userRef) =>
    userRef.on("value", (snapshot) => {
      setState({
        ...state,
        authChecked: true,
        user: snapshot.val(),
      });
    });

  const logUserIn = async (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => error);
  };

  const registerUser = async (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        const { uid } = newUser.user;
        const userRef = ref.child(`users/${uid}`);
        const formattedEmail = email.trim().toLowerCase();
        const gravatar = md5(formattedEmail, { encoding: "binary" });
        userRef.set({
          email,
          gravatar,
          signedUp: Date.now(),
          uid,
          userName: formattedEmail.replace(/@.*/, ""),
          userType: "guest",
        });
      })
      .catch((error) => error);
  };

  const signOut = () => auth.signOut();
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  return {
    logUserIn,
    registerUser,
    resetPassword,
    signOut,
    authChecked,
    error,
    user,
  };
};
