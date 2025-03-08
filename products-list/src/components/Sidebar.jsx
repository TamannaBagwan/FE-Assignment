import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/product-details">
            <ListItemText primary="Product Details" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/compare-products">
            <ListItemText primary="Compare Products Page" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

const ProductDetails = ({ onCompare }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Compare Products",
      key: "compare",
      render: (text, record) => (
        <Button onClick={() => onCompare(record)}>Compare</Button>
      ),
    },
  ];

  return <Table dataSource={products} columns={columns} rowKey="id" />;
};

const CompareProducts = ({ comparedProducts, removeProduct }) => {
  return (
    <div>
      <h2>Compare Products</h2>
      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {comparedProducts.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <h3>{product.title}</h3>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <Button onClick={() => removeProduct(product.id)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Sidebar, ProductDetails, CompareProducts };
