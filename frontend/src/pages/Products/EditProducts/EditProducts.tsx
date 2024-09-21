// import './EditProducts.css';
// import backarrow from "../../../assets/back-arrow.png";
// import Logo from "../../../assets/logo.png";
// import { Card, Col, Row, Input, Form, InputNumber, Select, Upload, Image, Button, message, Flex } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import type { GetProp, UploadFile, UploadProps } from 'antd';
// import { CreateProducts, GetCategory, GetCondition, GetSellerByMemberId, UpdateProducts } from '../../../services/http';
// import { CategoryInterface } from '../../../interfaces/Category';
// import { ConditionInterface } from '../../../interfaces/Condition';
// import { ProductsInterface } from '../../../interfaces/Products';
// import { UploadOutlined } from '@ant-design/icons';
// import ImgCrop from 'antd-img-crop';
// import { SellerInterface } from '../../../interfaces/Seller';


// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
// const { Option } = Select;

// function EditProducts () {
//   const navigate = useNavigate();
//   const [messageApi, contextHolder] = message.useMessage();
//   const [category, setcategory] = useState<CategoryInterface[]>([]);
//   const [condition, setcondition] = useState<ConditionInterface[]>([]);
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   // Seller state
//   const [seller, setSeller] = useState<SellerInterface | null>(null);
//   const [sellerId, setSellerId] = useState<number | null>(null);

//     // Function to fetch seller by member_id
//     const fetchSeller = async (member_id: number) => {
//       const res = await GetSellerByMemberId(member_id); // Call the function
//       if (!res.error) {
//         setSeller(res.seller); // Set the seller object
//         setSellerId(res.seller_id); // Set the seller ID
//       } else {
//         message.error(res.error); // Display error message if any
//       }
//     };

//       // Fetch the seller when the component mounts or the member_id changes
//   useEffect(() => {
//     const memberId = Number(localStorage.getItem("id")); // Assuming member_id is stored in localStorage
//     if (memberId) {
//       fetchSeller(memberId); // Fetch seller using the member ID
//     }
//   }, []);

//   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as FileType);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };


//     // Handle form submission
//     const onFinish = async (values: ProductsInterface) => {
//       if (!sellerId) {
//         message.error("Seller ID is missing. Unable to update product.");
//         return;
//       }
    
//       if (!fileList.length || !fileList[0]?.thumbUrl) {
//         messageApi.open({
//           type: "error",
//           content: "กรุณาอัปโหลดรูปสินค้า!",
//         });
//         return;
//       }
    
//       // Attach the image to the product values
//       values.PictureProduct = fileList[0].thumbUrl;
//       values.SellerId = sellerId; // Ensure seller ID is set
//       values.Status = "Available"; // Set Status to "Available"
      
//       console.log("Product ID:", values.ID); // Log the product ID if updating
//       console.log("Form values:", values);
    
//       try {
//         let res;
//         if (values.ID) {
//           // If the product has an ID, update the product
//           res = await UpdateProducts(values);
//         } else {
//           // If no ID, it's a new product, so create it
//           res = await CreateProducts(values);
//         }
    
//         if (res) {
//           messageApi.open({
//             type: "success",
//             content: values.ID ? "แก้ไขข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ",
//           });
//           setTimeout(() => navigate("/MyProducts"), 2000);
//         } else {
//           throw new Error("Error saving product.");
//         }
//       } catch (error) {
//         console.error(error);
//         messageApi.open({
//           type: "error",
//           content: "เกิดข้อผิดพลาดในการบันทึกข้อมูล!",
//         });
//       }
//     };
    

//  //Sellect Products
//   const getcategory = async () => {
//     let res = await GetCategory();
//     if (res) {
//       setcategory(res);
//     }
//   };

//   useEffect(() => {
//     getcategory();
//   }, []);

//   const getcondition = async () => {
//     let res = await GetCondition();
//     if (res) {
//       setcondition(res);
//     }
//   };
//   useEffect(() => {
//     getcondition();
//   }, []);

//   const handleBacktoHomeSeller = () => {
//     navigate('/MyProducts'); 
//   };




//   return (
//     <div>
//     <Flex>
//       {contextHolder}
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
//         <Card
//           style={{
//             marginLeft:"200px",
//             borderRadius: "12px",
//             padding: "24px",
//             background: "#e2dfdf",
//             width: "1100px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           }}
//         >
//           <Row gutter={[16, 16]} justify="center">
//             <Col span={24} style={{ textAlign: "center" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: "10px",
//                   marginTop: "-80px",
//                 }}
//               >
//                 <img
//                   src={Logo}
//                   alt="Course Logo"
//                   style={{
//                     width: "200px",
//                     marginRight: "20px",
//                     marginTop: "0",
//                   }}
//                 />
//                 <h2 style={{ margin: "0 180px" }}>แก้ไขข้อมูลสินค้า</h2>
//                 <img
//                   src={backarrow}
//                   alt="backarrow"
//                   onClick={handleBacktoHomeSeller}
//                   style={{
//                     width: "40px",
//                     cursor: "pointer",
//                     marginLeft: "130px",
//                   }}
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Form onFinish={onFinish}>
//             <Row gutter={[16, 16]} justify="center" style={{ marginTop: "-40px", height: "425px" }}>
//               <Col span={12}>
//                 {/* Product Name */}
//                 <Form.Item
//                   label="ชื่อสินค้า"
//                   name="Title"
//                   rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า!" }]}
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <Input placeholder="ชื่อสินค้า" size="large" style={{ width: "100%" }} />
//                 </Form.Item>

//                 {/* Product Description */}
//                 <Form.Item
//                   label="รายละเอียดของสินค้า"
//                   name="Description"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <Input.TextArea
//                     placeholder="คำอธิบาย"
//                     size="large"
//                     autoSize={{ minRows: 4, maxRows: 6 }}
//                     style={{ width: "100%" }}
//                   />
//                 </Form.Item>

//                 {/* Product Price */}
//                 <Form.Item
//                   label="ราคาสินค้า"
//                   name="Price"
//                   rules={[{ required: true, message: "กรุณากรอกราคาสินค้า!" }]}
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <InputNumber placeholder="ราคาสินค้า" size="large" style={{ width: "100%" }} />
//                 </Form.Item>

//                 {/* Product Category */}
//                 <Form.Item
//                   label="หมวดหมู่สินค้า"
//                   name="CategoryID"
//                   rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่สินค้า!" }]}
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <Select size="large" style={{ width: "100%" }}>
//                     {category.map((item) => (
//                       <Option value={item.ID} key={item.NameCategory}>
//                         {item.NameCategory}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>

//                 {/* Product Condition */}
//                 <Form.Item
//                   label="สภาพสินค้า"
//                   name="ConditionID"
//                   rules={[{ required: true, message: "กรุณาเลือกสภาพสินค้า!" }]}
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <Select size="large" style={{ width: "100%" }}>
//                     {condition.map((item) => (
//                       <Option value={item.ID} key={item.NameCondition}>
//                         {item.NameCondition}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>

//                 {/* Product Weight */}
//                 <Form.Item
//                   label="น้ำหนักสินค้า"
//                   name="Weight"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <InputNumber placeholder="ไม่จำเป็นต้องระบุ" size="large" style={{ width: "100%" }} />
//                 </Form.Item>
//               </Col>

//               {/* Image Upload */}
//               <Col span={12} 
//                 style={{ 
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",     
//                   marginTop: "-10px",
//                   flexDirection: "column",
//                 }}>
//                 <Form.Item name="PictureProduct" valuePropName="fileList">
//                   <ImgCrop rotationSlider>
//                     <Upload
//                       fileList={fileList}
//                       onChange={onChange}
//                       onPreview={onPreview}
//                       beforeUpload={(file) => {
//                         setFileList([...fileList, file]);
//                         return false;
//                       }}
//                       maxCount={5}
//                       multiple={true}
//                       listType="picture"
//                     >
//                       {fileList.length < 5 && (
//                         <Button
//                           type="primary"
//                           icon={<UploadOutlined />}
//                           style={{ 
//                            backgroundColor: "#212020",
//                            borderColor: "#181818",
//                            color: "#fff",
//                            marginTop: "10px",
//                           }}
//                         >
//                           Upload
//                         </Button>
//                       )}
//                     </Upload>
//                   </ImgCrop>
//                 </Form.Item>
//               </Col>

//               {/* Submit Button */}
//               <Row justify="center">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   size="large"
//                   style={{
//                     backgroundColor: "#ffa24c",
//                     borderColor: "#ffa24c",
//                     borderRadius: "8px",
//                     padding: "0 60px",
//                     marginTop: "-35px",
//                     marginLeft: "520px",
//                   }}
//                 >
//                   ยืนยัน
//                 </Button>
//               </Row>

//               <Row justify="center">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   size="large"
//                   // onClick={OpenSellerHome}
//                   style={{
//                     width:"160px",
//                     backgroundColor: "#ffa24c",
//                     borderColor: "#ffa24c",
//                     borderRadius: "8px",
//                     padding: "0 60px",
//                     marginTop:"-90px",
//                     marginLeft:"350px",
//                   }}
//                 >
//                 ลบสินค้า
//               </Button>
//             </Row>

//             </Row>
//           </Form>
//         </Card>
//       </div>
//     </Flex>
//     </div>
//   );
// };

// export default EditProducts;





//Code Test
import './EditProducts.css';
import backarrow from "../../../assets/back-arrow.png";
import Logo from "../../../assets/logo.png";
import { Card, Col, Row, Input, Form, InputNumber, Select, Upload, Image, Button, message, Flex } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'; // เพิ่ม useParams เพื่อดึง productId
import { useEffect, useState } from 'react';
import type {  UploadFile, UploadProps } from 'antd';
import { GetCategory, GetCondition, GetProductsById, UpdateProducts } from '../../../services/http'; // เพิ่ม GetProductById
import { CategoryInterface } from '../../../interfaces/Category';
import { ConditionInterface } from '../../../interfaces/Condition';
import { ProductsInterface } from '../../../interfaces/Products';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const { Option } = Select;

function EditProducts () {
  const navigate = useNavigate();
  const [pid , setPid] = useState<number | null>(Number(localStorage.getItem("id")));
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState<CategoryInterface[]>([]);
  const [condition, setCondition] = useState<ConditionInterface[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm(); // ใช้ form เพื่อจัดการการตั้งค่าเริ่มต้นของฟอร์ม

  // Fetch Product Information
  const fetchProductById = async (id: number) => {
    const res = await GetProductsById(id);
    if (res) {
      form.setFieldsValue(res); // เติมค่าในฟอร์มด้วยข้อมูลที่ได้มา
      if (res.PictureProduct) {
        setFileList([{
          url: res.PictureProduct, name: 'image', status: 'done',
          pid: ''
        }]); // ตั้งค่าภาพที่มีอยู่แล้ว
      }
    } else {
      messageApi.error("Error fetching product");
    }
  };

  // Fetch product when the component mounts
  useEffect(() => {
    if (pid) {
      fetchProductById(pid);
    }
  }, [pid]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: ProductsInterface) => {
    // ใช้ originFileObj จาก fileList ที่ได้จากการอัปโหลด
    const file = fileList[0]?.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        values.PictureProduct = base64data; // ใช้ base64 สำหรับเก็บรูปที่ครอบแล้ว
        const res = await UpdateProducts(pid!, values); // ส่ง productId และค่าใหม่ไปยัง API
        if (res) {
          messageApi.open({
            type: "success",
            content: "อัปเดตข้อมูลสินค้าเรียบร้อย",
          });
          setTimeout(() => {
            navigate("/MyProducts");
          }, 2000);
        } else {
          messageApi.open({
            type: "error",
            content: res.message,
          });
        }
      };
    } else {
      values.PictureProduct = fileList[0]?.url || ""; // ถ้าไม่มีการอัปโหลดใหม่ ให้ใช้ URL ของภาพที่มีอยู่แล้ว
      const res = await UpdateProducts(pid!, values); // ส่ง productId และค่าใหม่ไปยัง API
      if (res) {
        messageApi.open({
          type: "success",
          content: "อัปเดตข้อมูลสินค้าเรียบร้อย",
        });
        setTimeout(() => {
          navigate("/MyProducts");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    }
  };

  const getCategory = async () => {
    const res = await GetCategory();
    if (res) {
      setCategory(res);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCondition = async () => {
    const res = await GetCondition();
    if (res) {
      setCondition(res);
    }
  };

  useEffect(() => {
    getCondition();
  }, []);

  const handleBacktoHomeSeller = () => {
    navigate('/MyProducts');
  };

  return (
    <div>
      <Flex>
        {contextHolder}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <Card
            style={{
              marginLeft: "200px",
              borderRadius: "12px",
              padding: "24px",
              background: "#e2dfdf",
              width: "1100px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Row gutter={[16, 16]} justify="center">
              <Col span={24} style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    marginTop: "-80px",
                  }}
                >
                  <img
                    src={Logo}
                    alt="Course Logo"
                    style={{
                      width: "200px",
                      marginRight: "20px",
                      marginTop: "0",
                    }}
                  />
                  <h2 style={{ margin: "0 180px" }}>แก้ไขข้อมูลสินค้า</h2>
                  <img
                    src={backarrow}
                    alt="backarrow"
                    onClick={handleBacktoHomeSeller}
                    style={{
                      width: "40px",
                      cursor: "pointer",
                      marginLeft: "130px",
                    }}
                  />
                </div>
              </Col>
            </Row>

            <Form form={form} onFinish={onFinish}>
              <Row gutter={[16, 16]} justify="center" style={{ marginTop: "-40px", height: "425px" }}>
                <Col span={12}>
                  {/* Product Name */}
                  <Form.Item
                    label="ชื่อสินค้า"
                    name="Title"
                    rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}
                    style={{ marginBottom: "16px" }}
                  >
                    <Input placeholder="ชื่อสินค้า" size="large" style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Product Description */}
                  <Form.Item
                    label="รายละเอียดของสินค้า"
                    name="Description"
                    style={{ marginBottom: "16px" }}
                  >
                    <Input.TextArea
                      placeholder="คำอธิบาย"
                      size="large"
                      autoSize={{ minRows: 4, maxRows: 6 }}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  {/* Product Price */}
                  <Form.Item
                    label="ราคาสินค้า"
                    name="Price"
                    rules={[{ required: true, message: "กรุณากรอกราคาสินค้า" }]}
                    style={{ marginBottom: "16px" }}
                  >
                    <InputNumber placeholder="ราคาสินค้า" size="large" style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Product Category */}
                  <Form.Item
                    label="หมวดหมู่สินค้า"
                    name="CategoryID"
                    rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่สินค้า" }]}
                    style={{ marginBottom: "16px" }}
                  >
                    <Select size="large" style={{ width: "100%" }}>
                      {category.map((item) => (
                        <Option value={item.ID} key={item.NameCategory}>
                          {item.NameCategory}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Product Condition */}
                  <Form.Item
                    label="สภาพสินค้า"
                    name="ConditionID"
                    rules={[{ required: true, message: "กรุณาเลือกสภาพสินค้า" }]}
                    style={{ marginBottom: "16px" }}
                  >
                    <Select size="large" style={{ width: "100%" }}>
                      {condition.map((item) => (
                        <Option value={item.ID} key={item.NameCondition}>
                          {item.NameCondition}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Product Weight */}
                  <Form.Item
                    label="น้ำหนักสินค้า"
                    name="Weight"
                    style={{ marginBottom: "16px" }}
                  >
                    <InputNumber placeholder="ไม่จำเป็นต้องระบุ" size="large" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                {/* Image Upload */}
                <Col span={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-10px",
                    flexDirection: "column",
                  }}>
                  <Form.Item name="PictureProduct" valuePropName="fileList">
                    <ImgCrop rotationSlider>
                      <Upload
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        beforeUpload={(file) => {
                          setFileList([...fileList, file]);
                          return false;
                        }}
                        maxCount={5}
                        multiple={true}
                        listType="picture"
                      >
                        {fileList.length < 5 && (
                          <Button
                            type="primary"
                            icon={<UploadOutlined />}
                            style={{
                              backgroundColor: "#212020",
                              borderColor: "#181818",
                              color: "#fff",
                              marginTop: "10px",
                            }}
                          >
                            Upload
                          </Button>
                        )}
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </Col>

                {/* Submit Button */}
                <Row justify="center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                      backgroundColor: "#ffa24c",
                      borderColor: "#ffa24c",
                      borderRadius: "8px",
                      padding: "0 60px",
                      marginTop: "-75px",
                      marginLeft: "750px",
                    }}
                  >
                    ยืนยัน
                  </Button>
                </Row>

                <Row justify="center">
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      width: "160px",
                      backgroundColor: "#212020",
                      borderColor: "#212020",
                      borderRadius: "8px",
                      padding: "0 60px",
                      marginTop: "-90px",
                      marginLeft: "350px",
                    }}
                  >
                    ลบสินค้า
                  </Button>
                </Row>
              </Row>
            </Form>
          </Card>
        </div>
      </Flex>
    </div>
  );
}

export default EditProducts;












 // return (
  //   <>
  //   <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
  //     <Card
  //       style={{
  //         borderRadius: "12px",
  //         padding: "24px",
  //         background: "#e2dfdf",
  //         width: "1100px",
  //         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  //       }}>
  //       <Row gutter={[16, 16]} justify="center">
  //         <Col span={24} style={{ textAlign: "center" }}>
  //           <div
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "center",
  //               marginBottom: "10px",
  //               marginTop: "-80px",
  //             }}
  //           >
  //             <img
  //               src={Logo}
  //               alt="Course Logo"
  //               style={{
  //                 width: "200px",
  //                 marginRight: "20px",
  //                 marginTop: "0",
  //               }}
  //             />
  //             <h2 style={{ margin: "0 180px" }}>แก้ไขสินค้า</h2>
  //             <img
  //               src={backarrow}
  //               alt="backarrow"
  //               onClick={handleBacktoHome}
  //               style={{
  //                 width: "40px",
  //                 cursor: "pointer",
  //                 marginLeft: "130px",
  //               }}
  //             />
  //           </div>
  //         </Col>
  //       </Row>
  
  //       <Row gutter={[16, 16]} justify="center" 
  //         style={{ 
  //           display:"flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           marginTop: "-40px", 
  //           height: "425px" }}>
  //         <Col span={12}>
  //           <Form onFinish={onFinish}>
  //             <Form.Item
  //               label="ชื่อสินค้า"
  //               name="Title"
  //               rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า!" }]}
  //               style={{ marginBottom: "16px" }}
  //             >
  //               <Input placeholder="ชื่อสินค้า" size="large" style={{ width: "100%" }} />
  //             </Form.Item>
  
  //             <Form.Item
  //               label="รายละเอียดของสินค้า"
  //               name="Description"
  //               style={{ marginBottom: "16px" }}
  //             >
  //               <Input.TextArea
  //                 placeholder="คำอธิบาย"
  //                 size="large"
  //                 autoSize={{ minRows: 4, maxRows: 6 }}
  //                 style={{ width: "100%" }}
  //               />
  //             </Form.Item>
  
  //             <Form.Item
  //               label="ราคาสินค้า"
  //               name="Price"
  //               rules={[{ required: true, message: "กรุณากรอกราคาสินค้า!" }]}
  //               style={{ marginBottom: "16px" }}
  //             >
  //               <InputNumber placeholder="ราคาสินค้า" size="large" style={{ width: "100%" }} />
  //             </Form.Item>
  
  //             <Form.Item
  //               label="หมวดหมู่สินค้า"
  //               name="CategoryID"
  //               rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่สินค้า!" }]}
  //               style={{ marginBottom: "16px" }}
  //             >
  //                 <Select size="large" style={{ width: "100%" }} >
  //                 {category.map((item) => (
  //                       <Option value={item.ID} key={item.NameCategory}>
  //                         {item.NameCategory}
  //                       </Option>
  //                     ))}
  //                 </Select>
  //             </Form.Item>
  
  //             <Form.Item
  //               label="สภาพสินค้า"
  //               name="ConditionID"
  //               rules={[{ required: true, message: "กรุณาเลือกสภาพสินค้า!" }]}
  //               style={{ marginBottom: "16px" }}
  //             >
  //                 <Select size="large" style={{ width: "100%" }} > 
  //                 {condition.map((item) => (
  //                       <Option value={item.ID} key={item.NameCondition}>
  //                         {item.NameCondition}
  //                       </Option>
  //                     ))}
  //                 </Select>
  //             </Form.Item>
  
  //             <Form.Item
  //               label="น้ำหนักสินค้า"
  //               name="Weight"
  //               style={{ marginBottom: "16px" }}
  //             >
  //               <InputNumber placeholder="ไม่จำเป็นต้องระบุ" size="large" style={{ width: "100%" }} />
  //             </Form.Item>
  //           </Form>
  //         </Col>
  
  //         <Col span={12} 
  //               style={{ 
  //                 display: "flex",
  //                 justifyContent: "center",
  //                 alignItems: "center",     
  //                 marginTop: "-10px",
  //                 flexDirection: "column",
  //               }}>
  //               <Form.Item name="PictureProduct" valuePropName="fileList">
  //                 <ImgCrop rotationSlider>
  //                   <Upload
  //                     fileList={fileList}
  //                     onChange={onChange}
  //                     onPreview={onPreview}
  //                     beforeUpload={(file) => {
  //                       setFileList([...fileList, file]);
  //                       return false;
  //                     }}
  //                     maxCount={5}
  //                     multiple={true}
  //                     listType="picture"
  //                   >
  //                     {fileList.length < 5 && (
  //                       <Button
  //                         type="primary"
  //                         icon={<UploadOutlined />}
  //                         style={{ 
  //                          backgroundColor: "#212020",
  //                          borderColor: "#181818",
  //                          color: "#fff",
  //                          marginTop: "10px",
  //                         }}
  //                       >
  //                         Upload
  //                       </Button>
  //                     )}
  //                   </Upload>
  //                 </ImgCrop>
  //               </Form.Item>
  //             </Col>

  //         <Row justify="center">
  //             <Button
  //               type="primary"
  //               htmlType="submit"
  //               size="large"
  //               // onClick={OpenSellerHome}
  //               style={{
  //                 backgroundColor: "#212020",
  //                 borderColor: "#212020",
  //                 borderRadius: "8px",
  //                 padding: "0 60px",
  //                 marginTop:"-75px",
  //                 marginLeft:"750px",
  //               }}
  //             >
  //               ยืนยัน
  //             </Button>
  //           </Row>

  //           <Row justify="center">
  //             <Button
  //               type="primary"
  //               htmlType="submit"
  //               size="large"
  //               // onClick={OpenSellerHome}
  //               style={{
  //                 width:"160px",
  //                 backgroundColor: "#ffa24c",
  //                 borderColor: "#ffa24c",
  //                 borderRadius: "8px",
  //                 padding: "0 60px",
  //                 marginTop:"-90px",
  //                 marginLeft:"350px",
                  
  //               }}
  //             >
  //               ลบสินค้า
  //             </Button>
  //           </Row>
            
  //       </Row>
  //     </Card>
  //   </div>
  // </>
  
  // );
