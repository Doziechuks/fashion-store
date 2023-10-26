/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import styles from "./CategoryList.module.css";
import Card from "../card/Card";
import useFetch from "../../customHooks/useFetch";
import Spinner from "../spinner/Spinner";
import image from "../../assets/out of stock.png";
import InfiniteScroll from "react-infinite-scroll-component";

interface CategoryFilter {
  sort: string;
  catId?: string;
  maxPrice: number;
  selectedCat: number[];
}

interface Product {
  id: number;
  img: string;
  img2?: string; // Optional
  title: string;
  isNew?: boolean; // Optional
  oldPrice: number;
  price: number;
  [key: string]: string | number | boolean | undefined;
}

const CategoryList = (props: CategoryFilter) => {
  const { catId, sort, maxPrice, selectedCat } = props;
  const [page, setPage] = useState(1);
  const url = `/products?populate=*&[filters][categories][uid][$eq]=${catId}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}${selectedCat.map(
    (item) => `&[filters][sub_categories][id][$eq]=${item}`
  )}`;

  const { data, error, isLoading } = useFetch<Product[]>(url);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  if (error) return <h1>Something went wrong</h1>;
  if (isLoading) return <Spinner />;

  // const result = !isLoading && data && data.length < 100;

  return (
    <InfiniteScroll
      dataLength={data ? data.length : 0}
      hasMore={false}
      next={fetchMoreData}
      loader={<div>Loading...</div>}
      endMessage={<div>No more data</div>}
    >
      {data?.length ? (
        <main className={styles.container}>
          {data?.map((item) => (
            <Card key={item.id} item={item} isList />
          ))}
        </main>
      ) : (
        <main className={styles.outOfStock}>
          <img src={image} alt="out of stockPhoto" className={styles.img} />
          <span className={styles.text}>Out of stock</span>
        </main>
      )}
    </InfiniteScroll>
  );
};

export default CategoryList;
