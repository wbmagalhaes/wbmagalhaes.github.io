import { useEffect } from 'react';
import type { AnimationControls } from 'framer-motion';

export function useAnimationOnStart(controls: AnimationControls, animationName: string) {
	useEffect(() => {
		controls.start(animationName);
	}, [controls]);
}
