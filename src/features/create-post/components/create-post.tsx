"use client";
import { usePeableSession } from "@peable/services";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { useUser } from "@/features/profile";

import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { LocationIcon } from "@/assets/location-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { Avatar, LinkToProfile } from "@/features/profile";
import { IPost } from "@/features/posts";

import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";
import { useCreatePost } from "../hooks/use-create-post";
import { IChosenImages } from "../types";
import { chooseImages } from "../utils/choose-images";
import { resizeTextarea } from "../utils/resize-textarea";

import { ChosenImages } from "./chosen-images";
import { CreatePostQuote } from "./create-post-quote";
import { EmojiButton } from "./emoji-button";
import styles from "./styles/create-post.module.scss";
import { TextProgressBar } from "./text-progress-bar";

export const CreatePost = ({
  quoted_post,
  in_reply_to_username,
  in_reply_to_status_id,
  placeholder = "What's happening?",
  isInspectModal = false,
  container = "post",
  inputId = "post-text",
}: {
  quoted_post?: IPost | null;
  in_reply_to_username?: string | null;
  in_reply_to_status_id?: string | null;
  placeholder?: string | null;
  isInspectModal?: boolean;
  container?: "post" | "modal" | "comment";
  inputId?: string;
}) => {
  const { session } = usePeableSession();
  const { data: user } = useUser({ id: session?.user?.id });

  const [text, setText] = useState("");
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const mutation = useCreatePost({
    setText,
    setChosenImages,
  });

  const textAreaRef = useRef<HTMLTextAreaElement>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    resizeTextarea(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    if (!textAreaRef.current) return;
    resizeTextarea(textAreaRef.current);
  }, [text]);

  if (!session) return null;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <LinkToProfile username={user?.username}>
            <Avatar userImage={session?.user?.profile_image_url} />
          </LinkToProfile>
        </div>
      </div>

      <form>
        <div
          className={`${styles.content} ${
            container === "modal"
              ? styles.modalHeight
              : container === "comment"
                ? styles.commentHeight
                : ""
          }`}
        >
          <div className={styles.text}>
            <textarea
              id={inputId}
              ref={inputRef}
              style={{ height: "0" }}
              contentEditable="true"
              aria-multiline="true"
              aria-label="Post text"
              aria-autocomplete="list"
              spellCheck="true"
              tabIndex={0}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder as string}
            />
          </div>

          {chosenImages && (
            <ChosenImages
              chosenImages={chosenImages}
              setChosenImages={setChosenImages}
            />
          )}

          {quoted_post && (
            <div className="my-2">
              <CreatePostQuote post={quoted_post} />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-1 translate-x-[-8px] flex-wrap items-center">
            <Tooltip text="Media">
              <Button
                type="button"
                aria-label="Add photos or video"
                data-title="Media"
                tabIndex={0}
                disabled={chosenImages.length >= 4}
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
                className="fill-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 active:bg-neutral-600"
              >
                <ImageIcon />
                <input
                  ref={fileInputRef}
                  id="media"
                  className="hidden"
                  tabIndex={-1}
                  type="file"
                  onChange={(e) =>
                    chooseImages({
                      event: e,
                      chosenImagesLength: chosenImages.length,
                      setChosenImages,
                    })
                  }
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                  max={4}
                  multiple
                  disabled={chosenImages.length >= 4}
                />
              </Button>
            </Tooltip>

            <Tooltip text="GIF">
              <Button
                type="button"
                aria-label="Add a GIF"
                className="fill-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 active:bg-neutral-600"
              >
                <GifIcon />
              </Button>
            </Tooltip>

            {!isInspectModal && (
              <div className="hidden md:block">
                <Tooltip text="Poll">
                  <Button
                    type="button"
                    aria-label="Add poll"
                    className="fill-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 active:bg-neutral-600"
                  >
                    <PollIcon />
                  </Button>
                </Tooltip>
              </div>
            )}

            <EmojiButton setText={setText} inputId={inputId} />

            {!isInspectModal && (
              <div className="hidden md:block">
                <Tooltip text="Schedule">
                  <Button
                    type="button"
                    aria-label="Schedule post"
                    className="fill-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 active:bg-neutral-600"
                  >
                    <ScheduleIcon />
                  </Button>
                </Tooltip>
              </div>
            )}

            <Tooltip text="Location">
              <Button
                type="button"
                aria-label="Tag location"
                className="fill-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 active:bg-neutral-600"
              >
                <LocationIcon />
              </Button>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            {text.length > 0 && <TextProgressBar progress={text.length} />}

            <Button
              type="button"
              aria-label="Add post"
              onClick={() =>
                mutation.mutate({
                  text: text.trim(),
                  userId: session?.user?.id,
                  files: chosenImages.map((img) => img.file),
                  in_reply_to_username,
                  in_reply_to_status_id,
                  quoted_post_id: quoted_post ? quoted_post.id : null,
                })
              }
              disabled={
                (text.length === 0 || text.length > 280) &&
                chosenImages.length === 0
              }
              className="bg-primary-100 px-[1em] py-[0.45em] text-milli font-bold text-white hover:bg-primary-200 focus-visible:bg-primary-200 focus-visible:outline-secondary-100 active:bg-primary-300"
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
