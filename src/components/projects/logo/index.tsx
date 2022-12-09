import { lazy, Suspense, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useHolderSize } from '@core/useHolderSize';
import Loading from '@atoms/Loading';

import { LogoOptions } from './LogoOptions';
const Sketch = lazy(() => import('./sketch'));

export function Logo() {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [holderEl, size] = useHolderSize();
	const [options, setOptions] = useState(new LogoOptions());

	return (
		<div className="container">
			<div ref={holderEl} className="canvas-holder">
				<Suspense fallback={<Loading />}>
					<Sketch size={size} options={options} />
				</Suspense>
			</div>
			<div className="flex flex-col w-full md:w-3/4 my-2 mx-auto gap-2">
				<label className="text-sm font-medium">
					<div className="place-self-start">Código:</div>
					<textarea ref={textAreaRef} defaultValue={options.code} className="w-full h-44 rounded" />
				</label>
				<motion.button
					className="bg-wm-accent rounded text-wm-platinum fold-semibold p-2"
					whileHover={{ background: '#E94957' }}
					whileTap={{ background: '#DA1B2B' }}
					onClick={() => setOptions({ ...options, code: textAreaRef.current?.value ?? '' })}
				>
					OK
				</motion.button>
			</div>
		</div>
	);
}
