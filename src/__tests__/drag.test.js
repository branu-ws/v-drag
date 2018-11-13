import { 
  mouseup, 
  mousedown, 
  mousemove,
  adjustElementZIndex,
  setDraggerOffset,
  createOverlay
} from '../index.js'

const context = describe
describe('drag', () => {
  const mockEl = document.createElement('div')

  describe('setInitialOffset', () => {
    it('sets the initial offset of the element', () => {
      const data = {
      }
      const el = {
        offsetLeft: 1,
        offsetTop: 1,
        vdrag_data: {
          draggerOffsetLeft: 0,
          draggerOffsetTop: 0
        }
      }

      setDraggerOffset(el) 
      expect(el.vdrag_data.draggerOffsetLeft).toBe(1)
      expect(el.vdrag_data.draggerOffsetTop).toBe(1)
    })
  })

  describe('adjustElementZIndex', () => {
    it('increases the initial element zIndex to 10001', () => {
      const el = {
        style: {
          zIndex: 0
        }
      }
      
      adjustElementZIndex(el, 10001)

      expect(el.style.zIndex).toBe(10001)
    })
  })

  describe('mousemove', () => {
    context("mouse is not down", () => {
      it('does not move element but updates cursorPrevious position', () => {
        const data = {
        }
        const el = {
          style: {
            left: 0,
            top: 0,
          },
          vdrag_data: {
            down: false,
            cursorPreviousX: 0,
            cursorPreviousY: 0
          }
        }

        mousemove({ clientX: 1, clientY: 1 }, el)

        expect(el.style.left).toBe(0)
        expect(el.style.top).toBe(0)
        expect(el.vdrag_data.cursorPreviousX).toBe(1)
        expect(el.vdrag_data.cursorPreviousX).toBe(1)
      })
    })

    it('updates the element style if down === true', () => {
      const data = {
      }
      const e = {
        clientX: 20, // clientX - initialX. 20 - 10 = 10
        clientY: 20
      }
      const el = {
        style: {
          left: 0,
          top: 0,
        },
        vdrag_data: {
          down: true,
          initialX: 10,
          initialY: 10,
          draggerOffsetLeft: 0,
          draggerOffsetTop: 0
        }
      }

      mousemove(e, el)
      // draggerOffsetLeft (0) + clientX (20) - initialX (10) = 10
      expect(el.style.left).toBe('10px')
      expect(el.style.top).toBe('10px')
    })
  })

  describe('mouseup', () => {
    it('sets down = false', () => {
      const data = {
      }
      mockEl.vdrag_data = {
        down: true,
        overlay: mockEl,
        initialZIndex: 0
      }

      mouseup(undefined, mockEl) 
      expect(mockEl.vdrag_data.down).toBe(false)
    })
  })

  describe('mousedown', () => {
    it('sets down = true and initial mouse position', () => {
      const data = { 
      }
      const el = { 
        parentElement: { append: () => {} },
        style: { zIndex: 0 },
        vdrag_data: {
          initialX: 0,
          initialY: 0,
          down: false
        }
      }
      const evt = {
        clientX: 1,
        clientY: 1
      }

      mousedown(evt, el) 
      expect(el.vdrag_data.down).toBe(true)
      expect(el.vdrag_data.initialX).toBe(1)
      expect(el.vdrag_data.initialY).toBe(1)
    })
  })

  describe('createOverlay', () => {
    it('returns a html div element with height/width of entire screen', () => {
      const el = document.createElement('div')
      const parentEl = document.createElement('div')
      parentEl.appendChild(el)

      const result = createOverlay(undefined, el) 
      
      expect(result.getAttribute('style').includes('width: 100vw')).toBe(true)
      expect(result.getAttribute('style').includes('height: 100vh')).toBe(true)
      expect(result instanceof HTMLDivElement).toBe(true)
    })
  })
})
