import NavBar from "../components/NavBar";

const NavBarPage = () => {
  return (
    <div>
      <h2 className="text-3xl mb-4">Navbar</h2>
      <NavBar
        logo="MyApp"
        links={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
      />
    </div>
  );
};

export default NavBarPage;
