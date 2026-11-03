import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, findArticle } from "../article-data";

type PageProps = { params: Promise<{ slug: string }> };

const SITE_URL = "https://www.trehabphysio.com";
const editorialNarratives: Record<string, { opening: string; closing: string }> = {
  "frozen-shoulder-vs-shoulder-pain": {
    opening: "เสื้อที่เคยสวมง่ายอาจเริ่มใส่ยาก มือที่เคยเอื้อมหยิบของบนชั้นกลับไปไม่ถึง—อาการแบบนี้ทำให้หลายคนนึกถึงคำว่า ‘ข้อไหล่ติด’ แต่ความปวดและความฝืดของไหล่มีหลายรูปแบบ เรื่องนี้จึงเริ่มจากการสังเกตว่าไหล่ติดจริง หรือกำลังปวดจนไม่กล้าขยับ",
    closing: "การฟื้นฟูไหล่ไม่ใช่การแข่งขันกับองศา แต่เป็นการค่อย ๆ คืนความสบาย ความคล่องตัว และกำลังให้กับกิจกรรมจริง เมื่อรู้ว่าปัญหาเป็นแบบใด เราจะเลือกจังหวะการเคลื่อนไหวได้เหมาะสมกว่าเดิม",
  },
  "neck-pain-radiating-arm-vs-office-syndrome": {
    opening: "คอที่ตึงหลังจ้องจอนานกับอาการที่แล่นลงไปถึงปลายนิ้วอาจเริ่มในวันทำงานเหมือนกัน แต่ส่งสัญญาณคนละแบบ บทความนี้ชวนแยกความเมื่อยล้าจากงานออกจากอาการที่ระบบประสาทอาจเข้ามาเกี่ยวข้อง โดยไม่ทำให้ทุกความรู้สึกร้าวกลายเป็นเรื่องน่ากลัว",
    closing: "สิ่งสำคัญไม่ใช่การตั้งชื่ออาการให้เร็วที่สุด แต่คือการสังเกตว่าความรู้สึกเปลี่ยนไปอย่างไร กำลังแขนและมือยังทำงานดีหรือไม่ และกิจกรรมใดช่วยหรือกระตุ้น ข้อมูลเหล่านี้จะพาเราไปสู่แผนดูแลที่ตรงกว่า",
  },
  "lateral-hip-pain-when-side-lying": {
    opening: "บางคืนสะโพกด้านข้างทำให้เราต้องพลิกตัวครั้งแล้วครั้งเล่า อาการที่ดูเหมือนเกิดเฉพาะบนเตียงอาจเกี่ยวข้องกับแรงกดและความสามารถของเอ็นกล้ามเนื้อสะโพกตลอดทั้งวัน ตั้งแต่การยืน เดิน ขึ้นบันได ไปจนถึงการวิ่ง",
    closing: "คืนที่นอนสบายขึ้นอาจเริ่มจากหมอนหนึ่งใบ แต่การกลับไปเดินหรือวิ่งอย่างมั่นใจต้องอาศัยการสร้างความสามารถของสะโพกทีละขั้น ปรับแรงกดในวันนี้ แล้วค่อยเพิ่มแรงที่ร่างกายพร้อมรับในวันถัดไป",
  },
  "tennis-elbow-vs-golfers-elbow": {
    opening: "ชื่อหนึ่งพาไปที่คอร์ต อีกชื่อพาไปที่สนามกอล์ฟ แต่คนที่ไม่เคยจับไม้กีฬาก็ปวดข้อศอกแบบเดียวกันได้ เบาะแสสำคัญอยู่ที่ด้านนอกหรือด้านในข้อศอก และแรงแบบใดที่เอ็นต้องรับซ้ำ ๆ ในงานและการออกกำลังกาย",
    closing: "เอ็นฟื้นตัวได้เมื่อได้รับภาระที่พอดี เป้าหมายจึงไม่ใช่หยุดใช้แขนไปตลอด แต่เป็นการจัดงานและการฝึกให้เหมาะ ก่อนค่อย ๆ สร้างกำลังจับ ยก ดึง และเล่นกีฬาให้กลับมาเป็นธรรมชาติอีกครั้ง",
  },
  "back-pain-radiating-leg-not-always-disc-herniation": {
    opening: "ทันทีที่อาการจากหลังเดินทางลงมาที่ขา หลายคนเห็นภาพหมอนรองกระดูกกำลังกดเส้นประสาท แต่คำว่า ‘ร้าว’ เป็นเพียงจุดเริ่มต้นของการสืบเรื่อง ไม่ใช่คำตอบสุดท้าย เพราะกล้ามเนื้อ ข้อต่อ ระบบประสาท และสะโพกสามารถเล่าเรื่องผ่านขาได้เช่นกัน",
    closing: "อาการร้าวลงขาไม่จำเป็นต้องจบที่ความกลัวภาพ MRI การประเมินที่ดีจะช่วยแยกสัญญาณสำคัญและเลือกกิจกรรมที่ยังทำได้ จากนั้นจึงสร้างความสามารถกลับคืนทีละส่วน พร้อมส่งต่อเมื่อพบสิ่งที่ต้องได้รับการดูแลเฉพาะทาง",
  },
  "low-back-pain-physiotherapy": {
    opening: "เช้าวันหนึ่งคุณก้มผูกเชือกรองเท้า แล้วหลังส่งสัญญาณตึงขึ้นมา ความคิดแรกอาจเป็นว่า ‘ควรหยุดขยับไหม’ แต่เรื่องของอาการปวดหลังมักมีรายละเอียดมากกว่านั้น บทความนี้ชวนค่อย ๆ อ่านสัญญาณของร่างกาย แยกสิ่งที่ควรระวัง และมองหาจุดเริ่มต้นของการเคลื่อนไหวที่เหมาะกับคุณ",
    closing: "ปลายทางของการฟื้นฟูหลังไม่ใช่การระวังทุกท่า แต่คือการกลับไปก้ม ยก เดิน ทำงาน และออกกำลังกายได้ด้วยความเข้าใจร่างกายมากขึ้น เริ่มจากเป้าหมายเล็ก ๆ ที่ทำได้ แล้วค่อยเพิ่มความท้าทายตามการตอบสนองของร่างกาย",
  },
  "knee-pain-walking-running-stairs": {
    opening: "บันไดเพียงไม่กี่ขั้นอาจทำให้บางคนเริ่มฟังเสียงเข่าของตัวเองชัดขึ้น ทั้งความตึง ความล้า หรืออาการปวดหน้าเข่า ข่าวดีคือเข่าเป็นข้อต่อที่ปรับตัวได้ เมื่อเราเข้าใจภาระที่เข่าต้องรับและค่อย ๆ สร้างความแข็งแรงให้เหมาะกับกิจกรรม",
    closing: "การกลับมาใช้เข่าอย่างมั่นใจเกิดจากความสม่ำเสมอมากกว่าการเร่งรีบ ลองสังเกตอาการหลังทำกิจกรรม ฝึกกำลังในระดับที่ควบคุมได้ และค่อย ๆ เพิ่มระยะหรือความหนัก—ทุกก้าวเล็ก ๆ คือข้อมูลที่ช่วยให้แผนฟื้นฟูแม่นยำขึ้น",
  },
  "plantar-heel-pain-return-to-walking-running": {
    opening: "ก้าวแรกหลังตื่นนอนควรเป็นจังหวะเริ่มต้นของวัน แต่สำหรับคนที่ปวดส้นเท้า ก้าวนั้นอาจทำให้ต้องชะงัก รองช้ำไม่ได้หมายความว่าต้องหยุดเดินหรือเลิกวิ่งเสมอไป หากเราเข้าใจการรับแรงของเท้าและวางจังหวะการฟื้นฟูทีละขั้น",
    closing: "เท้าที่กลับมารับแรงได้ดีสร้างจากการดูแลหลายส่วนร่วมกัน ทั้งการจัดปริมาณกิจกรรม ความยืดหยุ่น ความแข็งแรง และการเพิ่มระยะอย่างค่อยเป็นค่อยไป เป้าหมายไม่ใช่เพียงเดินโดยไม่กังวล แต่คือกลับไปใช้เท้าในกิจกรรมที่คุณรักได้อีกครั้ง",
  },
  "return-to-running-after-injury": {
    opening: "หลังพักจากการบาดเจ็บ รองเท้าวิ่งคู่เดิมอาจให้ทั้งความคิดถึงและความไม่แน่ใจ การกลับไปวิ่งจึงไม่ควรเริ่มด้วยคำถามว่า ‘วิ่งได้หรือยัง’ เพียงอย่างเดียว แต่ควรถามต่อว่า ร่างกายพร้อมรับระยะ ความเร็ว และจำนวนวันที่ฝึกแค่ไหน",
    closing: "Return to Running ที่ดีไม่ใช่การรีบกลับไปทำสถิติเดิม แต่คือการสร้างความต่อเนื่องโดยที่ร่างกายรับมือได้ เริ่มจาก Walk–Run เก็บข้อมูลหลังการฝึก และเพิ่มตัวแปรทีละอย่าง ความมั่นใจจะค่อย ๆ กลับมาพร้อมความสามารถของร่างกาย",
  },
  "return-to-sport-readiness": {
    opening: "วันที่อาการปวดลดลงเป็นวันที่น่ายินดี แต่สนามกีฬายังต้องการมากกว่าการใช้ชีวิตประจำวันได้ การเร่ง หยุด เปลี่ยนทิศ กระโดด และตัดสินใจภายใต้ความกดดัน ล้วนเป็นบททดสอบที่ควรเตรียมให้พร้อมก่อนกลับไปเล่นเต็มรูปแบบ",
    closing: "ความพร้อมกลับสู่กีฬาไม่ใช่คำตอบแบบผ่านหรือไม่ผ่านในวันเดียว แต่เป็นกระบวนการต่อเนื่องจากกลับไปฝึก กลับไปเล่น และกลับไปแข่งขัน เมื่อผลทดสอบ ความรู้สึกมั่นใจ และภาระการฝึกเดินไปด้วยกัน การกลับสู่สนามจะมีทิศทางชัดขึ้น",
  },
  "manual-lymphatic-drainage-athlete-recovery": {
    opening: "หลังการแข่งขัน ร่างกายไม่ได้ต้องการเพียงการพัก แต่ต้องการเวลาจัดการกับความล้าและภาระที่สะสม Manual Lymphatic Drainage เป็นหนึ่งในวิธีที่ถูกพูดถึงในวงการกีฬา บทความนี้ชวนดูว่ามันทำงานอย่างไร เหมาะกับสถานการณ์ใด และควรวางไว้ตรงไหนของแผนฟื้นตัว",
    closing: "การฟื้นตัวที่ดีไม่มีเทคนิคเดียวเป็นพระเอก การนอน โภชนาการ การจัด Training Load และการเคลื่อนไหวเบา ๆ ยังเป็นพื้นฐานสำคัญ ส่วน MLD อาจเป็นตัวช่วยเมื่อมีข้อบ่งชี้และผ่านการประเมินอย่างเหมาะสม",
  },
  "what-is-physical-therapy": {
    opening: "หลายคนรู้จักกายภาพบำบัดในวันที่เริ่มปวด แต่เบื้องหลังห้องรักษาคือกระบวนการค้นหาว่าอะไรทำให้กิจกรรมที่เคยง่ายกลายเป็นเรื่องยาก จากนั้นจึงออกแบบเส้นทางกลับไปทำงาน เดิน วิ่ง หรือเล่นกีฬาให้เข้ากับชีวิตของแต่ละคน",
    closing: "กายภาพบำบัดจึงไม่ใช่เพียงช่วงเวลาบนเตียงรักษา แต่เป็นการเรียนรู้ร่างกาย ทดลองการเคลื่อนไหว และสร้างความสามารถกลับคืนทีละส่วน เมื่อเป้าหมายชัด การประเมินและโปรแกรมฝึกก็จะมีความหมายกับชีวิตจริงมากขึ้น",
  },
  "office-syndrome-warning-signs": {
    opening: "วันทำงานอาจเริ่มจากอีเมลหนึ่งฉบับ แล้วจบลงพร้อมคอที่ตึงและไหล่ที่หนัก อาการเหล่านี้ไม่จำเป็นต้องทำให้เรากลัวการนั่งทำงาน แต่กำลังชวนให้มองใหม่ทั้งเรื่องท่าทาง จังหวะพัก และความแข็งแรงที่ร่างกายใช้ตลอดวัน",
    closing: "โต๊ะทำงานที่ดีช่วยได้ แต่ร่างกายที่ได้เปลี่ยนท่าและเคลื่อนไหวสม่ำเสมอช่วยได้มากกว่า เลือก Movement Break ที่ทำได้จริงวันละหลายครั้ง แล้วเสริมด้วยการออกกำลังกายที่เหมาะกับคุณ ความสบายระหว่างวันทำงานสามารถค่อย ๆ สร้างได้",
  },
  "hot-or-cold-therapy": {
    opening: "เมื่อมีอาการปวด คำถามคลาสสิกมักเกิดขึ้นทันที—ควรหยิบถุงเย็นหรือกระเป๋าน้ำร้อน? ทั้งสองอย่างมีบทบาทต่างกัน และคำตอบที่เหมาะไม่ได้ขึ้นกับชื่ออาการเพียงอย่างเดียว แต่ขึ้นกับเวลา เป้าหมาย และการตอบสนองของร่างกาย",
    closing: "ความร้อนและความเย็นเป็นเครื่องมือช่วยจัดการอาการ ไม่ใช่ปลายทางของการฟื้นฟู ใช้เพื่อให้รู้สึกสบายและขยับได้ดีขึ้น จากนั้นจึงกลับไปสู่การเคลื่อนไหวและการเพิ่มความสามารถของร่างกายอย่างเหมาะสม",
  },
  "acute-injury-rice-police-peace-love": {
    opening: "วินาทีหลังข้อเท้าพลิกหรือกล้ามเนื้อสะดุ้งเจ็บ ทุกคนอยากทำสิ่งที่ถูกต้องทันที แนวคิดการดูแลการบาดเจ็บจึงเปลี่ยนจาก RICE มาสู่ POLICE และ PEACE & LOVE เพื่อให้การดูแลระยะแรกเชื่อมต่อกับการกลับมาเคลื่อนไหวในระยะถัดไป",
    closing: "การดูแลการบาดเจ็บที่ดีเริ่มจากความสงบและการประเมิน ก่อนค่อย ๆ คืนการเคลื่อนไหวและภาระให้เนื้อเยื่ออย่างเหมาะสม หลักการต่าง ๆ เป็นเข็มทิศ แต่แผนที่ดีที่สุดยังต้องปรับตามชนิดการบาดเจ็บ กีฬา และเป้าหมายของแต่ละคน",
  },
};
const articleKeywords: Record<string, string[]> = {
  "frozen-shoulder-vs-shoulder-pain": ["ข้อไหล่ติด", "Frozen Shoulder", "ปวดไหล่", "กายภาพบำบัดข้อไหล่ติด", "กายภาพบำบัดเชียงราย"],
  "neck-pain-radiating-arm-vs-office-syndrome": ["ปวดคอร้าวลงแขน", "Cervical Radiculopathy", "ออฟฟิศซินโดรม", "ปวดคอ บ่า ไหล่", "กายภาพบำบัดเชียงราย"],
  "lateral-hip-pain-when-side-lying": ["ปวดสะโพกด้านข้าง", "Gluteal Tendinopathy", "Greater Trochanteric Pain Syndrome", "นอนตะแคงแล้วปวดสะโพก", "กายภาพบำบัดเชียงราย"],
  "tennis-elbow-vs-golfers-elbow": ["Tennis Elbow", "Golfer's Elbow", "ปวดข้อศอก", "เอ็นข้อศอก", "กายภาพบำบัดเชียงราย"],
  "back-pain-radiating-leg-not-always-disc-herniation": ["ปวดหลังร้าวลงขา", "Sciatica", "หมอนรองกระดูกทับเส้น", "กายภาพบำบัดปวดหลัง", "กายภาพบำบัดเชียงราย"],
  "low-back-pain-physiotherapy": ["ปวดหลัง", "กายภาพบำบัดปวดหลัง", "ปวดหลังเชียงราย", "Exercise Therapy", "คลินิกกายภาพบำบัดเชียงราย"],
  "knee-pain-walking-running-stairs": ["ปวดเข่า", "ปวดเข่าเวลาขึ้นบันได", "กายภาพบำบัดเข่า", "Patellofemoral Pain", "กายภาพบำบัดเชียงราย"],
  "plantar-heel-pain-return-to-walking-running": ["รองช้ำ", "ปวดส้นเท้า", "Plantar Heel Pain", "กายภาพบำบัดนักวิ่ง", "กายภาพบำบัดเชียงราย"],
  "return-to-running-after-injury": ["Return to Running", "กลับไปวิ่งหลังบาดเจ็บ", "Running Rehabilitation", "กายภาพบำบัดนักวิ่ง", "เชียงราย"],
  "return-to-sport-readiness": ["Return to Sport", "Sports Rehabilitation", "ประเมินก่อนกลับไปเล่นกีฬา", "กายภาพบำบัดนักกีฬา", "เชียงราย"],
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
  const narrative = editorialNarratives[article.slug] ?? { opening: article.excerpt, closing: "ความเข้าใจร่างกายคือจุดเริ่มต้นของการฟื้นฟูที่เหมาะสม ลองนำข้อมูลในบทความไปสังเกตการตอบสนองของตัวเอง และขอคำแนะนำเฉพาะบุคคลเมื่อคุณต้องการแผนที่ชัดเจนขึ้น" };
  const researchNotesBySection = new Map<number, NonNullable<typeof article.sources>>();
  (article.sources ?? []).forEach((source, sourceIndex, sourceList) => {
    const target = Math.max(0, Math.min(article.sections.length - 2, Math.round(((sourceIndex + 1) * article.sections.length) / (sourceList.length + 1)) - 1));
    researchNotesBySection.set(target, [...(researchNotesBySection.get(target) ?? []), source]);
  });
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
      <header className="trehab-article-detail-header"><div className="shell"><div className="trehab-article-breadcrumb"><Link href="/articles">TREHAB JOURNAL</Link><span aria-hidden="true">/</span><span>{article.category}</span></div><p className="section-kicker">{article.category}</p><h1>{article.title}</h1><p className="trehab-article-lead">{article.excerpt}</p><div className="trehab-article-byline"><span>เรื่องโดยทีมนักกายภาพบำบัด TREHAB</span><span>{article.readingTime}</span><span>ทบทวนข้อมูล {article.updatedAt ?? "31 สิงหาคม 2569"}</span><span>อ้างอิงงานวิจัย {article.sources?.length ?? 0} แหล่ง</span></div></div></header>
      <div className="trehab-article-cover shell"><Image src={article.image} fill sizes="(max-width: 900px) 100vw, 1100px" alt={article.imageAlt} priority/></div>
      {article.exerciseGuide && <section className="trehab-exercise-guide shell" aria-labelledby="exercise-guide-title">
        <p className="section-kicker">MOVEMENT BREAK</p>
        <h2 id="exercise-guide-title">{article.exerciseGuide.heading}</h2>
        <div className="trehab-exercise-guide-image"><Image src={article.exerciseGuide.image} fill sizes="(max-width: 900px) 100vw, 1100px" alt={article.exerciseGuide.imageAlt} loading="lazy"/></div>
        <ol>{article.exerciseGuide.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        <p className="trehab-exercise-guide-note">ท่ายืดอาจไม่เหมาะกับทุกคน หากทำแล้วมีอาการปวด ชา เวียนศีรษะ หรืออาการผิดปกติเพิ่มขึ้น ควรหยุดและปรึกษานักกายภาพบำบัดหรือบุคลากรทางการแพทย์</p>
      </section>}
      <section className="trehab-magazine-opener shell" aria-label="บทนำ"><div><span>OPENING STORY</span><p>{narrative.opening}</p></div><blockquote>“เราไม่ได้กำลังอ่านเพื่อตามหาเพียงวิธีลดอาการ แต่กำลังทำความเข้าใจเส้นทางกลับไปใช้ร่างกายในแบบที่ต้องการ”</blockquote></section>
      <div className="trehab-article-body shell"><aside><div className="trehab-magazine-aside-note"><p className="trehab-aside-label">FROM THE PHYSIO</p><p>เราเล่าเรื่องสุขภาพด้วยภาษาที่อ่านง่าย และวางงานวิจัยไว้ข้างบทสนทนา เพื่อให้ข้อมูลวิชาการเชื่อมกับชีวิตจริงมากที่สุด</p></div><nav className="trehab-magazine-toc" aria-label="สารบัญบทความ"><p className="trehab-aside-label">IN THIS STORY</p><ol>{article.sections.map((section,index)=><li key={section.heading}><a href={`#section-${index+1}`}><span>{String(index+1).padStart(2,"0")}</span>{section.heading}</a></li>)}</ol></nav><a className="trehab-magazine-line-link" href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ชวนเราคุยเรื่องอาการของคุณ →</a></aside><div>{article.sections.map((section,index)=><div className="trehab-magazine-chapter" key={section.heading}><section className={index === 0 ? "trehab-article-quick-answer" : undefined} aria-labelledby={`section-${index+1}`}>{index === 0 && <p className="trehab-quick-answer-label">THE BIG PICTURE — เริ่มอ่านตรงนี้</p>}<span className="trehab-article-section-number">{String(index+1).padStart(2,"0")}</span><h2 id={`section-${index+1}`}>{section.heading}</h2>{section.paragraphs?.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>{researchNotesBySection.get(index)?.map((source,sourceIndex)=><aside className="trehab-research-interlude" key={source.url} aria-label="งานวิจัยประกอบ"><span>RESEARCH NOTE {String(sourceIndex+1).padStart(2,"0")}</span><p>หลักฐานชิ้นนี้เป็นหนึ่งในแหล่งข้อมูลที่ช่วยวางบริบทให้กับประเด็นข้างต้น และสามารถเปิดอ่านรายละเอียดต้นฉบับเพิ่มเติมได้</p><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></aside>)}</div>)}<section className="trehab-magazine-ending" aria-labelledby="magazine-ending-title"><span>THE TAKEAWAY</span><h2 id="magazine-ending-title">เมื่ออ่านมาถึงตรงนี้</h2><p>{narrative.closing}</p></section>{article.sources&&<section className="trehab-article-sources" aria-labelledby="article-sources"><span className="trehab-article-section-number">FULL REFERENCE LIST</span><h2 id="article-sources">งานวิจัยที่ใช้ประกอบบทความ</h2><p>เราเลือกแหล่งข้อมูลจากวารสารวิชาการ แนวทางเวชปฏิบัติ และองค์กรสุขภาพที่ตรวจสอบย้อนกลับได้ เพื่อให้ผู้อ่านไปสำรวจรายละเอียดต่อได้ด้วยตนเอง</p><ol>{article.sources.map((source,index)=><li key={source.url}><span>{String(index+1).padStart(2,"0")}</span><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ol></section>}<div className="trehab-article-warning"><h2>อ่านแล้ว ลองฟังร่างกายตัวเองต่ออีกนิด</h2><p>แต่ละคนมีจังหวะการฟื้นตัวต่างกัน หากมีอาการใหม่ อาการเปลี่ยนไป หรือไม่แน่ใจว่าควรเริ่มตรงไหน การประเมินกับนักกายภาพบำบัดจะช่วยเปลี่ยนข้อมูลทั่วไปให้เป็นแผนที่เหมาะกับคุณมากขึ้น</p></div><section className="trehab-article-conversion" aria-labelledby="article-conversion-title"><p className="section-kicker light">YOUR NEXT MOVE</p><h2 id="article-conversion-title">เริ่มจากเป้าหมายที่คุณอยากกลับไปทำ</h2><p>ไม่ว่าจะเป็นการทำงานโดยสบายขึ้น กลับไปวิ่ง หรือลงสนามอีกครั้ง ทีมนักกายภาพบำบัด TREHAB พร้อมประเมินและวางแผนฟื้นฟูร่วมกับคุณแบบค่อยเป็นค่อยไป</p><div><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">เล่าอาการผ่าน LINE</a><a href="tel:0929390919">โทร 092-939-0919</a></div></section><section className="trehab-related-articles" aria-labelledby="related-articles-title"><span className="trehab-article-section-number">READ NEXT</span><h2 id="related-articles-title">อ่านเรื่องต่อไป</h2><div>{relatedArticles.map((item)=><article key={item.slug}><Link href={`/articles/${item.slug}`}><span className="trehab-related-image"><Image src={item.image} fill sizes="(max-width: 700px) 100vw, 230px" alt={item.imageAlt} loading="lazy"/></span><strong>{item.title}</strong><small>อ่านเรื่องนี้ →</small></Link></article>)}</div></section><div className="trehab-article-return"><Link href="/articles">← กลับไปเลือกบทความอื่น</Link></div></div></div>
    </article>
    <footer className="trehab-policy-footer"><div className="shell"><p>© {new Date().getFullYear()} TREHAB Physiotherapy Clinic. All rights reserved.</p><Link href="/">กลับสู่เว็บไซต์หลัก</Link></div></footer>
  </main>;
}
