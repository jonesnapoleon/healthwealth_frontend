import { addViewer } from "api/data";
import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "contexts/SnackbarContext";
import React, { useState } from "react";
import { useFormInput } from "utils/hooks";
import { convertCamelCase } from "utils/transformer";
import { isValidEmail } from "utils/validator";
import {
  Button,
  TextField,
  Typography,
} from "../../../../node_modules/@material-ui/core/index";

const GrantAccess = ({ documentId }) => {
  const email = useFormInput("");
  const {
    auth: { user },
  } = useAuth();

  const { addSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleGrant = async () => {
    try {
      setLoading(true);
      if (!isValidEmail(email.value.trim()))
        throw new Error("Email is invalid");
      if (email.value.trim() === user?.email)
        throw new Error("Cannot add yourself to viewer list");
      const res = await addViewer(email.value.trim(), documentId);
      if (res)
        addSnackbar(`${email.value.trim()} now has view access`, "success");
    } catch (e) {
      addSnackbar(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Typography
          style={{ verticalAlign: "middle", paddingRight: "1rem" }}
          display="inline"
        >
          Give access to:
        </Typography>
        <TextField
          size="small"
          style={{ verticalAlign: "middle", width: "15rem" }}
          {...email}
          label={convertCamelCase("email")}
          variant="outlined"
        />
      </div>
      <Button
        disabled={loading}
        onClick={handleGrant}
        variant="contained"
        color="primary"
      >
        Grant access
      </Button>
    </div>
  );
};

export default GrantAccess;
