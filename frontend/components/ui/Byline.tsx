import { Avatar } from './Avatar';
import { Text } from './Text';

export type BylineProps = {
	/** Display name. Shown as "Anonymous" when `anonymous` is true. */
	name: string;
	anonymous?: boolean;
	/** Usually the time, e.g. "2 hrs ago". */
	meta?: string;
	size?: 'sm' | 'lg';
};

/**
 * Who wrote something and when: avatar, name and a muted meta line.
 *
 * @example
 * <Byline name='Alex Chen' meta='1 hr ago' />
 * <Byline name='Jordan Lee' anonymous meta='Asked 3 hrs ago' size='lg' />
 */
export function Byline({ name, anonymous = false, meta, size = 'sm' }: BylineProps) {
	const displayName = anonymous ? 'Anonymous' : name;

	if (size === 'lg') {
		return (
			<div className='flex items-center gap-3'>
				<Avatar name={displayName} anonymous={anonymous} size='lg' />
				<div className='flex flex-col'>
					<Text variant='label'>{displayName}</Text>
					{meta && (
						<Text variant='small' tone='muted'>
							{meta}
						</Text>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className='flex items-center gap-2'>
			<Avatar name={displayName} anonymous={anonymous} size='sm' />
			<Text as='span' variant='label'>
				{displayName}
			</Text>
			{meta && (
				<Text as='span' variant='small' tone='muted'>
					{meta}
				</Text>
			)}
		</div>
	);
}
