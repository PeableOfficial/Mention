"use client";
import Link from "next/link";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useUsers } from "@/features/profile";
import { useLocale } from "@/app/LocaleContext";

import { Person } from "./person";
import styles from "./styles/connect.module.scss";

export const Connect = () => {
  const { t } = useLocale();
  const {
    data: people = [],
    isLoading,
    isError,
  } = useUsers({
    queryKey: ["people-to-follow"],
    limit: 3,
  });

  return (
    <section
      aria-label={t("pages.connect.widget.title")}
      className={styles.container}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div className={styles.error}>
          <TryAgain />
        </div>
      ) : (
        <>
          <h2>{t("pages.connect.widget.title")}</h2>
          <div className={styles.people}>
            {Array.isArray(people) &&
              people.map((person) => {
                return <Person key={person.id} person={person} />;
              })}
          </div>

          <Link className={styles.showMore} href={`/people`}>
            Show more
          </Link>
        </>
      )}
    </section>
  );
};
