const puppeteer = require("puppeteer");
const path = require("path");

const TEST_FILES = [
  { file: "tests/test-scoring.html", label: "English" },
  { file: "tests/test-scoring-fr.html", label: "French" },
];

async function runTestFile(browser, { file, label }) {
  const filePath = path.resolve(__dirname, "..", file);
  const url = `file://${filePath}`;

  console.log(`\n--- ${label} tests (${file}) ---`);

  const page = await browser.newPage();

  page.on("pageerror", (err) => {
    console.error(`  Page error: ${err.message}`);
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error(`  Console error: ${msg.text()}`);
    }
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Wait for test results to render (the h2 summary appears inside #test-results)
  await page.waitForSelector("#test-results h2", { timeout: 15000 });

  // Extract results from the rendered table
  const results = await page.evaluate(() => {
    const h2 = document.querySelector("#test-results h2");
    const rows = document.querySelectorAll("#test-results table tbody tr");
    const tests = [];
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      tests.push({
        status: cells[0].textContent.trim(),
        name: cells[1].textContent.trim(),
        passed: cells[0].classList.contains("interp-normal"),
      });
    });
    return { summary: h2 ? h2.textContent.trim() : "", tests };
  });

  console.log(`  ${results.summary}`);

  // Print individual failures
  const failures = results.tests.filter((t) => !t.passed);
  if (failures.length > 0) {
    failures.forEach((t) => {
      console.log(`  FAIL: ${t.name}`);
    });
  }

  await page.close();

  const totalFailed = results.tests.filter((t) => !t.passed).length;
  const totalPassed = results.tests.filter((t) => t.passed).length;
  console.log(`  ${totalPassed} passed, ${totalFailed} failed`);

  return totalFailed;
}

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    let totalFailed = 0;
    for (const testFile of TEST_FILES) {
      totalFailed += await runTestFile(browser, testFile);
    }

    await browser.close();

    console.log(
      totalFailed === 0
        ? "\nAll tests passed."
        : `\n${totalFailed} test(s) failed.`
    );
    process.exit(totalFailed === 0 ? 0 : 1);
  } catch (err) {
    console.error("Test runner error:", err.message);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
