import { Info } from "@mui/icons-material";
import Popover from "@mui/material/Popover"
import { useState } from "react";

const Item = ({
  task,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? task.id : undefined;

  return (
    <>
      <li
        aria-describedby={id}
        className="flex items-center justify-between rounded bg-white group p-2 font-semibold relative w-56" >
        <span className='text-ellipsis'>
          {task.content?.name}
        </span>
        <button onClick={handlePopoverOpen} className="text-gray-400 group-hover:text-gray-600">
          <Info  />
        </button>
      </li>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ul className="p-6 gap-4 max-w-96 max-h-96 grid grid-cols-2">
          <li>
            <h3 className="font-semibold">Type</h3>
            <p>{task.content?.type}</p>
          </li>
          <li>
            <h3 className="font-semibold">Muscle</h3>
            <p>{task.content?.muscle}</p>
          </li>
          <li>
            <h3 className="font-semibold">Equipment</h3>
            <p>{task.content?.equipment}</p>
          </li>
          <li>
            <h3 className="font-semibold">Difficulty</h3>
            <p>{task.content?.difficulty}</p>
          </li>
          <li className="col-span-2">
            <h3 className="font-semibold">Instructions</h3>
            <p>{task.content?.instructions}</p>
          </li>
        </ul>
      </Popover>
    </>
  )
}


export default Item;