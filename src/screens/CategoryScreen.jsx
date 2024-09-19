import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const CategoryScreen = () => {
  const { pageNumber = 1, keyword = '', category } = useParams(); // Retrieve category from URL params

  // Pass category to the query
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category, // Add category parameter
  });

  console.log(data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products {category ? `in ${category}` : ''}</h1>
          <Row>
            {data.products.length > 0 ? (
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <Message>No products found</Message>
            )}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
            category={category ? category : ''} // Pass category to Paginate
          />
        </>
      )}
    </>
  );
};

export default CategoryScreen;
