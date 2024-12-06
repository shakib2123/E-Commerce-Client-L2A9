import { User as NextUIUser } from "@nextui-org/react";

const MyUser = ({
  name,
  description,
  src,
}: {
  name: string;
  description: string;
  src: string;
}) => {
  return (
    <>
      <NextUIUser
        name={name}
        description={description}
        avatarProps={{
          src,
        }}
      />
    </>
  );
};

export default MyUser;
