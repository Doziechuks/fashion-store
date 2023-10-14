import styles from "./FeaturedProducts.module.less";
import Card from "../card/Card";
import useFetch from "../../customHooks/useFetch";
import Spinner from "../spinner/Spinner";

interface FeaturedProductsProps {
  type: string;
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

const FeaturedProducts = ({ type }: FeaturedProductsProps) => {
  const { data, error, isLoading } = useFetch<Product[]>(
    `products?populate=*&[filters][type][$eq]=${type}`
  );

  if (isLoading) return <Spinner />;
  if (error) return <h1>something went wrong</h1>;
  // console.log(data);

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{type} products</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi,
            maiores? Laudantium minima architecto reiciendis perspiciatis
            molestiae ea non blanditiis voluptatem! adipisicing elit. Nisi,
            maiores?
          </p>
        </div>
        <div className={styles.bottom}>
          {data?.map((item) => (
            <Card key={item?.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeaturedProducts;
