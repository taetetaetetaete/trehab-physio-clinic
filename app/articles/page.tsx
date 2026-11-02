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
    <header className="trehab-articles-hero"><div className="shell"><p className="section-kicker">TREHAB KNOWLEDGE</p><h1>บทความกายภาพบำบัด<br/><span>การเคลื่อนไหวและกีฬา</span></h1><p>คำตอบที่อ่านง่ายเกี่ยวกับอาการปวด การบาดเจ็บจากกีฬา การฟื้นฟู และการเตรียมความพร้อมก่อนกลับไปทำกิจกรรม จาก TREHAB Physiotherapy Clinic เชียงราย โดยไม่ใช้แทนการตรวจประเมินเฉพาะบุคคล</p></div></header>
    <section className="trehab-articles-list" aria-labelledby="article-list-title"><div className="shell"><div className="trehab-articles-heading"><div><p className="section-kicker">LATEST ARTICLES</p><h2 id="article-list-title">บทความล่าสุด</h2></div><p>เลือกอ่านตามอาการหรือเป้าหมาย เพื่อเข้าใจทางเลือกในการดูแลและเตรียมคำถามก่อนเข้ารับการประเมิน</p></div><div className="trehab-article-grid">{articles.map((article,index)=><article className="trehab-article-card" key={article.slug}><Link className="trehab-article-image" href={`/articles/${article.slug}`} aria-label={`อ่าน ${article.title}`}><Image src={article.image} fill sizes="(max-width: 760px) 100vw, 33vw" alt={article.imageAlt} loading={index < 3 ? "eager" : "lazy"}/></Link><div className="trehab-article-card-content"><div className="trehab-article-meta"><span>{String(index+1).padStart(2,"0")}</span><b>บทความสุขภาพ</b></div><p className="trehab-article-category">{article.category}</p><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><div className="trehab-article-card-footer"><span>{article.updatedAt ? `อัปเดต ${article.updatedAt}` : article.readingTime}</span><Link href={`/articles/${article.slug}`}>อ่านบทความ <span aria-hidden="true">→</span></Link></div></div></article>)}</div></div></section>
    <section className="trehab-articles-cta"><div className="shell"><div><p className="section-kicker light">PERSONAL ASSESSMENT</p><h2>มีอาการหรือมีเป้าหมาย<br/>ที่ต้องการคำแนะนำเฉพาะบุคคล?</h2></div><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ปรึกษาผ่าน LINE <span aria-hidden="true">→</span></a></div></section>
    <footer className="trehab-policy-footer"><div className="shell"><p>© {new Date().getFullYear()} TREHAB Physiotherapy Clinic. All rights reserved.</p><Link href="/">กลับสู่เว็บไซต์หลัก</Link></div></footer>
  </main>;
}
