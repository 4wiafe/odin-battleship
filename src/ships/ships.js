class Ships {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit++;
    return this.timesHit;
  }
}

export { Ships };
