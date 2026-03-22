import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  type AuthProvider,
} from "firebase/auth";

/**
 * Firebase-supported OAuth flows. Instagram has no standalone consumer OAuth in Firebase;
 * Meta accounts use Facebook login — one button covers Facebook + Instagram in the UI.
 */
export type SocialProviderId = "google" | "facebook" | "twitter";

export function getFirebaseAuthProvider(id: SocialProviderId): AuthProvider {
  switch (id) {
    case "google":
      return new GoogleAuthProvider();
    case "facebook":
      return new FacebookAuthProvider();
    case "twitter":
      return new TwitterAuthProvider();
    default: {
      const x: never = id;
      throw new Error(`Unknown provider: ${x}`);
    }
  }
}
