/* LENIS */
const lenis = new Lenis({
  infinite: document.body.dataset.infinite === "true",
  lerp: 0.1,
});

/* set velocity variable on body*/
let setVelocityVar = () => {};
if (document.body.dataset.velocity === "true") {
  setVelocityVar = () => {
    document.body.style.setProperty("--velocity", lenis.velocity);
  };
}

/* EASINGS */
const easings = {
  linear(x) {
    return x;
  },
  sineIn(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  },
  sineOut(x) {
    return Math.sin((x * Math.PI) / 2);
  },
  sineInOut(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  },
  quadIn(x) {
    return x * x;
  },
  quadOut(x) {
    return 1 - (1 - x) * (1 - x);
  },
  quadInOut(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  },
  cubicIn(x) {
    return x * x * x;
  },
  cubicOut(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  cubicInOut(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  },
  quartIn(x) {
    return x * x * x * x;
  },
  quartOut(x) {
    return 1 - Math.pow(1 - x, 4);
  },
  quartInOut(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  },
  quintIn(x) {
    return x * x * x * x * x;
  },
  quintOut(x) {
    return 1 - Math.pow(1 - x, 5);
  },
  quintInOut(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  },
  expoIn(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  },
  expoOut(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  expoInOut(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  },
  circIn(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  },
  circOut(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  },
  circInOut(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  },
  backIn(x) {
    return x * x * ((1.70158 + 1) * x - 1.70158);
  },
  backOut(x) {
    return 1 - --x * x * ((1.70158 + 1) * x + 1.70158);
  },
  backInOut(x) {
    return x < 0.5
      ? (x * x * ((7.189819 + 1) * 2 * x - 7.189819)) / 2
      : (1 - --x * x * ((7.189819 + 1) * 2 * x + 7.189819)) / 2;
  },
  elasticIn(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) *
        Math.sin(((x * 10 - 10.75) * (2 * Math.PI)) / 3.5);
  },
  elasticOut(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) *
          Math.sin(((x * 10 - 0.75) * (2 * Math.PI)) / 3.5) +
        1;
  },
  elasticInOut(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(
          Math.pow(2, 20 * x - 10) *
          Math.sin(((20 * x - 11.125) * (Math.PI * 2)) / 4.5)
        ) / 2
      : (Math.pow(2, -20 * x + 10) *
          Math.sin(((20 * x - 11.125) * (Math.PI * 2)) / 4.5)) /
          2 +
        1;
  },
  bounceIn(x) {
    return 1 - easings.bounceOut(1 - x);
  },
  bounceOut(x) {
    return x < 1 / 2.75
      ? 7.5625 * x * x
      : x < 2 / 2.75
      ? 7.5625 * (x -= 1.5 / 2.75) * x + 0.75
      : x < 2.5 / 2.75
      ? 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375
      : 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
  },
  bounceInOut(x) {
    return x < 0.5
      ? (1 - easings.bounceOut(1 - 2 * x)) / 2
      : (1 + easings.bounceOut(2 * x - 1)) / 2;
  },
};

/* CALCULATE PIXELS */
const calc = (val, elRect) => {
  elRect =
    typeof elRect === "number" && !isNaN(elRect)
      ? elRect
      : lenis.dimensions.height;
  let pixelVal = val.replace(
    /(\d+)(vw|vh|%|rem|px)?/g,
    (match, number, unit) => {
      number = parseFloat(number);
      switch (unit) {
        case "vw":
          return (number * lenis.dimensions.width) / 100;
        case "vh":
          return (number * lenis.dimensions.height) / 100;
        case "%":
          return (number * elRect) / 100;
        case "rem":
          return (
            number *
            parseFloat(getComputedStyle(document.documentElement).fontSize)
          );
        case "px":
        default:
          return number;
      }
    }
  );

  try {
    return eval(pixelVal);
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return null;
  }
};

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

let observeHeader, observeHeaderStyle;
const setHeaderObserver = () => {
  observeHeader?.disconnect();
  observeHeaderStyle?.disconnect();

  const header = document.querySelector("[data-observe-header]");
  if (!header) return;
  const hw = header.querySelector(".headernav-wrapper");
  const hc = header.querySelector(".headernav-container");
  if (!hw || !hc) return;
  const hcRect = hc.getBoundingClientRect();

  observeHeader = new IntersectionObserver(
    (entries) => {
      if (header.dataset.observeHeader === "false") return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting && lenis.direction === 1) {
          hc.style.position = "fixed";
          hc.style.top = "0";
          hw.style.setProperty("height", hcRect.height);
        } else if (entry.isIntersecting && lenis.direction === -1) {
          hc.style.position = "static";
        }
      });
    },
    {
      rootMargin: `-${hcRect.height}px 0px 0px 0px`,
      threshold: 0,
      root: document,
    }
  );

  observeHeader.observe(hw);

  observeHeaderStyle = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const styleAttributes = entry.target
            .getAttribute("data-observe-header-style")
            .split(";")
            .filter((style) => style);
          styleAttributes.forEach((style) => {
            const [property, value] = style.split(":").map((s) => s.trim());
            header.style.setProperty(property, value);
          });
        }
      });
    },
    {
      rootMargin: `0px 0px -${lenis.dimensions.height - hcRect.height}px 0px`,
      threshold: 0,
      root: document,
    }
  );

  document
    .querySelectorAll("[data-observe-header-style]")
    .forEach((element) => observeHeaderStyle.observe(element));
};

/* Resize observer */
new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    setHeaderObserver();
    reInitScrollElsVals();
  });
}).observe(document.body);
