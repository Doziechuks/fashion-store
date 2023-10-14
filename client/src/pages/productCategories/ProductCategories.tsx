import { useState, useEffect, useRef } from "react";
import styles from "./ProductCategories.module.less";
import { useParams } from "react-router-dom";
import CategoryList from "../../components/categotyList/CategoryList";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Seo } from "../../utility/seo";
import useFetch from "../../customHooks/useFetch";
import Spinner from "../../components/spinner/Spinner";

interface SubCategory {
  id: number;
  attributes: {
    title: string;
    // Add other attributes as needed
  };
}
interface ProductContent {
  id: number;
  attributes: {
    title: string;
    // Add other attributes as needed
  };
}

interface ProductAttributes {
  title: string;
  img: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  sub_categories: {
    data: SubCategory[];
  };
  products: {
    data: ProductContent[];
  };
  // Add other attributes as needed
}

interface ProductData {
  attributes: ProductAttributes;
  // Add other attributes as needed
}

const ProductCategories = () => {
  const catId = useParams().id;
  const [selectedSubCats, setSelectedSubCats] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sort, setSort] = useState<string>("asc");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useFetch<ProductData[]>(
    `/categories?populate=*&[filters][uid][$eq]=${catId}`
  );

  // console.log({ sort, selectedSubCats });

  // console.log(data && data[0]?.attributes?.products?.data);
  // const catData = data && data[0]?.attributes?.products?.data;
  const subCategories = data && data[0]?.attributes?.sub_categories?.data;
  // console.log(subCategories);

  // return;
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setMaxPrice(newValue);
  };

  const handleChange = (catId: number): void => {
    if (selectedSubCats.includes(catId)) {
      setSelectedSubCats(selectedSubCats.filter((id) => id !== catId));
    } else {
      setSelectedSubCats([catId]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    Seo({
      title: "Women product category",
      metaDescription:
        "Find quality and pocket friendly women's fashion products at fashionstore ",
    });
  }, []);

  // console.log(catData);
  const catImg =
    data &&
    `http://localhost:1337${data[0]?.attributes?.img?.data?.attributes?.url}`;

  // console.log(catImg);
  if (isLoading) return <Spinner />;
  if (error) return <h1>something went wrong</h1>;
  return (
    <>
      <main className={styles.container}>
        <section className={styles.mobileTop}>
          <div ref={dropdownRef} onClick={() => setOpen((prev) => !prev)}>
            <span>filter</span>
            <FilterListIcon />
          </div>
        </section>
        <section className={styles.left}>
          <div className={styles.top}>
            <h3>{data && data[0]?.attributes?.title} categories</h3>
            <div className={styles.inputWrapper}>
              {subCategories?.map((item) => (
                <div className={styles.inputBox} key={item.id}>
                  <input
                    type="checkbox"
                    id={String(item.id)}
                    value={String(item.id)}
                    checked={selectedSubCats.includes(item.id)}
                    onChange={() => handleChange(item.id)}
                  />
                  <label htmlFor={String(item.id)}>
                    {item?.attributes?.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.center}>
            <h3>filter by price</h3>
            <div className={styles.inputWrapper}>
              <span>0</span>
              <input
                type="range"
                min={0}
                max={1000}
                onChange={handleMaxPriceChange}
              />
              <span>{maxPrice}</span>
            </div>
          </div>
          <div className={styles.bottom}>
            <h3>sort by</h3>
            <div className={styles.inputWrapper}>
              <div className={styles.inputBox}>
                <input
                  type="radio"
                  id="asc"
                  value="asc"
                  name="price"
                  onChange={() => setSort("asc")}
                />
                <label htmlFor="1">lowest price first</label>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="radio"
                  id="desc"
                  value="desc"
                  name="price"
                  onChange={() => setSort("desc")}
                />
                <label htmlFor="2">highest price first</label>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.right}>
          <div className={styles.imgBanner}>
            <img src={catImg!} alt="category banner" />
          </div>
          {
            <CategoryList
              catId={catId}
              sort={sort}
              maxPrice={maxPrice}
              selectedCat={selectedSubCats}
            />
          }
        </section>
      </main>
      <div className={styles.options} style={{ left: open ? "0" : "-50rem" }}>
        <div className={styles.mobileTop}>
          <h3>{data && data[0]?.attributes?.title} categories</h3>
          <div className={styles.inputWrapper}>
            {subCategories?.map((item) => (
              <div className={styles.inputBox} key={item.id}>
                <input
                  type="checkbox"
                  id={String(item.id)}
                  value={String(item.id)}
                  checked={selectedSubCats.includes(item.id)}
                  onChange={() => handleChange(item.id)}
                />
                <label htmlFor={String(item.id)}>
                  {item?.attributes?.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.mobileCenter}>
          <h3>filter by price</h3>
          <div className={styles.inputWrapper}>
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={handleMaxPriceChange}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.mobileBottom}>
          <h3>sort by</h3>
          <div className={styles.inputWrapper}>
            <div className={styles.inputBox}>
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={() => setSort("asc")}
              />
              <label htmlFor="1">lowest price first</label>
            </div>
            <div className={styles.inputBox}>
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={() => setSort("desc")}
              />
              <label htmlFor="2">highest price first</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;

// {
//    <CategoryList
//             catId={catId}
//             sort={sort}
//             maxPrice={maxPrice}
//             selectedCat={selectedSubCats}
//           />
// }

// useEffect(() => {
//   const fetchCat = async () => {
//     try {
//       const res = await fetchRequest.get(
//         `/categories?populate=*&[filters][uid][$eq]=${catId}`
//       );
//       if (res) {
//         setCatData(res.data.data);
//       }
//     } catch (error) {
//       if (typeof error === "string") {
//         setCatError(true);
//       } else {
//         setCatError(true);
//       }
//     }
//   };
//   fetchCat();
//   return () => {};
// }, [catId]);

{
  /* <div className={styles.inputBox}>
                <input
                  type="checkbox"
                  id="1"
                  value={1}
                  checked={selectedSubCats.includes(1)}
                  onChange={() => handleChange(1)}
                />
                <label htmlFor="1">skirts</label>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="checkbox"
                  id="2"
                  value={2}
                  checked={selectedSubCats.includes(2)}
                  onChange={() => handleChange(2)}
                />
                <label htmlFor="2">hats</label>
              </div> */
}
