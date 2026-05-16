"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { getPostBySlug, blogPosts, type ContentBlock } from "@/lib/blog";

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "heading":
      return (
        <motion.h2
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-heading font-bold text-2xl text-foreground mt-10 mb-4"
        >
          {block.text}
        </motion.h2>
      );
    case "subheading":
      return (
        <motion.h3
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-heading font-semibold text-xl text-foreground mt-8 mb-3"
        >
          {block.text}
        </motion.h3>
      );
    case "paragraph":
      return (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.04 }}
          className="text-foreground/80 leading-[1.85] mb-5"
        >
          {block.text}
        </motion.p>
      );
    case "list":
      return (
        <motion.ul
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-6 ml-1"
        >
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </motion.ul>
      );
    case "quote":
      return (
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="my-8 border-l-2 border-primary pl-6 py-2 bg-primary/5 rounded-r-xl"
        >
          <p className="text-foreground/90 text-lg italic leading-relaxed mb-2">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.author && (
            <p className="text-sm text-primary font-semibold">— {block.author}</p>
          )}
        </motion.blockquote>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-0 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
              <Tag className="w-3 h-3" />
              {post.tag}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-10 pb-10 border-b border-border"
          >
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {post.readingTime}
            </span>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative h-64 sm:h-80 md:h-[440px] rounded-2xl overflow-hidden border border-border shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Article body */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excerpt lead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-foreground/70 leading-relaxed mb-8 font-medium border-l-2 border-primary pl-5"
          >
            {post.excerpt}
          </motion.p>

          {/* Content blocks */}
          <div className="prose-custom">
            {post.content.map((block, i) => renderBlock(block, i))}
          </div>

          {/* Author card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 p-6 bg-surface border border-border rounded-2xl flex items-start gap-5"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
              <Image
                src="/instructor-imgg.jpeg"
                alt={post.author}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground text-lg leading-tight">{post.author}</p>
              <p className="text-sm text-primary font-medium mb-2">{post.authorRole}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adams founded Gnosis Fundamental Music Academy with a mission to raise a generation of musicians who don&apos;t just play notes — but feel them. ABRSM certified with over 10 years of teaching experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-surface border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-2xl text-foreground mb-8"
            >
              More From Our Blog
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                      {p.tag}
                    </span>
                    <h3 className="font-heading font-bold text-base text-foreground mt-3 mb-3 group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-background text-center border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-2 text-sm uppercase tracking-widest font-semibold">Ready to start?</p>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
            Book Your GH₵47 Intro Lesson
          </h2>
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full teal-glow hover:opacity-90 transition-all"
          >
            Enrol Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
