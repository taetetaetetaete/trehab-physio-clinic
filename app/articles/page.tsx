import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "./article-data";

export const metadata: Metadata = {
  title: "บทความกายภาพบำบัดและการฟื้นฟู | TREHAB เชียงราย",
  description: "รวมบทความกายภาพบำบัดเชียงราย อาการปวด ออฟฟิศซินโดรม Sports Rehabilitation การฟื้นฟูนักกีฬา และ Return to Sport จาก TREHAB Physiotherapy Clinic",
  keywords: ["บทความกายภาพบำบัด", "กายภาพบำบัดเชียงราย", "Sports Rehabilitation", "ออฟฟิศซินโดรม", "การบาดเจ็บจากกีฬา", "Return to Sport"],
  alternates: { canonical: "/articles" },
  openGraph: { title: "บทความกายภาพบำบัดและการฟื้นฟู | TREHAB เชียงราย", description: "ความรู้ด้านอาการปวด การเคลื่อนไหว การฟื้นฟูนักกีฬา และการกลับไปทำกิจกรรมอย่างเหมาะสม", type: "website", locale: "th_TH", siteName: "TREHAB Physiotherapy Clinic", url: "https://www.trehabphysio.com/articles", images: [{ url: "/assets/what-is-physical-therapy.png", alt: "บทความกายภาพบำบัดจาก TREHAB Physiotherapy Clinic เชียงราย" }] },
  twitter: { card: "summary_large_image", title: "บทความกายภาพบำบัด TREHAB", description: "ความรู้ด้านอาการปวด การเคลื่อนไหว และ Sports Rehabilitation", images: ["/assets/what-is-physical-therapy.png"] },
  robots: { index: true, follow: true },
};

export default function ArticlesPage() {
  const articleListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "บทความกายภาพบำบัดและการฟื้นฟู TREHAB",
    description: metadata.description,
    url: "https://www.trehabphysio.com/articles",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.trehabphysio.com/articles/${article.slug}`,
        name: article.title,
      })),
    },
  };
  return <main className="trehab-articles-page" id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListSchema) }}/>
    <nav className="trehab-policy-nav" aria-label="เมนูหน้าบทความ"><div className="shell"><Link className="trehab-policy-logo" href="/" aria-label="กลับหน้าหลัก TREHAB"><Image src="/assets/trehab-logo-current.svg" width={180} height={62} alt="โลโก้ TREHAB" priority/></Link><div className="trehab-article-nav"><Link href="/">หน้าหลัก</Link><Link className="is-current" href="/articles" aria-current="page">บทความ</Link><Link href="/#contact">ติดต่อคลินิก</Link></div></div></nav>
    <header className="trehab-articles-hero"><div className="shell"><p className="section-kicker">TREHAB JOURNAL</p><h1>เรื่องราวของร่างกาย<br/><span>ที่อ่านแล้วอยากขยับ</span></h1><p>บทความกายภาพบำบัดที่ชวนคุยด้วยภาษาง่าย ๆ เล่าจากมุมมองของนักกายภาพบำบัด และเชื่อมทุกคำแนะนำเข้ากับงานวิจัย เพื่อให้คุณเข้าใจร่างกายและเลือกดูแลตัวเองได้อย่างมั่นใจ</p><div className="trehab-editorial-promise"><span>อ่านง่าย</span><span>อ้างอิงงานวิจัย</span><span>นำไปใช้ได้จริง</span></div></div></header>
    <section className="trehab-articles-list" aria-labelledby="article-list-title"><div className="shell"><div className="trehab-articles-heading"><div><p className="section-kicker">STORIES FOR BETTER MOVEMENT</p><h2 id="article-list-title">เรื่องที่เราอยากชวนอ่าน</h2></div><p>เพราะการเข้าใจร่างกายคือจุดเริ่มต้นของการกลับไปทำสิ่งที่รัก เลือกอ่านตามอาการ เป้าหมาย หรือกิจกรรมที่คุณกำลังเตรียมกลับไปทำ</p></div><div className="trehab-article-grid">{articles.map((article,index)=><article className={`trehab-article-card${index === 0 ? " trehab-article-card-featured" : ""}`} key={article.slug}><Link className="trehab-article-image" href={`/articles/${article.slug}`} aria-label={`อ่าน ${article.title}`}><Image src={article.image} fill sizes={index === 0 ? "(max-width: 760px) 100vw, 66vw" : "(max-width: 760px) 100vw, 33vw"} alt={article.imageAlt} loading={index < 3 ? "eager" : "lazy"}/>{index === 0 && <span className="trehab-featured-label">EDITOR&apos;S PICK</span>}</Link><div className="trehab-article-card-content"><div className="trehab-article-meta"><span>{String(index+1).padStart(2,"0")}</span><b>RESEARCH-BASED</b></div><p className="trehab-article-category">{article.category}</p><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><div className="trehab-article-card-footer"><span>{article.readingTime}</span><Link href={`/articles/${article.slug}`}>อ่านเรื่องนี้ <span aria-hidden="true">→</span></Link></div></div></article>)}</div></div></section>
    <section className="trehab-articles-cta"><div className="shell"><div><p className="section-kicker light">PERSONAL ASSESSMENT</p><h2>มีอาการหรือมีเป้าหมาย<br/>ที่ต้องการคำแนะนำเฉพาะบุคคล?</h2></div><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ปรึกษาผ่าน LINE <span aria-hidden="true">→</span></a></div></section>
    <footer className="trehab-policy-footer"><div className="shell"><p>© {new Date().getFullYear()} TREHAB Physiotherapy Clinic. All rights reserved.</p><Link href="/">กลับสู่เว็บไซต์หลัก</Link></div></footer>
  </main>;
}
