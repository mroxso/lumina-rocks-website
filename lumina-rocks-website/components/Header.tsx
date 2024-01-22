import Link from "next/link";
import { Button } from "react-bootstrap";
import LoginButton from "./LoginButton";

const Header: React.FC = () => {
  return (
    <header className="d-flex justify-content-between align-items-md-center pb-3 mb-5 border-bottom">
      <h1 className="h4">
        <Link
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          {/* <svg 
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-bootstrap-fill d-inline-block me-2"
          viewBox="0 0 16 16"
          >
            <path fill="#8A3FFC" d="M58.4,-37.7C68.2,-16.7,63.5,8.6,51.4,27.4C39.2,46.1,19.6,58.3,-2.6,59.8C-24.8,61.3,-49.6,52.1,-60.7,33.9C-71.9,15.7,-69.4,-11.5,-57,-33.9C-44.6,-56.4,-22.3,-74.1,1,-74.7C24.3,-75.2,48.6,-58.7,58.4,-37.7Z" transform="translate(100 100)" />
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-bootstrap-fill d-inline-block me-2"
            viewBox="0 0 16 16"
          >
            <path d="M6.375 7.125V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" />
            <path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396H5.062z" />
          </svg>
          <span>LUMINA.rocks</span>
        </Link>
      </h1>
      {/* <a
        href="https://github.com/twbs/examples/tree/main/react-nextjs/"
        target="_blank"
        rel="noopener"
      >
        View on GitHub
      </a> */}
      <LoginButton />
    </header>
  );
};

export default Header;
