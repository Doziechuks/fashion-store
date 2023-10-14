import styles from "./CategoryList.module.css";
import Card from "../card/Card";
import useFetch from "../../customHooks/useFetch";
import Spinner from "../spinner/Spinner";
import image from "../../assets/out of stock.png";

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
  const { data, error, isLoading } = useFetch<Product[]>(
    `/products?populate=*&[filters][categories][uid][$eq]=${catId}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}${selectedCat.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}`
  );

  // console.log({ data });

  if (error) return <h1>Something went wrong</h1>;
  if (isLoading) return <Spinner />;

  return (
    <>
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
    </>
  );
};

export default CategoryList;

// const data: Product[] = [
//   {
//     id: 1,
//     img: "https://images.pexels.com/photos/9558787/pexels-photo-9558787.jpeg?auto=compress&cs=tinysrgb&w=600",
//     img2: "https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=600",
//     title: "Long Sleeve Graphic T-shirt",
//     isNew: true,
//     oldPrice: 17,
//     price: 13,
//   },
//   {
//     id: 2,
//     img: "https://images.pexels.com/photos/794063/pexels-photo-794063.jpeg?auto=compress&cs=tinysrgb&w=600",
//     img2: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
//     title: "Coat",
//     isNew: true,
//     oldPrice: 25,
//     price: 18,
//   },
//   {
//     id: 3,
//     img: "https://images.pexels.com/photos/1007017/pexels-photo-1007017.jpeg?auto=compress&cs=tinysrgb&w=600",
//     img2: "https://images.pexels.com/photos/13996056/pexels-photo-13996056.jpeg?auto=compress&cs=tinysrgb&w=600",
//     title: "Skirt",
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id: 4,
//     img: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
//     img2: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
//     title: "Hat",
//     oldPrice: 23,
//     price: 19,
//   },
//   {
//     id: 5,
//     img: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
//     img2: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
//     title: "Hat",
//     oldPrice: 23,
//     price: 19,
//   },
//   {
//     id: 6,
//     img: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
//     img2: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
//     title: "Hat",
//     oldPrice: 23,
//     price: 19,
//   },
// ];
