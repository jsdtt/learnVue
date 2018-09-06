import { inBrowser } from './env'

export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
  // typeof window !== undefined 判断是否浏览器环境
  // 有performance性能API就可以直接用
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    // 标记某个时刻的性能, 存储的key为tag
    mark = tag => perf.mark(tag)
    
    /**
     * 计算mark记录的两个性能之间的差异
     * 以name 为 key进行存储
     * @param {*} name 存储的键名
     * @param {*} startTag
     * @param {*} endTag
     */
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      // 不知道为啥要计算后给他删掉??
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      perf.clearMeasures(name)
    }
  }
}
