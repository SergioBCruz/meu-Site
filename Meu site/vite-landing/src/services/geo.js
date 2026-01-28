export async function fetchCity() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("geo error");
    const data = await res.json();
    return data?.city || null;
  } catch (e) {
    return null;
  }
}
