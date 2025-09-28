import "./Skeleton.css";

interface Props {
  skeletonWidth: number;
  skeletonHeight: number;
  skeletonMargin: number | null;
}

const Skeleton = ({ skeletonWidth, skeletonHeight, skeletonMargin }) => {
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
