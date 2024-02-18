"use client";
import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { LocationIcon } from "@/assets/location-icon";
import { IPost } from "@/features/posts";
import { Avatar, LinkToProfile } from "@/features/profile";

import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";
import { useCreatePost } from "../hooks/use-create-post";
import { IChosenImages } from "../types";
import { chooseImages } from "../utils/choose-images";
import { resizeTextarea } from "../utils/resize-textarea";

import Action from "./action";
import { ChosenImages } from "./chosen-images";
import { CreatePostQuote } from "./create-post-quote";
import { EmojiButton } from "./emoji-button";
import styles from "./styles/create-post.module.scss";
import { TextProgressBar } from "./text-progress-bar";

export const CreatePost = ({
  quoted_post,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  placeholder = "What's happening?",
  isInspectModal = false,
  container = "post",
  inputId = "post-text",
}: {
  quoted_post?: IPost | null;
  in_reply_to_screen_name?: string | null;
  in_reply_to_status_id?: string | null;
  placeholder?: string | null;
  isInspectModal?: boolean;
  container?: "post" | "modal" | "comment";
  inputId?: string;
}) => {
  const { data: session } = useSession();

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
          <LinkToProfile username={session?.user?.screen_name}>
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
            <div className={styles.quotedPost}>
              <CreatePostQuote post={quoted_post} />
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <div className={styles.post_actions}>
            <button
              type="button"
              className={styles.action}
              aria-label="Add photos or video"
              data-title="Media"
              tabIndex={0}
              disabled={chosenImages.length >= 4}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <Action icon={<ImageIcon />} />

              <input
                ref={fileInputRef}
                id="media"
                className={styles.fileInput}
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
            </button>

            <button
              type="button"
              className={styles.action}
              aria-label="Add a GIF"
              data-title="GIF"
              tabIndex={0}
            >
              <Action icon={<GifIcon />} />
            </button>

            {!isInspectModal && (
              <span className={styles.hide}>
                <button
                  type="button"
                  className={styles.action}
                  aria-label="Add poll"
                  data-title="Poll"
                  tabIndex={0}
                >
                  <Action icon={<PollIcon />} />
                </button>
              </span>
            )}

            <EmojiButton setText={setText} inputId={inputId} />

            {!isInspectModal && (
              <span className={styles.hide}>
                <button
                  type="button"
                  className={styles.action}
                  aria-label="Schedule Post"
                  data-title="Schedule"
                  tabIndex={0}
                >
                  <Action icon={<ScheduleIcon />} />
                </button>
              </span>
            )}

            <button
              type="button"
              className={styles.action}
              aria-label="Tag Location"
              data-title="Location"
              tabIndex={0}
            >
              <Action icon={<LocationIcon />} />
            </button>
          </div>

          <div className={styles.buttons}>
            {text.length > 0 && <TextProgressBar progress={text.length} />}
            <button
              type="button"
              aria-label="Add Post"
              tabIndex={0}
              onClick={() =>
                mutation.mutate({
                  text: text.trim(),
                  userId: session?.user?.id,
                  files: chosenImages.map((img) => img.file),
                  in_reply_to_screen_name,
                  in_reply_to_status_id,
                  quoted_post_id: quoted_post ? quoted_post.id : null,
                })
              }
              disabled={
                (text.length === 0 || text.length > 280) &&
                chosenImages.length === 0
              }
              className={styles.postButton}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
