import React from "react";
import { Indication } from "../../utils/apiEntities";
import useAuth from "../../utils/useAuth";
import { useFormContext } from "react-hook-form";

interface Props {
  indication: Indication;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CategoryOption: React.FC<Props> = ({ indication }) => {
  const { loggedUser } = useAuth();
  ``;
  const { register } = useFormContext();

  return (
    <label className="block bg-gray-800 w-full text-left p-4 flex items-center space-x-2">
      <input
        type={"radio"}
        {...register("indicationId")}
        value={indication.id}
        className="w-6 h-6 p-4"
      />
      <span
        className={`text-xl ${
          loggedUser?.bets.includes(indication.id)
            ? "text-yellow"
            : "text-white"
        }`}
      >
        {indication.nominated.name}
      </span>
    </label>
  );
};

export default CategoryOption;
