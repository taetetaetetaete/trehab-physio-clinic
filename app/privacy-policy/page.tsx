import type { Metadata } from "next";
import Image from "next/image";
import { privacySections } from "./content";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | TREHAB Physiotherapy Clinic",
  description: "นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของธรีแฮปคลินิกกายภาพบำบัด",
};

export default function PrivacyPolicyPage() {
  return <main className="trehab-privacy-page" id="top">
    <nav className="trehab-policy-nav" aria-label="เมนูหน้านโยบายความเป็นส่วนตัว">
      <div className="shell">
        <a className="trehab-policy-logo" href="/" aria-label="กลับหน้าหลัก TREHAB"><Image src="/assets/trehab-logo-current.svg" width={180} height={62} alt="โลโก้ TREHAB" priority/></a>
        <a className="trehab-policy-back" href="/">← กลับหน้าหลัก</a>
      </div>
    </nav>
    <section className="trehab-privacy-policy" aria-labelledby="privacy-policy-title">
      <div className="trehab-privacy-shell shell">
        <header className="trehab-privacy-header">
          <p className="section-kicker">PRIVACY POLICY</p>
          <h1 id="privacy-policy-title">นโยบายความเป็นส่วนตัว</h1>
          <p className="trehab-privacy-brand"><strong>ธรีแฮปคลินิกกายภาพบำบัด (TREHAB Physiotherapy Clinic)</strong> ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลและความเป็นส่วนตัวของผู้เข้าชมเว็บไซต์ ผู้ติดต่อ ผู้จองนัดหมาย และผู้รับบริการ โดยดำเนินการเกี่ยวกับข้อมูลส่วนบุคคลให้สอดคล้องกับพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (Personal Data Protection Act: PDPA) และกฎหมายที่เกี่ยวข้อง</p>
          <p>นโยบายฉบับนี้จัดทำขึ้นเพื่อแจ้งให้ท่านทราบถึงแนวทางในการเก็บรวบรวม ใช้ เปิดเผย และรักษาความปลอดภัยของข้อมูลส่วนบุคคล รวมถึงสิทธิของท่านในฐานะเจ้าของข้อมูลส่วนบุคคล</p>
        </header>
        <div className="trehab-privacy-content">
          {privacySections.map((item)=><article className="trehab-privacy-article" key={item.title}>
            <h2>{item.title}</h2>
            {item.paragraphs.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}
            {item.bullets.length>0&&<ul>{item.bullets.map((bullet)=><li key={bullet}>{bullet}</li>)}</ul>}
            {item.after.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}
          </article>)}
          <article className="trehab-privacy-article trehab-privacy-contact">
            <h2>14. ช่องทางการติดต่อเกี่ยวกับข้อมูลส่วนบุคคล</h2>
            <p>หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว ต้องการใช้สิทธิในฐานะเจ้าของข้อมูลส่วนบุคคล หรือมีข้อกังวลเกี่ยวกับการประมวลผลข้อมูล สามารถติดต่อได้ที่</p>
            <address><strong>ธรีแฮปคลินิกกายภาพบำบัด<br/>TREHAB Physiotherapy Clinic</strong><br/>โทรศัพท์: <a href="tel:0929390919">092-939-0919</a><br/>อีเมล: <a href="mailto:trehab@welkub.com">trehab@welkub.com</a></address>
            <p>คลินิกจะพิจารณาและดำเนินการตามคำขอภายในระยะเวลาที่เหมาะสมและเป็นไปตามที่กฎหมายกำหนด</p>
          </article>
        </div>
        <footer className="trehab-privacy-meta"><p><strong>วันที่มีผลบังคับใช้:</strong> 30 สิงหาคม 2569</p><p><strong>ปรับปรุงล่าสุด:</strong> 30 สิงหาคม 2569</p></footer>
      </div>
    </section>
    <footer className="trehab-policy-footer"><div className="shell"><p>© {new Date().getFullYear()} TREHAB Physiotherapy Clinic. All rights reserved.</p><a href="/">กลับสู่เว็บไซต์หลัก</a></div></footer>
  </main>;
}
