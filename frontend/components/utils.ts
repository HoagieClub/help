export function formatTimePassed(input: Date | string | number): string {
	const now = Date.now();
	const past = new Date(input).getTime();

	// Silently handle invalid dates by returning an empty string
	if (isNaN(past)) return '';

	const diffMs = now - past;
	if (diffMs < 0) return 'just now';

	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds < 60) return 'just now';
	if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
	if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
	if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;

	// Compare to 5 since 30 days is a bit more than 4 weeks (cover days 28-29)
	if (weeks < 5) return `${weeks} wk${weeks === 1 ? '' : 's'} ago`;
	// Compare to 13 since 1 year is a bit more than 360 days (cover days 360-364)
	if (months < 13) return `${months} mo${months === 1 ? '' : 's'} ago`;

	return `${years} yr${years === 1 ? '' : 's'} ago`;
}
