import "./NavBar.css";
const NavBar = () => {
  return (
    <div class="nav">
      <div class="nav-item active">
        <a href="#">Explore</a>
      </div>
      <div class="nav-item">
        <a href="#">Flight</a>
      </div>
      <div class="nav-item">
        <a href="#">Planner</a>
      </div>
      <div class="nav-item">
        <a href="#">Profile</a>
      </div>
    </div>
  );
};

export default NavBar;
