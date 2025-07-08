import DrawerAppBar from "../components/DrawerAppBar.tsx";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DOMAIN, PROFILE } from "../constants/constants.ts";

const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Overdue tasks",
    url: "/overdue-tasks",
  },
  {
    title: "All tasks",
    url: "/all-tasks",
  },
  {
    title: "Task Category",
    url: "/task-category",
  },
  {
    title: "Log out",
    url: "/log-out",
  },
];
const MainNavigationContainer = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleOnClickNavigate = (href: string) => {
    navigate(href);
  };

  const handleOnClickLogout = () => {
    navigate("/login");
    // @ts-ignore
    removeCookie("token", {
      path: "/", // Must match path used when setting the cookie
      ...(PROFILE === "production" && { domain: `.${DOMAIN}` }),
    });
  };

  return (
    <DrawerAppBar
      navItems={navItems}
      handleOnClickNavigate={handleOnClickNavigate}
      handleOnClickLogout={handleOnClickLogout}
    />
  );
};

export default MainNavigationContainer;
