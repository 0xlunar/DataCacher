class DataCache {
  cache: Array<any>;
  interval: number;
  maxLength: number;
  fn: () => void;
  cycle: number;

  constructor(interval: number, maxCacheTime: number) {
    this.cache = [];
    this.interval = interval;
    this.maxLength = Math.floor(maxCacheTime / interval);

    this.fn;
    this.cycle;
  }

  init(fn: () => void) {
    this.fn = fn;
    this.cycle = setInterval(async () => {
      const data = await this.fn();
      this.process(data);
    }, this.interval);
  }

  process(element: any) {
    if (this.cache.length >= this.maxLength) {
      this.cache.shift();
    }
    this.cache.push(element);
  }

  destroy() {
    clearInterval(this.cycle);
    this.cache = [];
  }

  getCache(): Array<any> {
    return this.cache;
  }
}

export default DataCache;
