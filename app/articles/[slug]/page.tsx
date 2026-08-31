import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, findArticle } from "../article-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | TREHAB`,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: "article", images: [article.image] },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();
  return <main className="trehab-article-detail" id="top">
    <nav className="trehab-policy-nav" aria-label="เมนูหน้าบทความ"><div className="shell"><Link className="trehab-policy-logo" href="/" aria-label="กลับหน้าหลัก TREHAB"><Image src="/assets/trehab-logo-current.svg" width={180} height={62} alt="โลโก้ TREHAB" priority/></Link><div className="trehab-article-nav"><Link href="/">หน้าหลัก</Link><Link href="/articles">บทความ</Link><Link href="/#contact">ติดต่อคลินิก</Link></div></div></nav>
    <article>
      <header className="trehab-article-detail-header"><div className="shell"><div className="trehab-article-breadcrumb"><Link href="/articles">บทความ</Link><span aria-hidden="true">/</span><span>{article.category}</span></div><p className="section-kicker">{article.category}</p><h1>{article.title}</h1><p className="trehab-article-lead">{article.excerpt}</p><div className="trehab-article-byline"><span>{article.isSample ? "บทความตัวอย่าง" : "บทความสุขภาพ"}</span><span>{article.readingTime}</span><span>ปรับปรุงล่าสุด 31 สิงหาคม 2569</span></div></div></header>
      <div className="trehab-article-cover shell"><Image src={article.image} fill sizes="(max-width: 900px) 100vw, 1100px" alt={article.imageAlt} priority/></div>
      {article.exerciseGuide && <section className="trehab-exercise-guide shell" aria-labelledby="exercise-guide-title">
        <p className="section-kicker">MOVEMENT BREAK</p>
        <h2 id="exercise-guide-title">{article.exerciseGuide.heading}</h2>
        <div className="trehab-exercise-guide-image"><Image src={article.exerciseGuide.image} fill sizes="(max-width: 900px) 100vw, 1100px" alt={article.exerciseGuide.imageAlt} loading="lazy"/></div>
        <ol>{article.exerciseGuide.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        <p className="trehab-exercise-guide-note">ท่ายืดอาจไม่เหมาะกับทุกคน หากทำแล้วมีอาการปวด ชา เวียนศีรษะ หรืออาการผิดปกติเพิ่มขึ้น ควรหยุดและปรึกษานักกายภาพบำบัดหรือบุคลากรทางการแพทย์</p>
      </section>}
      <div className="trehab-article-body shell"><aside><p>บทความนี้เป็นข้อมูลสุขภาพทั่วไป ไม่ใช้แทนการตรวจ ประเมิน วินิจฉัย หรือวางแผนการรักษาเฉพาะบุคคล</p><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ปรึกษานักกายภาพบำบัด</a></aside><div>{article.sections.map((section,index)=><section key={section.heading} aria-labelledby={`section-${index+1}`}><span className="trehab-article-section-number">{String(index+1).padStart(2,"0")}</span><h2 id={`section-${index+1}`}>{section.heading}</h2>{section.paragraphs?.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}<div className="trehab-article-warning"><h2>ข้อควรทราบ</h2><p>อาการและระยะเวลาการฟื้นฟูแตกต่างกันในแต่ละบุคคล หากมีอาการรุนแรง อาการผิดปกติใหม่ หรือสงสัยภาวะฉุกเฉิน ควรติดต่อสถานพยาบาลที่เหมาะสมทันที</p></div><div className="trehab-article-return"><Link href="/articles">← กลับไปหน้าบทความทั้งหมด</Link></div></div></div>
    </article>
    <footer className="trehab-policy-footer"><div className="shell"><p>© {new Date().getFullYear()} TREHAB Physiotherapy Clinic. All rights reserved.</p><Link href="/">กลับสู่เว็บไซต์หลัก</Link></div></footer>
  </main>;
}
