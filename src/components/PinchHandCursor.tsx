import { forwardRef } from 'react'

interface PinchHandCursorProps {
  holding: boolean
  visible: boolean
}

/** Generated, transparent cursor art used as the drag affordance. */
export const PinchHandCursor = forwardRef<HTMLDivElement, PinchHandCursorProps>(function PinchHandCursor(
  { holding, visible },
  ref,
) {
  return (
    <div ref={ref} className="yk-pinch-hand-cursor" data-holding={holding} data-visible={visible} aria-hidden="true">
      <img src="/images/ui/pinch-hand-cursor.png" alt="" />
    </div>
  )
})
