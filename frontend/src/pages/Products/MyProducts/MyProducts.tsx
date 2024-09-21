// import NavbarMyProducts from '../../../component/navbarproducts';
// import "./MyProducts.css";
// import { Card, Col, Row } from 'antd';
// import market from "../../../assets/market.png";




// interface Products {
//   ID: number;
//   Title: string;
//   Price: number;
//   Picture_product: string;
//   Description: string;
//   SellerID: number;
// }

// const Products = () => {

//   const { Meta } = Card;
//   return (
//     <>
//       <div className='homemyproduct'>
//         <NavbarMyProducts />
//           <div className='headmyproducts'>
//             <img src={market} alt="market" style={{width:"30px", height:"30px"}}/>
//             <h2>MyProduct</h2>
//           </div>
//         <Row gutter={[16, 16]}>
//           <Col span={5} >
//             <Card
//               hoverable
//               style={{ 
//                 width: 150,
//                 height: 100,
//                 marginTop: 15,
//                 marginLeft:80
//               }}

//               cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
//             >
//               <Meta title="Europe Street beat" description="www.instagram.com" />
//             </Card>
//           </Col>
//           <Col span={6} />
//           <Col span={6} />
//           <Col span={6} />
          
//           <Col span={6} />
//           <Col span={6} />
//           <Col span={6} />
//           <Col span={6} />
//         </Row>


//       </div>

//     </>
//   );
// }

// export default Products;





// import { Button, Card, message } from "antd";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GetProductsBySellerId, GetSellerByMemberId } from "../../../services/http/index";
// import "./MyProducts.css";
// import Logo from "../../../assets/logo.png";
// import Back from "../../../assets/back-arrow.png";
// import Chat from "../../../assets/chat.png";
// import List from "../../../assets/list.png";
// import Notification from "../../../assets/notifications-button.png";
// import ShoppingCartIcon from "../../../assets/shopping-cart.png";
// import { SellerInterface } from "../../../interfaces/Seller";

// const { Meta } = Card;

// interface Products {
//   ID: number;
//   Title: string;
//   Price: number;
//   PictureProduct: string;
//   Description: string;
//   SellerID: number;
//   OrderID?: number;
// }

// const Index: React.FC = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Products[]>([]);
//   const [messageApi, contextHolder] = message.useMessage();

//   // Seller state
//   const [seller, setSeller] = useState<SellerInterface | null>(null);
//   const [sellerId, setSellerId] = useState<number | null>(null);

//   // Fetch products by seller ID
//   const fetchProductsBySellerId = async (sellerId: number) => {
//     const res = await GetProductsBySellerId(sellerId, 1, 10); // Assuming page 1 and 10 products per page
//     if (res) {
//       setProducts(res.products); // Set the products
//     } else {
//       messageApi.error("Error fetching products for seller");
//     }
//   };


//   // Function to fetch seller by member_id
//   const fetchSeller = async (member_id: number) => {
//     const res = await GetSellerByMemberId(member_id); // Call the function
//     if (!res.error) {
//       setSeller(res.seller); // Set the seller object
//       setSellerId(res.seller_id); // Set the seller ID
//       fetchProductsBySellerId(res.seller_id); // Fetch products for this seller
//     } else {
//       message.error(res.error); // Display error message if any
//     }
//   };

//   // Fetch the seller when the component mounts or the member_id changes
//   useEffect(() => {
//     const memberId = Number(localStorage.getItem("id")); // Assuming member_id is stored in localStorage
//     if (memberId) {
//       fetchSeller(memberId); // Fetch seller using the member ID
//     }
//   }, []);

//   const goToProductPage = () => {
//     navigate('/');
//   };

//   const handleToEditProduct = (id: number) => {
//     // When clicking on a product, navigate to /EditProducts with the product ID
//     navigate(`/EditProducts/${id}`);
//   };

//   return (
//     <div className="index">
//       {contextHolder}
//       <h1>My Products</h1>
//       <Button className="button-review">รีวิว</Button>
//       <Button className="button-score">คะแนนร้านค้า</Button>
//       <Button className="button-product">เพิ่มสินค้า</Button>
//       <Button className='button-icon button-icon5'>
//         <img src={Chat} alt='Chat' />
//       </Button>
//       <img src={Logo} className="logo" alt="Course Logo" />
//       <div className="right-section">
//         <div className="links">
//           <Button className="button-icon button-icon1">
//             <img src={ShoppingCartIcon} alt="Shopping Cart" />
//           </Button>
//           <Button className="button-icon button-icon2">
//             <img src={List} alt="List" />
//           </Button>
//           <Button className="button-icon button-icon3">
//             <img src={Notification} alt="Notification" />
//           </Button>
//           <Button className="button-icon button-icon4" onClick={goToProductPage}>
//             <img src={Back} alt="Back" />
//           </Button>
//         </div>
//       </div>
//       <div className="product-list">
//         {products.length > 0 ? (
//           products.map(product => (
//             <Card
//               key={product.ID}
//               hoverable
//               style={{ width: 240, margin: '10px' }}
//               cover={<img alt={product.Title} src={product.PictureProduct || 'https://via.placeholder.com/240'} />}
//               onClick={() => handleToEditProduct(product.ID)} // Navigate to product edit page
//             >
//               <Meta title={product.Title} description={`ราคา: ${product.Price} บาท`} />
//             </Card>
//           ))
//         ) : (
//           <p>ไม่มีสินค้าที่แสดงผล</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Index;
















//ทดสอบ เฉยๆ
import { Button, Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProductsBySellerId, GetSellerByMemberId } from "../../../services/http/index";
import "./MyProducts.css";
import Logo from "../../../assets/logo.png";
import Back from "../../../assets/back-arrow.png";
import Chat from "../../../assets/chat.png";
import List from "../../../assets/list.png";
import Notification from "../../../assets/notifications-button.png";
import ShoppingCartIcon from "../../../assets/shopping-cart.png";
import { SellerInterface } from "../../../interfaces/Seller";

const { Meta } = Card;

interface Products {
  ID: number;
  Title: string;
  Price: number;
  PictureProduct: string;
  Description: string;
  SellerID: number;
  OrderID?: number;
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // Seller state
  const [seller, setSeller] = useState<SellerInterface | null>(null);
  const [sellerId, setSellerId] = useState<number | null>(null);
  const [products, setProducts] = useState<Products[]>([]);

  // Fetch products by seller ID
  const fetchProductsBySellerId = async (sellerId: number) => {
    const res = await GetProductsBySellerId(sellerId, 1, 10); // Assuming page 1 and 10 products per page
    if (res) {
      setProducts(res.products); // Set the products
    } else {
      messageApi.error("Error fetching products for seller");
    }
  };


  // Function to fetch seller by member_id
  const fetchSeller = async (member_id: number) => {
    const res = await GetSellerByMemberId(member_id); // Call the function
    if (!res.error) {
      setSeller(res.seller); // Set the seller object
      setSellerId(res.seller_id); // Set the seller ID
      fetchProductsBySellerId(res.seller_id); // Fetch products for this seller
    } else {
      message.error(res.error); // Display error message if any
    }
  };

  // Fetch the seller when the component mounts or the member_id changes
  useEffect(() => {
    const memberId = Number(localStorage.getItem("id")); // Assuming member_id is stored in localStorage
    if (memberId) {
      fetchSeller(memberId); // Fetch seller using the member ID
    }
  }, []);

  const goToProductPage = () => {
    navigate('/');
  };

  const goToCreateProduct = () => {
    navigate('/createproducts');
  };

  const handleToEditProduct = (id: number) => {
    // When clicking on a product, navigate to /EditProducts with the product ID
    navigate(`/EditProducts/${id}`);
  };

  return (
    <div className="index">
      {contextHolder}
      <h1>My Products</h1>
      <Button className="button-review">รีวิว</Button>
      <Button className="button-score">คะแนนร้านค้า</Button>
      <Button className="button-product" onClick={goToCreateProduct}>เพิ่มสินค้า </Button>
      <Button className='button-icon button-icon5'>
        <img src={Chat} alt='Chat' />
      </Button>
      <img src={Logo} className="logo" alt="Course Logo" />
      <div className="right-section">
        <div className="links">
          <Button className="button-icon button-icon1">
            <img src={ShoppingCartIcon} alt="Shopping Cart" />
          </Button>
          <Button className="button-icon button-icon2">
            <img src={List} alt="List" />
          </Button>
          <Button className="button-icon button-icon3">
            <img src={Notification} alt="Notification" />
          </Button>
          <Button className="button-icon button-icon4" onClick={goToProductPage}>
            <img src={Back} alt="Back" />
          </Button>
        </div>
      </div>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <Card
              key={product.ID}
              hoverable
              style={{ width: 240, margin: '10px' }}
              cover={<img alt={product.Title} src={product.PictureProduct || 'https://via.placeholder.com/240'} />}
              onClick={() => handleToEditProduct(product.ID)} // Navigate to product edit page
            >
              <Meta title={product.Title} description={`ราคา: ${product.Price} บาท`} />
            </Card>
          ))
        ) : (
          <p>ไม่มีสินค้าที่แสดงผล</p>
        )}
      </div>
    </div>
  );
};

export default Index;
