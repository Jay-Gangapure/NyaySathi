export async function playVoice(text: string, lang: string) {
  // STEP 1: translate
  const res1 = await fetch("http://localhost:8000/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, lang })
  });

  const data1 = await res1.json();

  // STEP 2: get audio
  const res2 = await fetch("http://localhost:8000/voice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: data1.translated, lang })
  });

  const data2 = await res2.json();

  const audio = new Audio(`http://localhost:8000/${data2.audio_url}`);
  audio.play();
}