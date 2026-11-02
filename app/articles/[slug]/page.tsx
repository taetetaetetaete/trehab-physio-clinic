import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, findArticle } from "../article-data";

type PageProps = { params: Promise<{ slug: string }> };

const SITE_URL = "https://www.trehabphysio.com";
const articleKeywords: Record<string, string[]> = {
  "apbc-technique-athletes-origin-benefits": ["APBC Technique", "Manual Therapy", "Sports Rehabilitation", "กายภาพบำบัดนักกีฬา", "กายภาพบำบัดเชียงราย"],
  "manual-lymphatic-drainage-athlete-recovery": ["Manual Lymphatic Drainage", "MLD นักกีฬา", "ลดบวมหลังออกกำลังกาย", "Sports Recovery", "กายภาพบำบัดเชียงราย"],
  "what-is-physical-therapy": ["กายภาพบำบัดคืออะไร", "คลินิกกายภาพบำบัดเชียงราย", "ฟื้นฟูหลังผ่าตัด", "Stroke Rehabilitation", "IMC"],
  "office-syndrome-warning-signs": ["ออฟฟิศซินโดรม", "ปวดคอ บ่า ไหล่", "ปวดหลัง", "ท่ายืดออฟฟิศซินโดรม", "กายภาพบำบัดเชียงราย"],
  "hot-or-cold-therapy": ["ประคบร้อนหรือประคบเย็น", "แช่น้ำแข็ง", "การบาดเจ็บจากกีฬา", "Sports Recovery", "กายภาพบำบัดนักกีฬา"],
  "acute-injury-rice-police-peace-love": ["PEACE and LOVE", "RICE", "POLICE", "บาดเจ็บจากกีฬา", "Sports Rehabilitation", "Return to Sport"],
};

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
    keywords: articleKeywords[article.slug],
    authors: [{ name: "TREHAB Physiotherapy Clinic" }],
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: "article", locale: "th_TH", siteName: "TREHAB Physiotherapy Clinic", url: `${SITE_URL}/articles/${article.slug}`, images: [{ url: article.image, alt: article.imageAlt }], ...(article.publishedIso ? { publishedTime: article.publishedIso, modifiedTime: article.publishedIso } : {}) },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.image] },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();
  const relatedArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 3);
  const schema = article.publishedIso ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: "https://www.trehabphysio.com" + article.image,
    datePublished: article.publishedIso,
    dateModified: article.publishedIso,
    inLanguage: "th-TH",
    keywords: articleKeywords[article.slug]?.join(", "),
    author: { "@type": "Organization", name: "TREHAB Physiotherapy Clinic", url: SITE_URL },
    publisher: { "@type": "Organization", name: "TREHAB Physiotherapy Clinic", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/trehab-logo-blue.png` } },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
    isPartOf: { "@type": "Blog", name: "บทความกายภาพบำบัด TREHAB", url: `${SITE_URL}/articles` },
    about: article.category,
  } : null;
  const faqEntries = article.sections.filter((section) => section.heading.includes("?") && section.paragraphs?.length).slice(0, 4);
  const faqSchema = faqEntries.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((section) => ({
      "@type": "Question",
      name: section.heading.replace("คำถามที่พบบ่อย:", "").trim(),
      acceptedAnswer: { "@type": "Answer", text: section.paragraphs?.[0] ?? "" },
    })),
  } : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าหลัก", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "บทความ", item: `${SITE_URL}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/articles/${article.slug}` },
    ],
  };
  return <main className="trehab-article-detail" id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}/>
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/>} 
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>}
    <nav className="trehab-policy-nav" aria-label="เมนูหน้าบทความ"><div className="shell"><Link className="trehab-policy-logo" href="/" aria-label="กลับหน้าหลัก TREHAB"><Image src="/assets/trehab-logo-current.svg" width={180} height={62} alt="โลโก้ TREHAB" priority/></Link><div className="trehab-article-nav"><Link href="/">หน้าหลัก</Link><Link href="/articles">บทความ</Link><Link href="/#contact">ติดต่อคลินิก</Link></div></div></nav>
    <article>
      <header className="trehab-article-detail-header"><div className="shell"><div className="trehab-article-breadcrumb"><Link href="/articles">บทความ</Link><span aria-hidden="true">/</span><span>{article.category}</span></div><p className="section-kicker">{article.category}</p><h1>{article.title}</h1><p className="trehab-article-lead">{article.excerpt}</p><div className="trehab-article-byline"><span>จัดทำโดย TREHAB Physiotherapy Clinic</span><span>{article.readingTime}</span><span>ปรับปรุงล่าสุด {article.updatedAt ?? "31 สิงหาคม 2569"}</span></div></div></header>
      <div className="trehab-article-cover shell"><Image src={article.image} fill sizes="(max-width: 900px) 100vw, 1100px" alt={article.imageAlt} priority/></div>
      {article.exerciseGuide && <section className="trehab-exercise-guide shell" aria-labelledby="exercise-guide-title">
        <p className="section-kicker">MOVEMENT BREAK</p>
        <h2 id="exercise-guide-title">{article.exerciseGuide.heading}</h2>
        <div className="trehab-exercise-guide-image"><Image src={article.exerciseGuide.image} fill sizes="(max-width: 900px) 100vw, 1100px" alt={article.exerciseGuide.imageAlt} loading="lazy"/></div>
        <ol>{article.exerciseGuide.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        <p className="trehab-exercise-guide-note">ท่ายืดอาจไม่เหมาะกับทุกคน หากทำแล้วมีอาการปวด ชา เวียนศีรษะ หรืออาการผิดปกติเพิ่มขึ้น ควรหยุดและปรึกษานักกายภาพบำบัดหรือบุคลากรทางการแพทย์</p>
      </section>}
      <div className="trehab-article-body shell"><aside><p>บทความนี้เป็นข้อมูลสุขภาพทั่วไป ไม่ใช้แทนการตรวจ ประเมิน วินิจฉัย หรือวางแผนการรักษาเฉพาะบุคคล</p><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ปรึกษานักกายภาพบำบัด</a></aside><div>{article.sections.map((section,index)=><section className={index === 0 ? "trehab-article-quick-answer" : undefined} key={section.heading} aria-labelledby={`section-${index+1}`}>{index === 0 && <p className="trehab-quick-answer-label">คำตอบสั้น ๆ สำหรับผู้อ่าน</p>}<span className="trehab-article-section-number">{String(index+1).padStart(2,"0")}</span><h2 id={`section-${index+1}`}>{section.heading}</h2>{section.paragraphs?.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}{article.sources&&<section className="trehab-article-sources" aria-labelledby="article-sources"><span className="trehab-article-section-number">REF</span><h2 id="article-sources">เอกสารอ้างอิงและอ่านเพิ่มเติม</h2><ul>{article.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section>}<div className="trehab-article-warning"><h2>ข้อควรทราบ</h2><p>อาการและระยะเวลาการฟื้นฟูแตกต่างกันในแต่ละบุคคล หากมีอาการรุนแรง อาการผิดปกติใหม่ หรือสงสัยภาวะฉุกเฉิน ควรติดต่อสถานพยาบาลที่เหมาะสมทันที</p></div><section className="trehab-article-conversion" aria-labelledby="article-conversion-title"><p className="section-kicker light">PERSONAL ASSESSMENT</p><h2 id="article-conversion-title">เปลี่ยนความกังวลให้เป็นแผนฟื้นฟูที่ชัดเจน</h2><p>หากอาการปวด การบาดเจ็บ หรือข้อจำกัดในการเคลื่อนไหวกำลังรบกวนกิจกรรมที่คุณรัก เริ่มต้นได้ด้วยการประเมินจากนักกายภาพบำบัด TREHAB และวางเป้าหมายร่วมกันตามความเหมาะสมของแต่ละบุคคล</p><div><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ปรึกษาผ่าน LINE</a><a href="tel:0929390919">โทร 092-939-0919</a></div></section><section className="trehab-related-articles" aria-labelledby="related-articles-title"><span className="trehab-article-section-number">NEXT</span><h2 id="related-articles-title">บทความที่เกี่ยวข้อง</h2><div>{relatedArticles.map((item)=><article key={item.slug}><Link href={`/articles/${item.slug}`}><span className="trehab-related-image"><Image src={item.image} fill sizes="(max-width: 700px) 100vw, 230px" alt={item.imageAlt} loading="lazy"/></span><strong>{item.title}</strong><small>อ่านต่อ →</small></Link></article>)}</div></section><div className="trehab-article-return"><Link href="/articles">← กลับไปหน้าบทความทั้งหมด</Link></div></div></div>
    </article>
    <footer className="trehab-policy-footer"><div className="shell"><p>© {new Date().getFullYear()} TREHAB Physiotherapy Clinic. All rights reserved.</p><Link href="/">กลับสู่เว็บไซต์หลัก</Link></div></footer>
  </main>;
}
