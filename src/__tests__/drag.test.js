import { 
  mouseup, 
  mousedown, 
  mousemove,
  setDraggerOffset
} from '../index.js'

describe('drag', () => {
  describe('setInitialOffset', () => {
    it('sets the initial offset of the element', () => {
      const data = {
        draggerOffsetLeft: 0,
        draggerOffsetTop: 0
      }
      const el = {
        offsetLeft: 1,
        offsetTop: 1
      }

      setDraggerOffset(el, data) 
      expect(data.draggerOffsetLeft).toBe(1)
      expect(data.draggerOffsetTop).toBe(1)
    })
  })

  describe('mousemove', () => {
    it('does nothing is down === false', () => {
      const data = {
        down: false
      }
      const el = {
        style: {
          left: 0,
          top: 0
        }
      }

      mousemove(undefined, el, data)

      expect(el.style.left).toBe(0)
      expect(el.style.top).toBe(0)
    })

    it('updates the element style if down === true', () => {
      const data = {
        down: true,
        initialX: 10,
        initialY: 10,
        draggerOffsetLeft: 0,
        draggerOffsetTop: 0
      }
      const e = {
        clientX: 20, // clientX - initialX. 20 - 10 = 10
        clientY: 20
      }
      const el = {
        style: {
          left: 0,
          top: 0
        }
      }

      mousemove(e, el, data)
      // draggerOffsetLeft (0) + clientX (20) - initialX (10) = 10
      expect(el.style.left).toBe('10px')
      expect(el.style.top).toBe('10px')
    })
  })

  describe('mouseup', () => {
    it('sets down = false', () => {
      const el = {}
      const data = {
        down: true
      }

      mouseup(undefined, el, data) 
      expect(data.down).toBe(false)
    })
  })

  describe('mousedown', () => {
    it('sets down = true and initial mouse position', () => {
      const data = { 
        initialX: 0,
        initialY: 0,
        down: false
      }
      const evt = {
        clientX: 1,
        clientY: 1
      }

      mousedown(evt, undefined, data) 
      expect(data.down).toBe(true)
      expect(data.initialX).toBe(1)
      expect(data.initialY).toBe(1)
    })
  })
})
