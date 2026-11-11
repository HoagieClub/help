import { Avatar } from './Avatar';
import { MetaRow } from './MetaRow';

export type BylineProps = {
	/** Display name. Shown as "Anonymous" when `anonymous` is true. */
	name: string;
	anonymous?: boolean;
	/** Facts under the name, e.g. ['Q&A', '2h ago']. */
	meta?: string[];
};

/**
 * The author block at the top of a question: big avatar, name, and "Q&A • 2h ago".
 * For answers and comments, ThreadItem has its own smaller version.
 *
 * @example
 * <Byline name='Alex Chen' meta={['Q&A', '2h ago']} />
 */
export function Byline({ name, anonymous = false, meta = [] }: BylineProps) {
	const displayName = anonymous ? 'Anonymous' : name;

	return (
		<div className='flex items-center gap-4'>
			<Avatar name={displayName} anonymous={anonymous} size='lg' />
			<div className='flex flex-col gap-1'>
				<span className='font-body text-h3 text-ink'>{displayName}</span>
				{meta.length > 0 && <MetaRow items={meta} tone='default' />}
			</div>
		</div>
	);
}
