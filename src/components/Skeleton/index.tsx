import styles from "./styles.module.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={200} />
    </SkeletonTheme>
  );
};
