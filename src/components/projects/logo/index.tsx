import { lazy, Suspense, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useHolderSize } from '@hooks/useHolderSize';
import Loading from '@atoms/Loading';

import { LogoOptions } from './LogoOptions';
const Sketch = lazy(() => import('./sketch'));

export function Logo() {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [holderEl, size] = useHolderSize();
	const [options, setOptions] = useState(new LogoOptions());

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<div className="w-full lg:col-span-2">
				<div ref={holderEl} className="canvas-holder">
					<Suspense fallback={<Loading />}>
						<Sketch size={size} options={options} />
					</Suspense>
				</div>
			</div>

			<div className="w-full h-full max-w-4xl flex flex-col mx-auto gap-2">
				<label className="text-sm font-medium text-wm-carbon">
					<textarea ref={textAreaRef} defaultValue={options.code} className="w-full h-36 rounded" />
				</label>
				<motion.button
					className="bg-wm-oxygen rounded text-wm-hydrogen fold-semibold p-2"
					whileHover={{ background: '#E94957' }}
					whileTap={{ background: '#DA1B2B' }}
					onClick={() =>
						setOptions((prevState) => ({
							...prevState,
							code: textAreaRef.current?.value ?? '',
						}))
					}
				>
					OK
				</motion.button>
			</div>
		</div>
	);
}
