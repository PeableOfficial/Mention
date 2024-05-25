<a href="https://mention.earth/" target="_blank" rel="noopener">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="" />
    <img alt="Mention" src="" />
  </picture>
</a>

<div align="center">
  <h1>Mention</h1>
  <h3>Mention client<br />built with Next.js, React Query,<br /> Prisma, PostgreSQL, and Supabase.</h3>
  
  <br />
  <figure>
    <img src="https://raw.githubusercontent.com/OxyHQ/Mention/main/public/MentionBanner.png" alt="Mention" />
  </figure>
</div>

<div align="center">
  <img src="https://img.shields.io/github/stars/OxyHQ/Mention?style=flat" height="20">
  <img src="https://img.shields.io/github/commit-activity/m/OxyHQ/Mention" height="20">
  <img src="https://img.shields.io/github/deployments/OxyHQ/Mention/Production?label=vercel&logo=vercel&logoColor=white" height="20">
  <a href="https://twitter.com/OxyHQ?ref_src=twsrc%5Etfw" target="_blank"><img src="https://img.shields.io/twitter/follow/OxyHQ?style=social" height="20"></a>
</div>

<br />

## Features

Mention users can:

- 📱 View the optimal layout for the interface depending on their device's screen size
- 🎨 Tailor the interface to their preferences with custom themes and colors
- 🔑 Sign in with Oxy
- 🎨 Customize profile (upload profile and banner images, change name, add description, location, and website)
- 👀 See what other users are posting about and inspect their activity such as likes, reposts, and comments.
- 📷 Share their moments - create and upload posts with up to 4 images.
- 💬 Engage in conversation by replying to posts
- ❤️ Give their approval with a like, or take it back
- 🔄 Repost and quote posts - Share a post with their followers by reposting or quote it with their own thoughts and comments.
- 🔖 Save posts for later and organize them with bookmarks
- 🔥 View trending hashtags and create their own by including them in their posts
- 👥 Discover and follow other users, as well as inspect their profiles and posts.
- 📩 Send and receive direct messages

## Development workflow

Mention uses [pnpm](https://pnpm.io/) as a package manager, so make sure to [install](https://pnpm.io/installation) it first.

```bash
git clone https://github.com/OxyHQ/Mention.git
cd Mention
pnpm install
pnpm run dev
```

### Environment Variables

Before running the development server, make sure to create `.env` and `.env.local` files in the root directory of the project and add the required environment variables. You can use the examples provided in the repository as a starting point: [.env.example](https://github.com/OxyHQ/Mention/blob/main/.env.axample) and [.env.local.example](https://github.com/OxyHQ/Mention/blob/main/.env.local.example).

```bash
cp .env.example .env
cp .env.local.example .env.local
```

### Prisma

Mention uses [Prisma](https://www.prisma.io/) as an ORM to interact with the database. Before running the development server, make sure to generate the Prisma client by running:

```bash
pnpm prisma generate
```

After generating the Prisma client, make sure to also push any changes to the database schema by running:

```bash
pnpm prisma db push
```

This ensures that the local database is up-to-date with any changes made to the schema in the codebase.

## Contributing

- Missing something or found a bug? [Report here](https://github.com/OxyHQ/Mention/issues).
- Want to contribute? Check out our [contribution guide](https://github.com/OxyHQ/Mention/blob/main/CONTRIBUTING.md) and our [TODO list](https://github.com/OxyHQ/Mention/blob/main/TODO.md).

## License

Mention is licensed under the [MIT License](https://github.com/OxyHQ/Mention/blob/main/LICENSE.md).
