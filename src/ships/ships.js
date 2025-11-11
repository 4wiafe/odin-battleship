class Ships {
  constructor(length) {
    if (length < 1 || length > 8) {
      throw new Error("Length of ship must be from 1 to 8");
    } else {
      this.length = length;
    }
    
    this.timesHit = 0;
  }

  hit() {
    this.timesHit++;
    return this.timesHit;
  }

  isSunk() {
    return this.timesHit >= this.length;
  }

  toJSON() {
    return {
      length: this.length,
      timesHit: this.timesHit
    };
  }

  static fromJSON(data) {
    const ship = new Ships(data.length);
    ship.timesHit = data.timesHit;

    return ship;
  }
}

export { Ships };
