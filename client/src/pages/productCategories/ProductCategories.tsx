import { useState, useEffect, useRef } from "react";
import styles from "./ProductCategories.module.less";
import { useParams } from "react-router-dom";
import CategoryList from "../../components/categotyList/CategoryList";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Seo } from "../../utility/seo";

const ProductCategories = () => {
  const catId = useParams().id;
  const [selectedSubCats, setSelectedSubCats] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sort, setSort] = useState<string>("asc");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
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
            <h3>women categories</h3>
            <div className={styles.inputWrapper}>
              <div className={styles.inputBox}>
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
              </div>
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
                <label htmlFor="1">highest price</label>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="radio"
                  id="desc"
                  value="desc"
                  name="price"
                  onChange={() => setSort("desc")}
                />
                <label htmlFor="2">lowest price</label>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.right}>
          <div className={styles.imgBanner}>
            <img
              src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="category banner"
            />
          </div>
          <CategoryList
            catId={catId}
            sort={sort}
            maxPrice={maxPrice}
            selectedCat={selectedSubCats}
          />
        </section>
      </main>
      <div className={styles.options} style={{ left: open ? "0" : "-30rem" }}>
        <div className={styles.mobileTop}>
          <h3>women categories</h3>
          <div className={styles.inputWrapper}>
            <div className={styles.inputBox}>
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
            </div>
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
              <label htmlFor="1">highest price</label>
            </div>
            <div className={styles.inputBox}>
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={() => setSort("desc")}
              />
              <label htmlFor="2">lowest price</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
