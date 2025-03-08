import { useEffect, useState } from "react";
import { Button, Spin, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const CompareProducts = () => {
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
  },
  addButton: {
    marginBottom: "10px",
    display: "block",
    margin: '30px',
   
  },
  spinnerContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  productsContainer: {
    display: "flex",
    flexWrap: "wrap", 
    overflowX: "auto", 
    gap: "15px",
    justifyContent: "center",
  },
  productCard: {
    border: "1px solid #ddd",
    padding: "10px",
    minWidth: "220px",
    maxWidth: "250px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  },
  productImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "5px",
  },
  productTitle: {
    fontSize: "16px",
    marginBottom: "5px",
  },
};

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const storedProducts =
        JSON.parse(localStorage.getItem("compareProducts")) || [];
      setCompareList(storedProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenModal = () => {
    if (compareList.length >= 4) {
      alert("You can't add more than 4 products to compare.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleRemove = (id) => {
    const updatedList = compareList.filter((product) => product.id !== id);
    setCompareList(updatedList);
    localStorage.setItem("compareProducts", JSON.stringify(updatedList));

    if (updatedList.length === 0) {
      navigate("/");
    }
  };

  const handleAddToCompare = (product) => {
    if (compareList.length >= 4) {
      alert("You can't compare more than 4 products at a time.");
      return;
    }

    const updatedList = [...compareList, product];
    setCompareList(updatedList);
    localStorage.setItem("compareProducts", JSON.stringify(updatedList));
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Compare Products</h2>
      <Button type="primary" onClick={handleOpenModal} style={styles.addButton}>
        Add More
      </Button>

      {loading ? (
        <div style={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      ) : compareList.length === 0 ? (
        <p>No products selected for comparison.</p>
      ) : (
        <div style={styles.productsContainer}>
          {compareList.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={styles.productImage}
              />
              <h3 style={styles.productTitle}>{product.title}</h3>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <Button danger onClick={() => handleRemove(product.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <Modal
        title="Select Products to Compare"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={window.innerWidth < 768 ? "90%" : 900} 
        bodyStyle={{ height: "500px", overflowY: "auto" }}
      >
        <ProductDetails onSelectProduct={handleAddToCompare} />
      </Modal>
    </div>
  );
};
export default CompareProducts;