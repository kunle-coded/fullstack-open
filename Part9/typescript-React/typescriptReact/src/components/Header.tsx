import React from "react";

interface TitleProps {
  name: string;
}

const Header = (props: TitleProps): React.JSX.Element => {
  return <h1>{props.name}</h1>;
};

export default Header;
