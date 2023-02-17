type MetaSEO = {
	title?: string;
	description?: string;
	image?: string;

	canonical?: string | URL;
	nofollow?: boolean;
	noindex?: boolean;

	ogTitle?: string;
	ogType?: string;
}

export default MetaSEO;