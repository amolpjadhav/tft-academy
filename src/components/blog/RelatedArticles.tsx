import Link from "next/link";

interface RelatedPost {
  href: string;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
}

interface RelatedArticlesProps {
  posts: RelatedPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;
  return (
    <div className="mt-8">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3">
        Related Articles
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group flex flex-col gap-1.5 bg-bg-surface border border-white/8 hover:border-accent-gold/25 rounded-xl p-4 transition-all hover:-translate-y-0.5"
          >
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border self-start ${post.categoryColor}`}>
              {post.category}
            </span>
            <p className="text-text-secondary group-hover:text-text-primary text-xs font-semibold leading-snug transition-colors">
              {post.title}
            </p>
            <p className="text-text-muted/60 text-[10px]">{post.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
