import { useEffect, useState } from "react";
import { Table, Spin, Alert, Button } from "antd";
import axios from "axios";


const ProductDetails = ({ onSelectProduct }) => {
  const [dataSource, setDataSource] = useState([]);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setDataSource(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const storedCompared =
      JSON.parse(localStorage.getItem("compareProducts")) || [];
    setComparedProducts(storedCompared);
  }, []);

  const handleCompare = (product) => {
    let compareList = [...comparedProducts];

    if (!compareList.some((p) => p.id === product.id)) {
      if (compareList.length < 4) {
        compareList.push(product);
        localStorage.setItem("compareProducts", JSON.stringify(compareList));
        setComparedProducts(compareList);
      } else {
        alert("You can compare up to 4 products only!");
        return;
      }
    }
    onSelectProduct && onSelectProduct(product);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
     
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true, 
    }
,    
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (src) => <img src={src} alt="thumb" width={70} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleCompare(record)}
          disabled={comparedProducts.some((p) => p.id === record.id)}
        >
          {comparedProducts.some((p) => p.id === record.id)
            ? "Added"
            : "Compare"}
        </Button>
      ),
    },
  ];

  if (loading)
    return (
      <div className="center-spinner">
        <Spin size="large" />
      </div>
    );

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Product Details</h2>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
