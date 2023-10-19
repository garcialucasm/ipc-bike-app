import PropTypes from "prop-types";
import NextHead from "next/head";

// Define the type for the 'Header' component props
type HeaderProps = {
  title: string;
};

function Head({ title }: HeaderProps) {
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Head;
