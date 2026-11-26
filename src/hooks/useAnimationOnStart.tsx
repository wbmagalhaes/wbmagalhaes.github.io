import { useEffect } from 'react';
import type { LegacyAnimationControls } from 'motion/react';

export function useAnimationOnStart(controls: LegacyAnimationControls, animationName: string) {
	useEffect(() => {
		controls.start(animationName);
	}, [controls]);
}
