import { Button } from './Button';

export type ReplyButtonProps = {
	onClick: () => void;
	/** Whether the reply box it opens is showing. Leave undefined if it doesn't open a box. */
	expanded?: boolean;
	/** The id of the reply box, so screen readers know what the button opens. */
	controls?: string;
	/** What is being replied to, for screen readers, e.g. "answer". */
	thing?: string;
};

/**
 * "Reply" under a question, answer or comment. It only opens the reply box; post the reply
 * with useReply.
 *
 * @example
 * const [replying, setReplying] = useState(false);
 * <ReplyButton onClick={() => setReplying(!replying)} expanded={replying} controls='reply-box' thing='answer' />
 */
export function ReplyButton({ onClick, expanded, controls, thing = 'post' }: ReplyButtonProps) {
	return (
		<Button
			variant='link'
			size='inline'
			onClick={onClick}
			aria-expanded={expanded}
			aria-controls={controls}
			aria-label={`Reply to this ${thing}`}
		>
			Reply
		</Button>
	);
}
