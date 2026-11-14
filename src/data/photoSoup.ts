import type { SoupArea } from '../components/LivePhoto'

/**
 * Optional per-photo soup position (fractions of the frame). Only needed when a photo's
 * bowl isn't centred — otherwise the default overhead three-quarter framing is used.
 */
export const SOUP_AREAS: Record<string, SoupArea | undefined> = {}
