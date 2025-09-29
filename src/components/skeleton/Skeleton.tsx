import "./Skeleton.css";

interface Props {
	skeletonWidth: string;
	skeletonHeight: string;
	skeletonMargin?: string;
}

const Skeleton = ({ skeletonWidth, skeletonHeight, skeletonMargin }: Props) => {
	return (
		<div
			className="skeleton"
			style={{
				width: skeletonWidth,
				height: skeletonHeight,
				marginRight: skeletonMargin,
			}}
		></div>
	);
};

export default Skeleton;
