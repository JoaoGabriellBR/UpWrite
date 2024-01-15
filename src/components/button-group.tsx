// ButtonGroup.js
import React from "react";
import { Button } from "@/components/ui/button";

const ButtonGroup = ({ icon, label, onClick }: any) => {
  return (
    <div className="flex flex-row items-center w-full">
      <Button
        className="w-full gap-x-3 flex justify-start"
        variant="ghost"
        onClick={onClick}
      >
        {icon && React.cloneElement(icon, { className: "w-5 h-5" })}
        <p className="text-sm">{label}</p>
      </Button>
    </div>
  );
};

export default ButtonGroup;
