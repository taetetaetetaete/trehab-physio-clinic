import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trehab-physio-clinic.srtmaiarin.chatgpt.site"),
  title: "TREHAB Physiotherapy Clinic | คลินิกกายภาพบำบัด เชียงราย",
  description: "คลินิกกายภาพบำบัด เชียงราย ดูแลอาการปวด การบาดเจ็บจากกีฬา และ Sports Rehabilitation ด้วยการประเมินและวางแผนฟื้นฟูเฉพาะบุคคล",
  icons: { icon: "/assets/trehab-logo-current.svg" },
  openGraph: { title:"TREHAB Physiotherapy Clinic | คลินิกกายภาพบำบัด เชียงราย", description:"ดูแลอาการปวด การบาดเจ็บจากกีฬา และ Sports Rehabilitation โดยนักกายภาพบำบัด", type:"website", locale:"th_TH", url:"/" },
};

const localBusinessData = {"@context":"https://schema.org","@type":["MedicalBusiness","LocalBusiness"],name:"ธรีแฮปคลินิกกายภาพบำบัด",alternateName:"TREHAB Physiotherapy Clinic",url:"https://trehab-physio-clinic.srtmaiarin.chatgpt.site",telephone:"+66-92-939-0919",email:"trehab@welkub.com",address:{"@type":"PostalAddress",streetAddress:"บ้านหัวฝาย",addressLocality:"อำเภอเมืองเชียงราย",addressRegion:"เชียงราย",addressCountry:"TH"},hasMap:"https://maps.app.goo.gl/NsX5Si1m41ZtNC5F7",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday"],opens:"16:45",closes:"21:00"},{"@type":"OpeningHoursSpecification",dayOfWeek:["Saturday","Sunday"],opens:"07:00",closes:"21:00"}]};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(localBusinessData)}}/>{children}</body>
    </html>
  );
}
