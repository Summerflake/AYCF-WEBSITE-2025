(async function checkScience() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const ipData = await res.json();

    const ipTimezone = ipData.timezone;           
    const ispTimezone = ipData.timezone;       
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const mismatch = ipTimezone !== browserTimezone;

    console.log("=== Zone Check ===");
    console.log("IP Timezone:      ", ipTimezone);
    console.log("ISP Timezone:     ", ispTimezone);
    console.log("Browser Timezone: ", browserTimezone);
    console.log("Timezone Match:   ", mismatch ? "⚠️ Mismatch" : "✅ Match");

    async function ping(url) {
      const start = performance.now();
      try {
        await fetch(url, { method: 'HEAD', cache: 'no-store', mode: 'no-cors' });
      } catch (e) {
      }
      const end = performance.now();
      return Math.round(end - start);
    }

    const currentSite = 'https://cloudflare.com/ping.txt'; 
    const pingNewSite = 'https://vercel.app/ping.txt';

    const pingCurrentSite = await ping(currentSite);
    const pingResultNewSite = await ping(pingNewSite);

    console.log(`Ping to Current Site: ${pingCurrentSite} ms`);
    console.log(`Ping to New Site: ${pingResultNewSite} ms`);
    
    // reroute logic
    if (mismatch) {
        if (pingCurrentSite > pingResultNewSite){ // redirect to ping new site
            window.location.href = "https://vercel.app/"; 
        }
    } else {
        null;
    }
    console.log("==========================");
  } catch (err) {
    console.error("Timezone check failed:", err);
  }
})();
