import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuArrowLeftFromLine, LuTrash } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";

export const RetractingSideBar = () => {
  return (
    <div className="flex bg-indigo-50">
      <Sidebar />
      <ExampleContent />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 max-h-screen shrink-0 border-r border-slate-300 bg-white p-2 space-y-10"
      style={{
        width: open ? "300px" : "fit-content",
      }}
    >
      <ToggleClose open={open} setOpen={setOpen} />
      <div className="space-y-1">
        <Option
          Icon={MdOutlineAddCircleOutline}
          title="Nova nota"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={IoSettingsOutline}
          title="Configurações"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={LuTrash}
          title="Lixeira"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <Option
          Icon={LuLogOut}
          title="Sair"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors text-secondary hover:bg-slate-100 ${
        title === "Nova nota" && "bg-gradient"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className=""
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      className={`relative flex h-10 w-full items-center rounded-md transition-colors text-black `}
      onClick={() => setOpen((pv) => !pv)}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-xl"
      >
        {open ? (
          <LuArrowLeftFromLine className={`transition-transform`} />
        ) : (
          <RxHamburgerMenu
            className={`transition-transform ${open && "rotate-180"}`}
          />
        )}
      </motion.div>

      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className=""
        >
          Esconder
        </motion.span>
      )}
    </motion.button>
  );
};

const ExampleContent = () => (
  <div className="h-[200vh] w-full">
    <h1>teste</h1>
  </div>
);
