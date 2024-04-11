/* LENIS */
const lenis = new Lenis({
  infinite: document.body.dataset.infinite === "true",
  lerp: 0.1,
});

/* SCROLL FUNCTIONS */
let scrollEls = new Map();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { target, isIntersecting } = entry;
    const data = scrollEls.get(target);
    if (isIntersecting) {
      data.isVisible = true;
      if (!data.hasBeenVisible) {
        data.hasBeenVisible = true;
      }
    } else {
      data.isVisible = false;
      data.hasBeenVisible = false;
    }
  });
});

const observeElement = (
  el,
  {
    scrub = false,
    offset = {},
    name = "",
    scope,
    ease = (x) => {
      return x;
    },
  } = []
) => {
  if (!el || !(el instanceof Element) || !document.contains(el)) return;

  const elRect = el.getBoundingClientRect();
  const oCalc = (key) => calc(`${offset[key] || 0}`, elRect.height);

  const data = {
    scrub: scrub,
    ease: ease,
    scope: ["local", "global", "both"].includes(scope) ? scope : "local",
    name: name && `${name}-`,
    rect: elRect,
    offset: {
      top: oCalc("top"),
      right: oCalc("right"),
      bottom: oCalc("bottom"),
      left: oCalc("left"),
    },
    progress: { x: 0, y: 0 },
    isVisible: false,
    hasBeenVisible: false,
    isRunning: false,
    run: () => {},
    in: () => {},
    out: () => {},
  };

  const p = lenis.actualScroll;
  data.rect.top += p;
  data.rect.bottom += p;

  scrollEls.set(el, data);
  observer.observe(el);
};

const destroyScrollEl = (el) => {
  observer.unobserve(el);
  scrollEls.delete(el);
};

const updateScrollProgress = (data, el) => {
  const vp = lenis.dimensions;
  const s = lenis.actualScroll;
  const p = data.progress;
  const r = data.rect;
  const o = data.offset;
  const start = [r.left + o.left - vp.width, r.top - s + o.top - vp.height];
  const end = [r.right - o.right, r.bottom - s - o.bottom];
  const dist = end.map((e, i) => e - start[i]);
  [p.x, p.y] = end.map((e, i) =>
    Math.min(Math.max((e - dist[i]) / -dist[i], 0), 1)
  );
  const isBefore = [p.x === 0, p.y === 0];
  const hasPassed = [p.x === 1, p.y === 1];
  const isInView = [
    !isBefore[0] && !hasPassed[0],
    !isBefore[1] && !hasPassed[1],
  ];

  const updateElVals = (el) => {
    el.setAttribute(`data-${data.name}x-inview`, isInView[0]);
    el.setAttribute(`data-${data.name}y-inview`, isInView[1]);
    el.setAttribute(`data-${data.name}x-passed`, hasPassed[0]);
    el.setAttribute(`data-${data.name}y-passed`, hasPassed[1]);
    el.style.setProperty(`--${data.name}x-inview`, isInView[0] ? 1 : 0);
    el.style.setProperty(`--${data.name}y-inview`, isInView[1] ? 1 : 0);
    el.style.setProperty(`--${data.name}x-passed`, hasPassed[0] ? 1 : 0);
    el.style.setProperty(`--${data.name}y-passed`, hasPassed[1] ? 1 : 0);
    if (!data.scrub) {
      el.style.setProperty(`--${data.name}x`, isInView[0] ? 1 : 0);
      el.style.setProperty(`--${data.name}y`, isInView[1] ? 1 : 0);
    } else {
      el.style.setProperty(`--${data.name}x`, data.ease(p.x));
      el.style.setProperty(`--${data.name}y`, data.ease(p.y));
    }
  };

  if (data.scope !== "global") updateElVals(el);
  if (data.scope !== "local") updateElVals(document.documentElement);
};

/* CREATE SCROLL ELEMENTS BY CHECKING DATA ATTRIBUTES */
const observeElements = document.querySelectorAll(
  '[data-observe-inview="true"], [data-observe-inview-scrub="true"]'
);
observeElements.forEach((el) => {
  observeElement(el, {
    scrub: el.dataset.observeInviewScrub === "true",
    ease: easings[el.dataset.observeInviewEase || "linear"],
    name: el.dataset.observeInviewName || "",
    scope: el.dataset.observeInviewScope || "local",
    offset: {
      top: el.dataset.observeInviewOffsetTop || 0,
      right: el.dataset.observeInviewOffsetRight || 0,
      bottom: el.dataset.observeInviewOffsetBottom || 0,
      left: el.dataset.observeInviewOffsetLeft || 0,
    },
  });
});

const updateScrollEls = (run) => {
  scrollEls.forEach(
    (data, el) => (data.isVisible || run) && updateScrollProgress(data, el)
  );
};

/* Update scroll elements rects and offsets */
const reInitScrollElsVals = () => {
  const p = lenis.actualScroll;
  scrollEls.forEach((data, el) => {
    const elRect = el.getBoundingClientRect();
    const oCalc = (val) => calc(`${val || 0}`, elRect.height);
    data.rect = elRect;
    data.rect.top += p;
    data.rect.bottom += p;
    data.offset = {
      top: oCalc(el.dataset.observeInviewOffsetTop),
      right: oCalc(el.dataset.observeInviewOffsetRight),
      bottom: oCalc(el.dataset.observeInviewOffsetBottom),
      left: oCalc(el.dataset.observeInviewOffsetLeft),
    };
  });
  window.requestAnimationFrame(() => updateScrollEls(true));
};

/* LENIS START */
lenis.on("scroll", (e) => {
  setVelocityVar();
  updateScrollEls();
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
