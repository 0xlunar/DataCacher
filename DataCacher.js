class DataCache {
  constructor(interval, maxCacheTime) {
    this.cache = [];
    this.interval = interval;

    this.maxLength = Math.floor(maxCacheTime / interval);

    this.fn;
    this.cycle;
  }

  init(fn) {
    this.fn = fn;
    this.cycle = setInterval(async () => {
      const data = await this.fn();
      this.process(data);
    }, this.interval);
  }

  process(element) {
    if (this.cache.length >= this.maxLength) {
      this.cache.shift();
    }
    this.cache.push(element);
  }

  destroy() {
    clearInterval(this.cycle);
    this.cache = [];
  }

  getCache() {
    return this.cache;
  }
}

module.exports = DataCache;
