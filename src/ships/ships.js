class Ships {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit++;
    return this.timesHit;
  }

  isSunk() {
    return this.timesHit >= this.length;
  }
}

export { Ships };
