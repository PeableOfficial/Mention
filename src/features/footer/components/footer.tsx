import { ThreeDotsIcon } from "../assets/three-dots-icon";

import { FooterLink } from "./footer-link";
import styles from "./styles/footer.module.scss";

export const Footer = () => {
  return (
    <nav aria-label="Footer" className={styles.container}>
      <FooterLink title="Terms of Service" url="https://mention.earth/terms" />
      <FooterLink title="Privacy Policy" url="https://mention.earth/privacy" />
      <FooterLink title="Contribute" url="https://mention.earth/contribute" />
      <FooterLink
        title="Accessibility"
        url="https://mention.earth/accessibility"
      />
      <FooterLink title="About FairCoin" url="https://fairco.in/" />
      <FooterLink title="About Mention" url="https://about.peable.co/mention" />

      <button
        aria-expanded="false"
        aria-haspopup="menu"
        aria-label="More"
        tabIndex={0}
        className={styles.moreButton}
      >
        More <ThreeDotsIcon />
      </button>

      <span>Mention. Made with ❤️ in the 🌎 by Peable</span>
    </nav>
  );
};
