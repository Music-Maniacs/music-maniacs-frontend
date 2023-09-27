import { Dispatch, SetStateAction, useRef } from 'react';
import { Pagination } from '../../models/Generic';

type Props = {
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
};

// To use: Add lastElementRef on last element
// ref={data.length === index + 1 ? lastElementRef : undefined}
export const useInfiniteScroll = ({ pagination, setPagination }: Props) => {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = (node: HTMLDivElement) => {
    if (pagination.isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      const hasMoreEvents = pagination.total > pagination.page * pagination.perPage;

      if (entries[0].isIntersecting && hasMoreEvents) {
        setPagination((prevState) => {
          return {
            ...prevState,
            page: prevState.page + 1,
            isLoading: true
          };
        });
      }
    });

    if (node && observer.current) observer.current.observe(node);
  };

  return { lastElementRef };
};
