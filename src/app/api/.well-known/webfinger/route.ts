import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    subject: "acct:Albert@mastodon.social",
    aliases: [
      "https://mastodon.social/@Albert",
      "https://mastodon.social/users/Albert",
    ],
    links: [
      {
        rel: "http://webfinger.net/rel/profile-page",
        type: "text/html",
        href: "https://mastodon.social/@Albert",
      },
      {
        rel: "self",
        type: "application/activity+json",
        href: "https://mastodon.social/users/Albert",
      },
      {
        rel: "http://ostatus.org/schema/1.0/subscribe",
        template: "https://mastodon.social/authorize_interaction?uri={uri}",
      },
    ],
  });
}
