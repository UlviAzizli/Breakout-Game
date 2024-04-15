class Player {
  constructor(position) {
    this.element = document.createElement("div");
    this.element.classList.add("user");
    this.position = position;
    this.draw();
  }

  draw() {
    this.element.style.left = this.position[0] + "px";
    this.element.style.bottom = this.position[1] + "px";
    grid.appendChild(this.element);
  }

  moveLeft() {
    if (this.position[0] > 0) {
      this.position[0] -= 10;
      this.draw();
    }
  }

  moveRight() {
    if (this.position[0] < boardWidth - blockWidth) {
      this.position[0] += 10;
      this.draw();
    }
  }
}
