import { useEffect } from "react";
import styles from "./HomePage.module.less";
import Slider from "../../components/slider/Slider";
import FeaturedProducts from "../../components/featuredProducts/FeaturedProducts";
import Category from "../../components/category/Category";
import { Seo } from "../../utility/seo";

const HomePage = () => {
  useEffect(() => {
    Seo({
      title:
        "Home FashionStore || Buy quality and amazing fashion products and glow",
      metaDescription:
        "Quality and pocket friendly fashion products available at fashionstore ",
    });
  }, []);
  return (
    <main className={styles.container}>
      <Slider />
      <FeaturedProducts type="Featured" />
      <Category />
      <FeaturedProducts type="Trending" />
    </main>
  );
};

export default HomePage;
