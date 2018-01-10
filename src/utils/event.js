const event = (function () {
  const events = []
  return {
    on (type, ...func) {
      Array.isArray(events[type]) ? events[type].concat(func) : events[type] = func
    },
    emit (type, ...args) {
      if (events[type]) {
        for (let i of events[type]) {
          i(...args)
        }
      }
    },
    remove (type, func) {
      if (func) {
        if (Array.isArray(events[type])) {
          events[type] = events[type].filter(item => {
            return item !== func
          })
        }
      } else {
        delete events[type]
      }
    }
  }
}())

export default event
