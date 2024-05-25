import { OxyLogo } from "../assets/oxy-logo";

import { SignInButton } from "@oxyhq/services";
import styles from "./styles/register-form.module.scss";

export const RegisterForm = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New to Mention?</h2>
      <p className={styles.description}>
        Sign up now to get your own personalized timeline!
      </p>

      <div className={styles.buttons}>
        <SignInButton icon={<OxyLogo />} text="Sign in with Oxy" />
      </div>

      <div className={styles.terms}>
        By signing up, you agree to the{" "}
        <a href="https://oxy.so/company/transparency/policies/terms">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="https://oxy.so/company/transparency/policies/privacy">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};
