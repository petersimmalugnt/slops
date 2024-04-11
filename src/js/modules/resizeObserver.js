/* Resize observer */
new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    setHeaderObserver();
    reInitScrollElsVals();
  });
}).observe(document.body);
