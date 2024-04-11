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
