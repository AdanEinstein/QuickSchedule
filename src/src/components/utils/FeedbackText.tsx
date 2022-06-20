import * as React from "react";

export interface IFeedback {
	icon?: string;
	message: any;
	color: string;
}

const FeedbackText: React.FC<{feedback?: IFeedback}> = ({feedback}) => {
	return (
		<p className={`m-0 ${feedback ? feedback?.color : 'd-none'}`}>
			<i className={feedback?.icon}></i>
			<span className="mx-1">{feedback?.message}</span>
		</p>
	);
};

export default FeedbackText