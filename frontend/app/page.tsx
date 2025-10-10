export default function Home() {
  const day = new Date().toLocaleString("th-TH", { weekday: "long" });
  return (
    <div>
      สวัสดีวัน{day} แอดมิน T-Pop
    </div>
  );
}
