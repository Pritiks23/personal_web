// ============================================
// Hero console: typewriter log + animated metrics
// ============================================
const consoleLines = [
  { text: "$ torchrun --nproc_per_node=2 ddp_train.py", cls: "" },
  { text: "[rank0] initializing process group (backend=nccl)", cls: "line-rank0" },
  { text: "[rank1] initializing process group (backend=nccl)", cls: "line-rank1" },
  { text: "[rank0] broadcasting model weights... done", cls: "line-rank0" },
  { text: "[all]   DistributedSampler: 60,000 images -> 2 shards", cls: "" },
  { text: "epoch 1/3  loss 1.3953  val_acc 57.4%", cls: "" },
  { text: "epoch 2/3  loss 1.0821  val_acc 61.8%", cls: "" },
  { text: "epoch 3/3  loss 0.8308  val_acc 65.1%", cls: "line-ok" },
  { text: "throughput: 4719 samples/sec/gpu  (+27%)", cls: "line-ok" },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const consoleBody = document.getElementById("consoleBody");

function typeLine(lineIndex) {
  if (!consoleBody) return;
  if (lineIndex >= consoleLines.length) {
    animateMetrics();
    return;
  }
  const { text, cls } = consoleLines[lineIndex];
  const span = document.createElement("span");
  if (cls) span.className = cls;
  consoleBody.appendChild(span);

  let charIndex = 0;
  const speed = 14;

  function typeChar() {
    if (charIndex < text.length) {
      span.textContent += text[charIndex];
      charIndex++;
      setTimeout(typeChar, speed);
    } else {
      consoleBody.appendChild(document.createTextNode("\n"));
      setTimeout(() => typeLine(lineIndex + 1), 180);
    }
  }
  typeChar();
}

function animateMetrics() {
  const lossEl = document.getElementById("metricLoss");
  const accEl = document.getElementById("metricAcc");
  const throughputEl = document.getElementById("metricThroughput");
  if (!lossEl) return;

  const duration = 1400;
  const start = performance.now();
  const from = { loss: 1.3953, acc: 57.4, tp: 3715 };
  const to = { loss: 0.8308, acc: 65.1, tp: 4719 };

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    lossEl.textContent = (from.loss + (to.loss - from.loss) * ease).toFixed(4);
    accEl.textContent = (from.acc + (to.acc - from.acc) * ease).toFixed(1) + "%";
    throughputEl.textContent = Math.round(from.tp + (to.tp - from.tp) * ease).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if (reduceMotion) {
  if (consoleBody) {
    consoleLines.forEach(({ text, cls }) => {
      const span = document.createElement("span");
      if (cls) span.className = cls;
      span.textContent = text;
      consoleBody.appendChild(span);
      consoleBody.appendChild(document.createTextNode("\n"));
    });
  }
  const lossEl = document.getElementById("metricLoss");
  const accEl = document.getElementById("metricAcc");
  const throughputEl = document.getElementById("metricThroughput");
  if (lossEl) lossEl.textContent = "0.8308";
  if (accEl) accEl.textContent = "65.1%";
  if (throughputEl) throughputEl.textContent = "4,719";
} else {
  setTimeout(() => typeLine(0), 500);
}

// ============================================
// Scroll-triggered reveal for project cards
// ============================================
const revealTargets = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("in-view"));
}

// ============================================
// Footer year
// ============================================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
