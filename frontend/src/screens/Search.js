import React from "react";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import ReactPaginate from "react-paginate";
import { RotatingLines } from "react-loader-spinner";

const searchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loader: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loader: false,
        productz: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
        totalItems: action.payload.numItems,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loader: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default function Search() {
  const [state, dispatch] = useReducer(searchReducer, {
    loader: false,
    productz: [],
    error: "",
  });
  const totalItems = state.totalItems;

  const [searchParams] = useSearchParams(); // deleted setSearchParams here?
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const option = searchParams.get("option") || "newest";
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:3019/api/products/search?category=${category}&query=${query}&rating=${rating}&price=${price}&option=${option}&page=${page}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", error: error });
      }
    };
    fetch();
  }, [category, query, rating, price, option, page]);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await axios.get(
        "http://localhost:3019/api/products/category"
      );
      setCategoryList(result.data.data);
    };
    fetchCategory();
  }, []);

  const getFilterURL = (filterType) => {
    const filterCateg = filterType.category || category;
    const filterPrice = filterType.price || price;
    const filterRating = filterType.rating || rating;
    const filterOption = filterType.option || option;
    const filterPage = filterType.page || page;
    return `/search?category=${filterCateg}&price=${filterPrice}&rating=${filterRating}&option=${filterOption}&page=${filterPage}`;
  };

  const handlePageClick = (event) => {
    navigate(getFilterURL({ page: event.selected + 1 }));
  };

  return (
    <div className="searchContainer">
      <Container>
        <Row>
          <Col className="searchColOne" lg={2}>
            <div className="searchCategory">
              <h5>Category</h5>
              <li className={"all" === category ? "active-filter" : ""}>
                <Link to={getFilterURL({ category: "all" })}>All</Link>
              </li>
              {categoryList.map((item, index) => (
                <li
                  key={index}
                  className={item === category ? "active-filter" : ""}
                >
                  <Link to={getFilterURL({ category: item })}>{item}</Link>
                </li>
              ))}
            </div>
            <br></br>
            <div className="searchPrice">
              <hr className="my-line"></hr>

              <h5>Price</h5>
              <div>
                <li className={"all" === price ? "active-filter" : ""}>
                  <Link to={getFilterURL({ price: "all" })}>Any</Link>
                </li>
                <li className={"1-50" === price ? "active-filter" : ""}>
                  <Link to={getFilterURL({ price: "1-50" })}>$1 to $50</Link>
                </li>
                <li className={"51-100" === price ? "active-filter" : ""}>
                  <Link to={getFilterURL({ price: "51-100" })}>
                    $51 to $100
                  </Link>
                </li>
                <li className={"101-200" === price ? "active-filter" : ""}>
                  <Link to={getFilterURL({ price: "101-200" })}>
                    $101 to $200
                  </Link>
                </li>
                <li className={"200" === price ? "active-filter" : ""}>
                  <Link to={getFilterURL({ price: "200" })}>$200+</Link>
                </li>
              </div>
            </div>
            <br></br>
            <div className="searchRating">
              <hr className="my-line"></hr>

              <h5>Rating</h5>
              <div>
                <li className={"4" === rating ? "active-filter" : ""}>
                  <Link to={getFilterURL({ rating: "4" })}>
                    4 stars and above
                  </Link>
                </li>
                <li className={"3" === rating ? "active-filter" : ""}>
                  <Link to={getFilterURL({ rating: "3" })}>
                    3 stars and above
                  </Link>
                </li>
                <li className={"2" === rating ? "active-filter" : ""}>
                  <Link to={getFilterURL({ rating: "2" })}>
                    2 stars and above
                  </Link>
                </li>
                <li className={"1" === rating ? "active-filter" : ""}>
                  <Link to={getFilterURL({ rating: "1" })}>
                    1 stars and above
                  </Link>
                </li>
                <li
                  className={
                    "0" === rating || "all" === rating ? "active-filter" : ""
                  }
                >
                  <Link to={getFilterURL({ rating: "0" })}>
                    0 stars and above
                  </Link>
                </li>
              </div>
              <hr></hr>
            </div>
          </Col>
          <Col className="searchColTwo" lg={10}>
            <div className="search-log">
              {state.totalItems === 0 ? (
                <h4>No Results</h4>
              ) : (
                <h4>{state?.totalItems} Results</h4>
              )}

              <select
                onChange={(e) => {
                  navigate(getFilterURL({ option: e.target.value }));
                }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="increase">Low to High Price</option>
                <option value="decrease">High to Low Price</option>
              </select>
            </div>

            <div className="productsContainer">
              {state.loader ? (
                <div className="load-container margin-top">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="36"
                    visible={true}
                  />
                </div>
              ) : (
                state.productz.map((data, index) => (
                  <Product value={data} key={index} />
                ))
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={2}></Col>
          <Col lg={10}>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              pageCount={Math.ceil(totalItems / 4)}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="pagination-link"
              previousClassName="pagination-previous"
              nextClassName="pagination-next"
              activeClassName="active"
              disabledClassName="pagination-disabled"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
