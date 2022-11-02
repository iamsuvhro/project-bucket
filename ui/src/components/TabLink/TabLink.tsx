import { NavLink, useMatch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
interface Props {
  to: string;
  text: string;
}

const TabLink = ({ to, text }: Props) => {
  const isActive = useMatch(encodeURI(to));

  return (
    <li
      className={`noselect cursor-pointer font-medium font-sans inline-block first:rounded-l last:rounded-r ${
        isActive
          ? "text-white bg-black shadow-lg"
          : " bg-gray-200 text-gray-800 text-primary_black"
      }`}
    >
      <NavLink to={to} className={`inline-block px-4 py-3`}>
        <span>{text} </span>
      </NavLink>
    </li>
  );
};

export default TabLink;