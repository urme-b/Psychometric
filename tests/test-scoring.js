// Psychometric Test Suite — unit tests
// Works with window.__TEST__ hook exposed by shared/app.js
(function () {
  "use strict";

  var passed = 0;
  var failed = 0;
  var results = [];

  function assert(condition, message) {
    if (condition) {
      passed++;
      results.push({ pass: true, msg: message });
    } else {
      failed++;
      results.push({ pass: false, msg: message });
    }
  }

  function approxEqual(a, b, eps) {
    return Math.abs(a - b) < (eps || 0.001);
  }

  function renderResults() {
    var container = document.getElementById("test-results");
    if (!container) return;
    var html = "<h2>Test Results: " + passed + " passed, " + failed + " failed</h2>";
    html += '<table class="table table-bordered"><thead><tr><th>Status</th><th>Test</th></tr></thead><tbody>';
    results.forEach(function (r) {
      var cls = r.pass ? "interp-normal" : "interp-abnormal";
      html += '<tr><td class="' + cls + '">' + (r.pass ? "PASS" : "FAIL") + "</td><td>" + r.msg + "</td></tr>";
    });
    html += "</tbody></table>";
    container.innerHTML = html;
  }

  // Wait for CONFIG and app.js to load
  function run() {
    var C = window.CONFIG;
    var T = window.__TEST__;

    if (!C || !T) {
      document.getElementById("test-results").innerHTML = "<p>ERROR: CONFIG or __TEST__ not found.</p>";
      return;
    }

    var state = T.state;
    var calcScores = T.calculateSummaryScores;
    var getInterp = T.getInterpretation;
    var csvEscape = T.csvEscape;

    // Helper to build mock answers for a test
    function mockAnswers(testName, scoreValue) {
      var test = C.tests.filter(function (t) { return t.name === testName; })[0];
      return test.questions.map(function (q) {
        return { test: testName, question: q.q, answer: "", score: scoreValue, time: 1, questionStartTime: "", answerTime: "" };
      });
    }

    function mockAnswersPerItem(testName, scores) {
      var test = C.tests.filter(function (t) { return t.name === testName; })[0];
      return test.questions.map(function (q, i) {
        return { test: testName, question: q.q, answer: "", score: scores[i], time: 1, questionStartTime: "", answerTime: "" };
      });
    }

    // ── HADS tests ──────────────────────────────────────────────────
    // All-zero
    state.tests = C.tests.filter(function (t) { return t.name === "HADS"; });
    state.answers = mockAnswers("HADS", 0);
    var s = calcScores();
    assert(s.HADS.Anxiety === 0, "HADS all-zero: Anxiety = 0");
    assert(s.HADS.Depression === 0, "HADS all-zero: Depression = 0");

    // All-max (score 3 for each item)
    state.answers = mockAnswers("HADS", 3);
    s = calcScores();
    assert(s.HADS.Anxiety === 21, "HADS all-3: Anxiety = 21");
    assert(s.HADS.Depression === 21, "HADS all-3: Depression = 21");

    // ── STAI-S tests ────────────────────────────────────────────────
    state.tests = C.tests.filter(function (t) { return t.name === "STAI-S"; });
    state.answers = mockAnswers("STAI-S", 1);
    s = calcScores();
    assert(s["STAI-S"] === 20, "STAI-S all-1: Total = 20");

    state.answers = mockAnswers("STAI-S", 4);
    s = calcScores();
    assert(s["STAI-S"] === 80, "STAI-S all-4: Total = 80");

    // ── STAI-T tests ────────────────────────────────────────────────
    state.tests = C.tests.filter(function (t) { return t.name === "STAI-T"; });
    state.answers = mockAnswers("STAI-T", 1);
    s = calcScores();
    assert(s["STAI-T"] === 20, "STAI-T all-1: Total = 20");

    state.answers = mockAnswers("STAI-T", 4);
    s = calcScores();
    assert(s["STAI-T"] === 80, "STAI-T all-4: Total = 80");

    // ── BFI tests ───────────────────────────────────────────────────
    state.tests = C.tests.filter(function (t) { return t.name === "BFI"; });
    state.answers = mockAnswers("BFI", 3);
    s = calcScores();
    assert(approxEqual(s.BFI.Openness, 3.0), "BFI all-3: Openness = 3.0");
    assert(approxEqual(s.BFI.Conscientiousness, 3.0), "BFI all-3: Conscientiousness = 3.0");
    assert(approxEqual(s.BFI.Extraversion, 3.0), "BFI all-3: Extraversion = 3.0");
    assert(approxEqual(s.BFI.Agreeableness, 3.0), "BFI all-3: Agreeableness = 3.0");
    assert(approxEqual(s.BFI.Neuroticism, 3.0), "BFI all-3: Neuroticism = 3.0");

    // ── FQ tests ────────────────────────────────────────────────────
    // Verify subscale item counts from scoring config
    var fqCfg = C.scoring.FQ.subscales;
    assert(fqCfg.Agoraphobia.length === 5, "FQ config: 5 Agoraphobia items");
    assert(fqCfg.BloodInjuryPhobia.length === 5, "FQ config: 5 BloodInjuryPhobia items");
    assert(fqCfg.SocialPhobia.length === 5, "FQ config: 5 SocialPhobia items");
    assert(fqCfg.TotalPhobia.length === 15, "FQ config: 15 TotalPhobia items");

    // FQ all-zero
    state.tests = C.tests.filter(function (t) { return t.name === "FQ"; });
    state.answers = mockAnswers("FQ", 0);
    s = calcScores();
    assert(s.FQ.Agoraphobia === 0, "FQ all-0: Agoraphobia = 0");
    assert(s.FQ.TotalPhobia === 0, "FQ all-0: TotalPhobia = 0");

    // FQ all-8 (max per item)
    state.answers = mockAnswers("FQ", 8);
    s = calcScores();
    assert(s.FQ.Agoraphobia === 40, "FQ all-8: Agoraphobia = 40");
    assert(s.FQ.BloodInjuryPhobia === 40, "FQ all-8: BloodInjuryPhobia = 40");
    assert(s.FQ.SocialPhobia === 40, "FQ all-8: SocialPhobia = 40");
    assert(s.FQ.TotalPhobia === 120, "FQ all-8: TotalPhobia = 120");

    // ── Interpretation threshold tests ──────────────────────────────
    // HADS
    assert(getInterp("HADS", "Anxiety", 0) !== "", "HADS interp: score 0 has label");
    assert(getInterp("HADS", "Anxiety", 7) === getInterp("HADS", "Anxiety", 0), "HADS interp: 7 same as 0 (Normal/Normal)");
    assert(getInterp("HADS", "Anxiety", 8) !== getInterp("HADS", "Anxiety", 7), "HADS interp: 8 differs from 7 (boundary)");
    assert(getInterp("HADS", "Anxiety", 11) !== getInterp("HADS", "Anxiety", 10), "HADS interp: 11 differs from 10 (boundary)");

    // STAI
    assert(getInterp("STAI-S", "Total", 20) !== "", "STAI-S interp: score 20 has label");
    assert(getInterp("STAI-S", "Total", 37) !== getInterp("STAI-S", "Total", 38), "STAI-S interp: 37 vs 38 boundary");
    assert(getInterp("STAI-S", "Total", 44) !== getInterp("STAI-S", "Total", 45), "STAI-S interp: 44 vs 45 boundary");

    // BFI
    assert(getInterp("BFI", "Openness", 1.5) !== "", "BFI interp: 1.5 has label");
    assert(getInterp("BFI", "Openness", 2) !== getInterp("BFI", "Openness", 2.5), "BFI interp: 2 vs 2.5 boundary");

    // FQ subscales
    assert(getInterp("FQ", "Agoraphobia", 5) !== "", "FQ Agoraphobia interp: 5 has label");
    assert(getInterp("FQ", "GlobalPhobiaRating", 1) !== "", "FQ GlobalPhobia interp: 1 has label");

    // ── CSV escape tests ────────────────────────────────────────────
    assert(csvEscape("hello") === "hello", "csvEscape: plain text unchanged");
    assert(csvEscape("hello,world") === '"hello,world"', "csvEscape: comma wrapped in quotes");
    assert(csvEscape('say "hi"') === '"say ""hi"""', "csvEscape: quotes doubled and wrapped");
    assert(csvEscape("line1\nline2") === '"line1\nline2"', "csvEscape: newline wrapped in quotes");

    // Render
    renderResults();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
