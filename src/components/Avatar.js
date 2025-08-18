import Image from "react-bootstrap/Image";

const Avatar = ({ avatarURL, className }) => {
  return (
    <Image
      src={avatarURL}
      rounded
      fluid
      width={40}
      height={40}
      className={className}
      alt={`img url ${avatarURL}`}
    />
  );
};

export default Avatar;
