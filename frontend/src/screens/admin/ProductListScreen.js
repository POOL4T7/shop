import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import {
  listProduct,
  deleteProduct,
  createNewProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constrants/productConstrants";
import Paginate from "../../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const page = match.params.page || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = productDelete;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
    product: createProduct,
  } = productCreate;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (createSuccess) {
      history.push(`/admin/product/${createProduct._id}/edit`);
    } else {
      dispatch(listProduct("", page));
    }
  }, [
    dispatch,
    history,
    userInfo,
    deleteSuccess,
    createSuccess,
    createProduct,
    page,
  ]);
  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createNewProduct());
  };
  return (
    <>
      <Row className="text-align-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-center">
          <Button
            type="button"
            className="btn my-3"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {createLoading && <Loader />}
      {createError && <Message variant="danger">{createError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td> {product._id} </td>
                <td> {product.name} </td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} />
    </>
  );
};

export default ProductListScreen;
