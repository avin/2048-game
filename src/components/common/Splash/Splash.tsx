import React from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

interface Answer {
	title: React.ReactNode;
	onClick: () => void;
}

interface Props {
	active: boolean;
	question: React.ReactNode;
	answers?: Answer[];
	className?: string;
}

const Splash = ({ active, question, answers = [], className }: Props): JSX.Element => {
	return (
		<div className={cn(styles.splash, className, { [styles.active]: active })}>
			<div>{question}</div>
			<div className={styles.answers}>
				{answers.map((answer) => {
					return (
						<button type="button" className={styles.answer} onClick={answer.onClick}>
							{answer.title}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Splash;
