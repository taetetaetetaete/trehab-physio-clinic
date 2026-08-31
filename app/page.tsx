"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";

const strengths = ["Manual Therapy", "Therapeutic Exercise", "Sports Rehabilitation", "Shockwave Therapy", "กายภาพบำบัดที่บ้าน", "เครื่องมือกายภาพบำบัดมาตรฐาน"];
const techniques = ["Joint Mobilization", "Soft Tissue Technique", "Myofascial Release", "Trigger Point Technique", "Stretching", "Movement Correction"];
const carePoints = ["ดูแลแบบ 1 ต่อ 1", "ประเมินก่อนการรักษาทุกครั้ง", "วางแผนตามอาการเฉพาะบุคคล", "ติดตามผลการรักษาอย่างต่อเนื่อง"];
const exercisePrograms = [
  { title:"กายภาพบำบัดอาการบาดเจ็บจากกีฬา", subtitle:"Sports Injury & Sports Rehabilitation", description:"ประเมินและดูแลอาการบาดเจ็บจากกีฬา รวมถึงการบาดเจ็บที่เกิดจากการออกกำลังกายอย่างเหมาะสม" },
  { title:"กายภาพบำบัดหลังผ่าตัด", subtitle:"Post-operative Rehabilitation", description:"ฟื้นฟูการเคลื่อนไหว ความแข็งแรง และสมรรถภาพภายหลังการผ่าตัดตามความเหมาะสมของแต่ละบุคคล" },
  { title:"กายภาพบำบัดอาการปวดคอ บ่า ไหล่ และหลัง", subtitle:"Neck, Shoulder & Back Pain", description:"ประเมินและดูแลอาการปวดคอ บ่า ไหล่ และปวดหลังในกลุ่มระบบกระดูกและกล้ามเนื้อ" },
  { title:"ฝึกการทรงตัวและเสริมความแข็งแรง", subtitle:"Balance & Strength Training", description:"พัฒนาการทรงตัว ความแข็งแรง และความสามารถในการเคลื่อนไหวสำหรับการใช้ชีวิตและทำกิจกรรม" },
  { title:"กายภาพบำบัดสำหรับนักวิ่ง", subtitle:"Running Rehabilitation", description:"ประเมินปัญหาการเคลื่อนไหวและฟื้นฟูอาการบาดเจ็บเฉพาะของนักวิ่ง เพื่อเตรียมกลับไปวิ่งอย่างเหมาะสม" },
  { title:"ฟื้นฟูเพื่อกลับไปเล่นกีฬา", subtitle:"Return to Sport", description:"เตรียมความพร้อมด้านการเคลื่อนไหว ความแข็งแรง และสมรรถภาพก่อนกลับไปฝึกซ้อมหรือเล่นกีฬา" },
  { title:"ประเมินและป้องกันการบาดเจ็บจากกีฬา", subtitle:"Sports Injury Prevention", description:"ประเมินการเคลื่อนไหวและปัจจัยเสี่ยง เพื่อวางแนวทางลดโอกาสเกิดการบาดเจ็บระหว่างออกกำลังกายหรือเล่นกีฬา" },
  { title:"เตรียมความพร้อมร่างกายสำหรับ Running & HYROX", subtitle:"Running & HYROX Performance", description:"เตรียมความแข็งแรง ความทนทาน และรูปแบบการเคลื่อนไหวสำหรับกิจกรรม การฝึกซ้อม หรือการแข่งขัน" },
  { title:"กายภาพบำบัดผู้ป่วยโรคหลอดเลือดสมอง", subtitle:"Stroke Rehabilitation", description:"ฟื้นฟูการเคลื่อนไหว การทรงตัว การเดิน และความสามารถในการทำกิจวัตรประจำวันสำหรับผู้ป่วยโรคหลอดเลือดสมอง" },
  { title:"ฟื้นฟูผู้ป่วยระยะกลาง (IMC)", subtitle:"Intermediate Care", description:"กายภาพบำบัดและฟื้นฟูสมรรถภาพผู้ป่วยระยะกลาง เพื่อส่งเสริมการเคลื่อนไหวและความสามารถในการทำกิจวัตรประจำวัน" },
];
const trainingTypes = ["Balance Training", "Strength Training", "Mobility", "Functional Movement"];
const fourT = [
  { letter:"T1", name:"Test", thai:"ทดสอบและประเมิน", items:["ซักประวัติ", "ประเมิน Pain Scale", "ตรวจการเคลื่อนไหว", "วิเคราะห์ท่าทางและชีวกลศาสตร์", "Movement Screening"] },
  { letter:"T2", name:"Treat", thai:"รักษา", items:["Manual Therapy", "Soft Tissue Technique", "Joint Mobilization", "เครื่องมือกายภาพบำบัดตามข้อบ่งชี้"] },
  { letter:"T3", name:"Train", thai:"ฝึกฟื้นฟู", items:["Therapeutic Exercise", "Strength Training", "Mobility Training", "Core Stability", "Functional Rehabilitation"] },
  { letter:"T4", name:"Talent", thai:"พัฒนาศักยภาพ", items:["Return to Work", "Return to Running", "Return to Sport", "เพิ่มสมรรถภาพทางกาย", "ยกระดับคุณภาพชีวิต"] },
];
const aboutHighlights = ["ดูแลโดยผู้ประกอบวิชาชีพกายภาพบำบัด", "ตรวจประเมินก่อนวางแผนการรักษา", "ให้บริการแบบรายบุคคล", "ผสานหัตถบำบัดกับการออกกำลังกาย", "มีระบบติดตามผลการรักษา", "ให้บริการทั้งที่คลินิกและที่บ้าน"];
const therapists = [
  { name:"กภ.สุรินธร ใหม่อารินทร์", license:"ก.10926", image:"/assets/therapist-male.png", alt:"กภ.สุรินธร ใหม่อารินทร์ นักกายภาพบำบัด", education:["ปริญญาโท สาขาวิทยาศาสตร์การเคลื่อนไหวและการออกกำลังกาย มหาวิทยาลัยเชียงใหม่", "ปริญญาตรี สาขากายภาพบำบัด มหาวิทยาลัยนเรศวร", "Certified Personal Trainer FIT®"] },
  { name:"กภ.ธนัตชนก เขียวระวงค์", license:"ก.10722", image:"/assets/therapist-female.png", alt:"กภ.ธนัตชนก เขียวระวงค์ นักกายภาพบำบัด", education:["ปริญญาตรี สาขากายภาพบำบัด มหาวิทยาลัยพะเยา"] },
];
const reviewPlaceholders = ["ประเภทบริการ", "ประเภทบริการ", "ประเภทบริการ"];
const trehabConditions = ["ปวดคอ บ่า ไหล่", "ปวดหลัง", "ปวดเข่า", "ปวดสะโพก", "รองช้ำ", "Tennis / Golfer’s Elbow", "Running Injury", "Sports Injury", "อาการหลังผ่าตัด", "Return to Sport"];
const trehabSportFlow = ["Assessment", "Pain Management", "Strength & Mobility", "Movement Training", "Sport-specific Training", "Return to Sport"];
const trehabCareSteps = ["ประเมินอาการและการเคลื่อนไหว", "วางแผนการรักษาเฉพาะบุคคล", "รักษาและฟื้นฟูสมรรถภาพ", "ประเมินผลและติดตามความก้าวหน้า"];
const trehabFaqs = [
  {q:"ต้องนัดหมายก่อนเข้ารับบริการหรือไม่",a:"แนะนำให้นัดหมายล่วงหน้าผ่าน LINE @trehab หรือโทร 092-939-0919 เพื่อให้คลินิกจัดเวลาและเตรียมการประเมินได้เหมาะสม"},
  {q:"ต้องพบแพทย์ก่อนทำกายภาพบำบัดหรือไม่",a:"นักกายภาพบำบัดจะซักประวัติและตรวจประเมินก่อนให้บริการ หากพบข้อบ่งชี้ที่ควรได้รับการตรวจเพิ่มเติม จะแนะนำให้พบแพทย์หรือสถานพยาบาลที่เหมาะสม"},
  {q:"การเข้ารับบริการครั้งแรกใช้เวลาประมาณเท่าใด",a:"ระยะเวลาขึ้นอยู่กับการประเมินและบริการที่เหมาะสมกับแต่ละบุคคล กรุณาสอบถามคลินิกเมื่อทำการนัดหมาย"},
  {q:"ควรเตรียมตัวอย่างไรก่อนเข้ารับบริการ",a:"สวมเสื้อผ้าที่เคลื่อนไหวสะดวก และเตรียมข้อมูลอาการ ประวัติการรักษา ผลตรวจ หรือเอกสารที่เกี่ยวข้องหากมี"},
  {q:"มีบริการสำหรับนักกีฬาหรือไม่",a:"มีบริการ Sports Rehabilitation การประเมินการเคลื่อนไหว Running Rehabilitation และการเตรียมความพร้อมเพื่อ Return to Sport ตามผลการประเมิน"},
  {q:"มีบริการ Home Physical Therapy หรือไม่",a:"มีบริการกายภาพบำบัดที่บ้าน กรุณาติดต่อคลินิกเพื่อสอบถามพื้นที่ให้บริการและนัดหมาย"},
  {q:"สามารถออกใบเสร็จหรือเอกสารประกอบการเบิกได้หรือไม่",a:"กรุณาสอบถามรายละเอียดเอกสารและเงื่อนไขการเบิกกับคลินิกก่อนเข้ารับบริการ"},
  {q:"คลินิกมีที่จอดรถหรือไม่",a:"กรุณาติดต่อคลินิกก่อนเดินทางเพื่อสอบถามตำแหน่งและความพร้อมของพื้นที่จอดรถในวันที่นัดหมาย"},
];

function ChiangRaiLines() {
  return <svg className="chiangrai-lines" viewBox="0 0 1440 780" aria-hidden="true">
    <g className="line-back"><path d="M-30 480 130 345 242 425 365 292 514 430 668 280 815 422 970 306 1115 410 1284 266 1480 430"/><path d="M-20 556c160-55 265-38 377 4 121 45 218 58 345 0 147-68 253-59 398 1 116 47 228 43 378-14"/></g>
    <g className="landmark"><path d="M110 603h250M162 603v-120h146v120M187 483l48-75 48 75M205 459h60M221 430h28M235 408v-30M210 527h50M187 566h96"/><path d="M1068 611h264M1111 611v-203h176v203M1085 408h228M1137 408l62-83 62 83M1165 352h68M1198 325v-50M1143 463h112M1143 520h112M1143 577h112"/></g>
    <g className="motion"><path d="M30 675c230-88 382 40 570-24s337-48 481 3 258 26 391-21"/><path d="M-16 718c257-75 388 58 593-5s345-35 487 13 261 18 415-31"/></g>
    <circle className="pulse-dot dot-one" cx="420" cy="655" r="7"/><circle className="pulse-dot dot-two" cx="992" cy="675" r="7"/>
  </svg>;
}

export default function Home() {
  const athleteRef = useRef<HTMLDivElement>(null);

  const moveAthletes = (event: PointerEvent<HTMLElement>) => {
    if (!athleteRef.current || !window.matchMedia("(min-width: 1001px) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    athleteRef.current.style.setProperty("--trehab-athlete-x", `${x * 18}px`);
    athleteRef.current.style.setProperty("--trehab-athlete-y", `${y * 12}px`);
    athleteRef.current.style.setProperty("--trehab-athlete-rotate", `${x * 0.7}deg`);
  };

  const resetAthletes = () => {
    athleteRef.current?.style.removeProperty("--trehab-athlete-x");
    athleteRef.current?.style.removeProperty("--trehab-athlete-y");
    athleteRef.current?.style.removeProperty("--trehab-athlete-rotate");
  };

  return <main>
    <section className="hero" onPointerMove={moveAthletes} onPointerLeave={resetAthletes}>
      <header className="site-header">
        <nav className="nav shell" aria-label="เมนูหลัก">
          <a className="brand" href="#top" aria-label="ธรีแฮปคลินิกกายภาพบำบัด หน้าแรก"><Image src="/assets/trehab-logo-current.svg" width={220} height={83} alt="โลโก้ธรีแฮปคลินิกกายภาพบำบัด" priority/></a>
          <div className="nav-links"><a href="#manual-therapy">การรักษา</a><a href="#exercise-rehabilitation">การฟื้นฟู</a><a href="#trehab-4t">TREHAB 4T</a><a href="#physiotherapists">ทีมของเรา</a><a href="#contact">ติดต่อ</a></div>
          <div className="nav-actions"><span className="location"><i/> Chiang Rai</span><a className="nav-line" href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">LINE @trehab</a></div>
        </nav>
      </header>
      <div className="hero-background" aria-hidden="true"/><div className="hero-glow"/><ChiangRaiLines/>
      <div className="hero-copy shell" id="top">
        <p className="eyebrow">TREHAB PHYSIOTHERAPY CLINIC</p>
        <h1>บาดเจ็บจากการเล่นกีฬา<br/><span>ปรึกษานักกายภาพบำบัด</span></h1>
        <p className="hero-note">กลับไปเคลื่อนไหวอย่างมั่นใจ ด้วยการประเมิน วางแผน และดูแลอย่างเหมาะสมกับคุณ</p>
        <a className="line-button" href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer"><span className="line-mark">LINE</span>ปรึกษาผ่าน LINE<span aria-hidden="true">↗</span></a>
      </div>
      <div ref={athleteRef} className="hero-athletes trehab-athlete-parallax" aria-label="นักวิ่งและนักแบดมินตันกลับไปเล่นกีฬาอย่างมั่นใจ"><Image src="/assets/hero-return-to-sport-v2.png" fill sizes="(max-width: 900px) 92vw, 48vw" alt="นักวิ่งชายและนักแบดมินตันหญิง เห็นใบหน้าชัดเจนและกำลังกลับไปเล่นกีฬาอย่างมั่นใจ" priority unoptimized/></div>
    </section>
    <section className="strength-bar" aria-label="จุดเด่นของคลินิก"><div className="strength-track">{[...strengths,...strengths].map((item,index)=><span key={`${item}-${index}`}><b>{String(index%6+1).padStart(2,"0")}</b>{item}</span>)}</div></section>
    <section className="manual shell" id="manual-therapy">
      <div className="manual-visual"><div className="photo-frame"><Image src="/assets/manual-therapy.png" fill sizes="(max-width: 900px) 100vw, 48vw" alt="นักกายภาพบำบัดกำลังตรวจและรักษาผู้รับบริการด้วยเทคนิค Manual Therapy"/></div><div className="visual-label"><b>01</b><span>ASSESS<br/>TREAT<br/>MOVE</span></div></div>
      <div className="manual-content"><p className="section-kicker">MANUAL THERAPY</p><h2>หัตถบำบัด<br/><span>หัวใจสำคัญของการรักษา</span></h2><p className="description">Manual Therapy หรือหัตถบำบัด เป็นการตรวจประเมินและรักษาด้วยมือของนักกายภาพบำบัด โดยเลือกใช้เทคนิคให้เหมาะสมกับอาการ ข้อจำกัดในการเคลื่อนไหว และเป้าหมายของผู้รับบริการแต่ละราย</p><div className="tags" aria-label="เทคนิคหัตถบำบัด">{techniques.map(item=><span key={item}>{item}</span>)}</div><div className="care-grid">{carePoints.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></article>)}</div></div>
    </section>
    <section className="trehab-conditions" aria-labelledby="trehab-conditions-title"><div className="shell"><div className="trehab-enhance-heading"><div><p className="section-kicker">CONDITIONS WE CARE FOR</p><h2 id="trehab-conditions-title">อาการที่เราดูแล</h2></div><p>เริ่มต้นจากการตรวจประเมิน เพื่อวางแนวทางดูแลและฟื้นฟูให้เหมาะสมกับอาการและเป้าหมายของแต่ละบุคคล</p></div><div className="trehab-condition-grid">{trehabConditions.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><h3>{item}</h3></article>)}</div></div></section>
    <section className="exercise" id="exercise-rehabilitation">
      <div className="exercise-head shell trehab-service-heading">
        <div><p className="section-kicker light">EXERCISE REHABILITATION</p><h2>โปรแกรมกายภาพบำบัด<br/><span>และฟื้นฟูสมรรถภาพ</span></h2></div>
        <p><strong>ดูแลตั้งแต่อาการปวดและการบาดเจ็บ การฟื้นฟูหลังผ่าตัด ผู้ป่วยโรคหลอดเลือดสมองและผู้ป่วยระยะกลาง (IMC) ไปจนถึงการเตรียมความพร้อมเพื่อกลับไปออกกำลังกายและเล่นกีฬา</strong> โปรแกรมกายภาพบำบัดเชียงรายของ TREHAB วางแผนตามผลการประเมินและเป้าหมายของแต่ละบุคคล</p>
      </div>
      <div className="exercise-media shell">
        <div className="exercise-photo"><Image src="/assets/exercise-rehabilitation.png" fill sizes="(max-width: 900px) 100vw, 60vw" alt="นักกายภาพบำบัดแนะนำการฝึก Exercise Rehabilitation"/><div className="training-strip">{trainingTypes.map((item,index)=><span key={item}><b>0{index+1}</b>{item}</span>)}</div></div>
        <div className="program-grid trehab-service-grid">{exercisePrograms.map((item,index)=><article className="trehab-service-card" key={item.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{item.title}</h3><small className="trehab-service-subtitle">{item.subtitle}</small><p className="trehab-service-description">{item.description}</p><i aria-hidden="true">↗</i></article>)}</div>
      </div>
      <div className="exercise-action shell"><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ประเมินก่อนเริ่มโปรแกรม <span aria-hidden="true">→</span></a></div>
    </section>
    <section className="trehab-sports-rehab" aria-labelledby="trehab-sports-title"><div className="shell"><div className="trehab-enhance-heading trehab-enhance-heading-light"><div><p className="section-kicker light">SPORTS REHABILITATION</p><h2 id="trehab-sports-title">From Injury to <span>Return to Sport</span></h2></div><p>กระบวนการฟื้นฟูที่เชื่อมจากการประเมิน ไปสู่การฝึกการเคลื่อนไหวและการเตรียมความพร้อมเฉพาะกีฬา</p></div><div className="trehab-sport-flow">{trehabSportFlow.map((step,index)=><article key={step}><span>{String(index+1).padStart(2,"0")}</span><h3>{step}</h3>{index<trehabSportFlow.length-1&&<i aria-hidden="true">→</i>}</article>)}</div><a className="trehab-consistent-cta" href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ปรึกษานักกายภาพบำบัด <span aria-hidden="true">→</span></a></div></section>
    <section className="trehab-process" id="trehab-4t">
      <div className="process-heading shell"><p className="section-kicker">TREHAB METHOD</p><h2>กระบวนการดูแลแบบ <span>TREHAB 4T</span></h2><p>จากการประเมินที่ชัดเจน สู่การฝึกที่ตอบโจทย์ และการกลับไปใช้ชีวิตอย่างมั่นใจ</p></div>
      <div className="t-cards shell">{fourT.map((step,index)=><article key={step.name} className={`t-card t-${index+1}`}><div className="t-card-top"><span>{step.letter}</span><b>0{index+1}</b></div><h3>{step.name}</h3><h4>{step.thai}</h4><ul>{step.items.map(item=><li key={item}>{item}</li>)}</ul>{index<3&&<i className="card-arrow" aria-hidden="true">→</i>}</article>)}</div>
      <div className="flow shell" aria-label="ขั้นตอน Test ไปสู่ผลลัพธ์ที่ยั่งยืน">{["Test","Treat","Train","Talent","ผลลัพธ์ที่ยั่งยืน"].map((item,index)=><div key={item} className={index===4?"flow-result":""}><span>{index<4?`0${index+1}`:"✓"}</span><b>{item}</b>{index<4&&<i aria-hidden="true">→</i>}</div>)}</div>
    </section>
    <section className="trehab-care-path" aria-labelledby="trehab-care-title"><div className="shell"><div className="trehab-enhance-heading"><div><p className="section-kicker">YOUR CARE JOURNEY</p><h2 id="trehab-care-title">ขั้นตอนการดูแลที่ TREHAB</h2></div><p>ดูแลอย่างเป็นระบบตั้งแต่การประเมินครั้งแรกจนถึงการติดตามความก้าวหน้า</p></div><div className="trehab-care-grid">{trehabCareSteps.map((step,index)=><article key={step}><b>{String(index+1).padStart(2,"0")}</b><span aria-hidden="true">{index===0?"◎":index===1?"◇":index===2?"＋":"✓"}</span><h3>{step}</h3></article>)}</div></div></section>
    <section className="about shell" id="about-trehab">
      <div className="about-photo"><Image src="/assets/trehab-clinic-atmosphere.png" fill sizes="(max-width: 900px) 100vw, 50vw" alt="บรรยากาศภายในธรีแฮปคลินิกกายภาพบำบัด"/><div className="about-stamp"><b>TREHAB</b><span>PHYSIOTHERAPY<br/>CHIANG RAI</span></div></div>
      <div className="about-content"><p className="section-kicker">ABOUT TREHAB</p><h2>ที่ TREHAB<br/><span>เราดูแลมากกว่าอาการปวด</span></h2><p className="about-description">เราให้ความสำคัญกับการตรวจประเมิน การวิเคราะห์ปัจจัยที่เกี่ยวข้องกับอาการ และการวางแผนฟื้นฟูเฉพาะบุคคล เพื่อช่วยให้ผู้รับบริการกลับไปทำงาน ออกกำลังกาย หรือเล่นกีฬาได้อย่างเหมาะสม</p><div className="about-list">{aboutHighlights.map((item,index)=><div key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></div>)}</div></div>
    </section>
    <section className="team" id="physiotherapists">
      <div className="team-heading shell"><div><p className="section-kicker light">OUR PHYSIOTHERAPISTS</p><h2>ทีมนักกายภาพบำบัด</h2></div><p>ดูแล ประเมิน และวางแผนฟื้นฟูร่วมกับคุณอย่างใกล้ชิด</p></div>
      <div className="team-grid shell">{therapists.map((therapist,index)=><article className="therapist-card trehab-therapist-card" key={therapist.name}><div className="therapist-photo"><Image src={therapist.image} fill sizes="(max-width: 700px) 100vw, 50vw" alt={therapist.alt}/><span>PT 0{index+1}</span></div><div className="therapist-info"><div className="therapist-title"><div><p>PHYSIOTHERAPIST</p><h3>{therapist.name}</h3></div><span>{therapist.license}</span></div><div className="trehab-therapist-education"><b>EDUCATION & CERTIFICATION</b><ul>{therapist.education.map(item=><li key={item}>{item}</li>)}</ul></div><div className="schedule"><div><b>จันทร์–ศุกร์</b><span>16.45–21.00 น.</span></div><div><b>เสาร์–อาทิตย์และวันหยุด</b><span>07.00–21.00 น.</span></div></div></div></article>)}</div>
    </section>
    <section className="reviews" id="reviews">
      <div className="reviews-heading shell"><div><p className="section-kicker">CLIENT EXPERIENCE</p><h2>รีวิวผู้รับบริการ</h2></div><div className="review-notice"><b>ข้อมูลตัวอย่าง</b><p>พื้นที่นี้จะแสดงเฉพาะรีวิวที่ผู้รับบริการอนุญาตให้เผยแพร่ ปัจจุบันยังไม่มีข้อมูลรีวิวจริง และไม่ได้สร้างข้อความรีวิวขึ้นแทนผู้รับบริการ</p></div></div>
      <div className="review-grid shell">{reviewPlaceholders.map((service,index)=><article className="review-card" key={index}><div className="review-state">PLACEHOLDER — ข้อมูลตัวอย่าง</div><div className="review-top"><span className="review-avatar">ชื่อย่อ</span><div><b>{service}</b><span>คะแนนรีวิว — / 5</span></div></div><blockquote>“ข้อความรีวิวจะแสดงบริเวณนี้ เมื่อได้รับความคิดเห็นจริงและได้รับอนุญาตให้เผยแพร่แล้ว”</blockquote><div className="review-date"><span>วันที่ใช้บริการ</span><b>— / — / —</b></div></article>)}</div>
    </section>
    <section className="trehab-faq" aria-labelledby="trehab-faq-title"><div className="shell"><div className="trehab-enhance-heading"><div><p className="section-kicker">FREQUENTLY ASKED QUESTIONS</p><h2 id="trehab-faq-title">คำถามที่พบบ่อย</h2></div><p>ข้อมูลเบื้องต้นก่อนเข้ารับบริการ หากต้องการรายละเอียดเพิ่มเติมสามารถสอบถามคลินิกได้โดยตรง</p></div><div className="trehab-faq-list">{trehabFaqs.map((item,index)=><details key={item.q}><summary><span>{String(index+1).padStart(2,"0")}</span>{item.q}<i aria-hidden="true">＋</i></summary><p>{item.a}</p></details>)}</div></div></section>
    <section className="contact" id="contact">
      <div className="contact-map"><iframe title="แผนที่ธรีแฮปคลินิกกายภาพบำบัด" src="https://www.google.com/maps?q=%E0%B8%98%E0%B8%A3%E0%B8%B5%E0%B9%81%E0%B8%AE%E0%B8%9B%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9A%E0%B8%B3%E0%B8%9A%E0%B8%B1%E0%B8%94%20%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%9D%E0%B8%B2%E0%B8%A2%20%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%A3%E0%B8%B2%E0%B8%A2&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
      <div className="contact-panel"><p className="section-kicker light">VISIT TREHAB</p><h2>แผนที่และ<br/>ข้อมูลติดต่อ</h2><p className="place-name">ธรีแฮปคลินิกกายภาพบำบัด บ้านหัวฝาย อำเภอเมือง จังหวัดเชียงราย <span>ใกล้น้ำเงี้ยวป้าลี</span></p><dl><div><dt>ที่อยู่</dt><dd>บ้านหัวฝาย อำเภอเมือง จังหวัดเชียงราย</dd></div><div><dt>เวลาทำการ</dt><dd>จันทร์–ศุกร์ 16.45–21.00 น.<br/>เสาร์–อาทิตย์และวันหยุด 07.00–21.00 น.</dd></div><div><dt>โทรศัพท์</dt><dd><a href="tel:0929390919">092-939-0919</a></dd></div><div><dt>อีเมล</dt><dd><a href="mailto:trehab@welkub.com">trehab@welkub.com</a></dd></div><div><dt>LINE Official Account</dt><dd><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">@trehab</a></dd></div></dl><div className="contact-actions"><a href="https://maps.app.goo.gl/NsX5Si1m41ZtNC5F7" target="_blank" rel="noreferrer">เปิดใน Google Maps</a><a href="tel:0929390919">โทรเลย</a><a className="action-line" href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">แชตผ่าน LINE</a></div></div>
    </section>
    <section className="final-cta"><div className="shell"><p className="section-kicker light">START YOUR RECOVERY</p><h2>ฟื้นฟูอย่างเป็นระบบ<br/><span>กลับไปเคลื่อนไหวและออกกำลังกายอย่างมั่นใจ</span></h2><p>เริ่มต้นด้วยการประเมินจากนักกายภาพบำบัดที่ TREHAB Physiotherapy Clinic</p><div className="cta-buttons"><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">จองคิวออนไลน์</a><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">ปรึกษาผ่าน LINE</a><a href="tel:0929390919">โทร 092-939-0919</a></div></div></section>
    <footer className="footer"><div className="footer-grid shell"><div className="footer-brand"><a href="#top"><Image src="/assets/trehab-logo-current.svg" width={165} height={62} alt="โลโก้ TREHAB"/></a><p>คลินิกกายภาพบำบัดที่ให้ความสำคัญกับการประเมิน การรักษา และการฟื้นฟูเฉพาะบุคคล เพื่อการกลับไปเคลื่อนไหวอย่างเหมาะสม</p></div><div><h3>เมนูเว็บไซต์</h3><a href="#manual-therapy">Manual Therapy</a><a href="#exercise-rehabilitation">Exercise Rehabilitation</a><a href="#trehab-4t">TREHAB 4T</a><a href="#about-trehab">เกี่ยวกับ TREHAB</a><a href="#physiotherapists">ทีมกายภาพบำบัด</a></div><div><h3>บริการ</h3><a href="#exercise-rehabilitation">Sports Rehabilitation</a><a href="#exercise-rehabilitation">Therapeutic Exercise</a><a href="#manual-therapy">Manual Therapy</a><a href="#contact">กายภาพบำบัดที่บ้าน</a><a href="#contact">Shockwave Therapy</a></div><div><h3>ข้อมูลติดต่อ</h3><a href="tel:0929390919">092-939-0919</a><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer">LINE @trehab</a><a href="https://maps.app.goo.gl/NsX5Si1m41ZtNC5F7" target="_blank" rel="noreferrer">Google Maps</a><a href="#contact">ติดต่อคลินิก</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></div></div><div className="footer-bottom shell"><p>© {new Date().getFullYear()} TREHAB Physiotherapy Clinic. All rights reserved.</p><div><a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a><a href="/cookie-policy">นโยบาย Cookies</a><a href="/terms">ข้อกำหนดการใช้บริการ</a></div></div></footer>
    <div className="floating-actions" aria-label="ทางลัดติดต่อ"><a className="float-line" href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer" aria-label="แชตผ่าน LINE"><span>LINE</span><b>แชต</b></a><a href="tel:0929390919" aria-label="โทรศัพท์"><span>☎</span><b>โทร</b></a><a href="https://line.me/R/ti/p/@trehab" target="_blank" rel="noreferrer" aria-label="จองคิว"><span>＋</span><b>จองคิว</b></a><a href="#top" aria-label="กลับขึ้นด้านบน"><span>↑</span><b>ด้านบน</b></a></div>
  </main>;
}
