class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }

  draw() {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = this.bottomLeft[0] + "px";
    block.style.bottom = this.bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
