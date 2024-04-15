class Ball {
  constructor(position) {
    this.element = document.createElement("div");
    this.element.classList.add("ball");
    this.position = position;
    this.draw();
  }

  draw() {
    this.element.style.left = this.position[0] + "px";
    this.element.style.bottom = this.position[1] + "px";
    grid.appendChild(this.element);
  }
}
