/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import { FollowButton } from "@/components/elements/follow-button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useUser } from "../hooks/use-user";
import { following } from "../utils/following";

export const UserModal = forwardRef<HTMLDivElement, { userId: string }>(
  ({ userId }, ref) => {
    const { data: session } = useSession();
    const { data: user, isPending, isError } = useUser({ id: userId });

    const isFollowing = following({
      user,
      session_owner_id: session?.user?.id,
    });

    const stats = [
      {
        id: "followers",
        label: "Followers",
        stat: user?.followers?.length || 0,
      },
      {
        id: "following",
        label: "Following",
        stat: user?.following?.length || 0,
      },
    ];

    return (
      <div>
        {isPending ? (
          <LoadingSpinner />
        ) : isError ? (
          <TryAgain />
        ) : (
          <>
            {" "}
            <div className="relative self-start" data-color={user?.color}>
              <div
                className="rounded-2xl group-hover:visible 
                   group-hover:opacity-100 group-hover:delay-500"
              >
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col gap-2">
                    <div className="-mx-4 -mt-4">
                      <div className="h-16 w-full overflow-hidden rounded-t-2xl bg-primary-100/10">
                        {user?.profile_banner_url && (
                          <Image
                            className="size-full object-cover"
                            src={user?.profile_banner_url || ""}
                            alt="banner"
                            width={150}
                            height={60}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="mb-10">
                        <Image
                          className="bg-main-background object-cover absolute size-[74px] -translate-y-1/2 rounded-full border-[0.25rem] border-[var(--clr-background)] hover:brightness-100  [&:hover>figure>span]:brightness-75 [&>figure>span]:[transition:200ms]"
                          src={user?.profile_image_url || "/avatar.svg"}
                          alt={user?.name}
                          width={74}
                          height={74}
                        />
                      </div>
                      {session?.user?.id !== user?.id && (
                        <FollowButton
                          user_id={user?.id}
                          session_owner_id={session?.user?.id}
                          isFollowing={isFollowing}
                          username={user?.username}
                        />
                      )}
                    </div>
                    <div>
                      <h2 className="custom-underline -mb-1 flex items-center gap-1 truncate text-large font-bold">
                        {user?.name}
                      </h2>
                      <div className="text-light-secondary dark:text-dark-secondary flex items-center gap-1">
                        <span className="text-light-secondary dark:text-dark-secondary flex items-center gap-1 text-milli">
                          @{user?.username}
                        </span>
                      </div>
                    </div>
                  </div>
                  {user?.description && (
                    <p className="text-milli">{user?.description}</p>
                  )}
                  <div className="text-secondary flex gap-4">
                    {stats.map(({ id, label, stat }) => (
                      <Link href={`/@${user?.username}/${label}`} key={id}>
                        <div
                          className="hover-animation hover:border-b-light-primary focus-visible:border-b-light-primary dark:hover:border-b-dark-primary dark:focus-visible:border-b-dark-primary flex h-4 items-center 
                             gap-1 border-b border-b-transparent
                             text-milli outline-none"
                        >
                          <p className="font-bold">{stat}</p>
                          <p className="text-light-secondary dark:text-dark-secondary">
                            {label}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);

UserModal.displayName = "UserModal";
