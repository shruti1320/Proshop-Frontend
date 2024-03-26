import "../../scss/CategoryItem.scss"
import { useTranslation } from "react-i18next";


const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;

  const { t, i18n } = useTranslation("global");
  return (
    <div className='category-container'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>{t("common.shopNow")}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
