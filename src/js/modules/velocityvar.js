/* set velocity variable on body*/
let setVelocityVar = () => {};
if (document.body.dataset.velocity === "true") {
  setVelocityVar = () => {
    document.body.style.setProperty("--velocity", lenis.velocity);
  };
}
