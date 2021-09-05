import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { ADDSIGNER } from "../../../helpers/constant";

import MenuIcon from "@material-ui/icons/Menu";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { Popover } from "@material-ui/core";
import { useAuth } from "contexts/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFileSignature } from "@fortawesome/free-solid-svg-icons";

// const src =
//   "https://lh3.googleusercontent.com/a/AATXAJx1LiuKljmJO8H4h1gOlUI3V5VIF2Jo7NJQNcTz=s96-c";

const PersonRow = ({ data, index, handleValue, deleteUser }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const {
    auth: { email },
  } = useAuth();

  return (
    <>
      <Draggable
        draggableId={data?.id}
        index={index}
        isDragDisabled={email === data?.email}
        disableInteractiveElementBlocking={email === data?.email}
      >
        {(provided) => (
          <li
            className="one-person-row-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="order">{index + 1}</div>
            <div className="info">
              <MenuIcon
                className="cursor-pointer"
                aria-haspopup="true"
                onClick={handleClick}
                aria-describedby={id}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <div className="">
                  <div className="">
                    <div className="py-2 px-3 dropdown-item cursor-pointer">
                      ACTION 1
                    </div>
                    <div className="py-2 px-3 dropdown-item cursor-pointer">
                      ACTION 2
                    </div>
                  </div>
                </div>
              </Popover>

              {/* <FontAwesomeIcon icon={faFileSignature} /> */}
            </div>
            <div className="item-center">
              <div className="input-name-area">
                <div>
                  <label>{t("form.name")}</label>
                </div>
                <input
                  value={data?.name}
                  onChange={(e) => handleValue("name", e.target.value, index)}
                />
              </div>
              <div className="input-email-area">
                <div>
                  <label>{t("form.emailAddress")}</label>
                </div>
                <input
                  value={data?.email}
                  onChange={(e) => handleValue("email", e.target.value, index)}
                />
              </div>
              <div className="input-flowtype-area">
                <select
                  value={data?.flowtype}
                  onChange={(e) =>
                    handleValue("flowtype", e.target.value, index)
                  }
                >
                  {[ADDSIGNER.SIGN, ADDSIGNER.REVIEW]?.map((datum, i) => (
                    <option key={i} value={datum}>
                      {datum}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {email !== data?.email && (
              <DeleteRoundedIcon
                className="delete-signer-floating-button"
                onClick={() => deleteUser(data?.id)}
              />
            )}
          </li>
        )}
      </Draggable>
    </>
  );
};

export default PersonRow;
