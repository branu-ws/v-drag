import { 
  mouseup, 
  mousedown, 
  mousemove,
  setDraggerOffset,
  createOverlay
} from '../index.js'

describe('drag', () => {
  const mockEl = document.createElement('div')

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
      const data = {
        down: true,
        overlay: mockEl
      }

      mouseup(undefined, mockEl, data) 
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
      const mockOverlay = { parentElement: { append: () => {} } }
      const evt = {
        clientX: 1,
        clientY: 1
      }

      mousedown(evt, mockOverlay, data) 
      expect(data.down).toBe(true)
      expect(data.initialX).toBe(1)
      expect(data.initialY).toBe(1)
    })
  })

  describe('createOverlay', () => {
    it('returns a html div element with height/width of entire screen', () => {
      const el = document.createElement('div')
      const parentEl = document.createElement('div')
      parentEl.appendChild(el)

      const result = createOverlay(undefined, el, {}) 
      
      expect(result.getAttribute('style').includes('width: 100vw')).toBe(true)
      expect(result.getAttribute('style').includes('height: 100vh')).toBe(true)
      expect(result instanceof HTMLDivElement).toBe(true)
    })
  })
})
