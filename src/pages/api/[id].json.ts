import type { APIRoute } from 'astro';

const testes = ['Teste 0', 'Teste 1', 'Teste 2'];

export const get: APIRoute = async function get({ params, request }) {
	const id = Number(params.id);

	return {
		body: JSON.stringify({
			name: testes[id],
		}),
	};
};

export function getStaticPaths() {
	return [{ params: { id: '0' } }, { params: { id: '1' } }, { params: { id: '2' } }];
}
