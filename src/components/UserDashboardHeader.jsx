import React from "react";

// Avatar component to display the image
const Avatar = ({ className, src, alt }) => (
  <div
    className={`${className} flex items-center justify-center rounded-full overflow-hidden`}
  >
    <img src={src} alt={alt} className="object-cover w-full h-full" />
  </div>
);

const Header = () => {
  const userName = "Nikil"; // Placeholder for user name
  const userEmail = "Nikil@gmail.com";
  const avatarImage = "/boy-avatar.png"; // Replace with actual avatar image URL

  return (
    <header className="bg-white p-4 flex items-center justify-between shadow-md">
      {/* User Avatar and Info */}
      <div className="flex items-center space-x-4 ml-auto">
        <Avatar
          className="w-12 h-12 bg-gray-200"
          src={avatarImage}
          alt="User Avatar"
        />
        <div>
          <h3 className="text-lg font-bold">{userName}</h3>
          <p className="text-sm font-medium text-gray-500">{userEmail}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
